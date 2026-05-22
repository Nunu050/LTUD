import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDistance } from "geolib";

import { COLORS } from "../../constants/colors";
import { restaurants } from "../../data/restaurants";
import { getUserLocation } from "../../services/locationService";
import { calculateDistanceAndETA } from "../../utils/distance";

export default function MapScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const mapRef = useRef<MapView>(null);

  const selectedFood = route.params?.selectedFood || "BBQ";

  const [location, setLocation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);

  // Load and sync data on food change (race condition & stale state protection)
  useEffect(() => {
    let active = true;

    // Clear state variables immediately to avoid rendering stale items
    setNearbyRestaurants([]);
    setSelectedRestaurant(null);
    setLoading(true);

    const loadData = async () => {
      try {
        const coords = await getUserLocation();
        if (!active) return;
        setLocation(coords);

        // Filter restaurants by category OR substring matches on name/address for robust wheel support
        const filteredRestaurants = restaurants.filter((r) => {
          const foodLower = selectedFood.toLowerCase();

          // Keep categories accurate mapping:
          // Pizza -> pizza/pasta places
          // Sushi -> sushi places
          // BBQ -> BBQ/buffet places
          // Matcha -> tea/cafe places (Matcha, Coffee, Tea, Trà Sữa)
          // Steak -> steakhouse places
          let targetCategories = [foodLower];
          if (foodLower.includes("pizza")) {
            targetCategories = ["pizza", "pasta"];
          } else if (foodLower.includes("sushi")) {
            targetCategories = ["sushi"];
          } else if (foodLower.includes("bbq") || foodLower.includes("nướng")) {
            targetCategories = ["bbq", "buffet"];
          } else if (
            foodLower.includes("matcha") ||
            foodLower.includes("cà phê") ||
            foodLower.includes("coffee") ||
            foodLower.includes("trà") ||
            foodLower.includes("tea") ||
            catMatchesCafe(foodLower)
          ) {
            targetCategories = ["matcha", "coffee", "tea", "trà sữa"];
          } else if (foodLower.includes("steak") || foodLower.includes("bít tết")) {
            targetCategories = ["steak"];
          }

          // Helper to check if string contains cafe-like terms
          function catMatchesCafe(str: string) {
            const terms = ["quán nước", "nước", "sinh tố", "sữa", "trân châu", "juice", "smoothie"];
            return terms.some(t => str.includes(t));
          }

          const categoryMatches = targetCategories.some(cat =>
            r.category.toLowerCase() === cat ||
            r.category.toLowerCase().includes(cat) ||
            cat.includes(r.category.toLowerCase())
          );

          const nameMatches = r.name.toLowerCase().includes(foodLower);
          const addressMatches = r.address.toLowerCase().includes(foodLower);

          return categoryMatches || nameMatches || addressMatches;
        });

        // Calculate travel info using unified calculator
        const restaurantsWithDistance = filteredRestaurants.map((r) => {
          const stats = calculateDistanceAndETA(
            coords.latitude,
            coords.longitude,
            r.latitude,
            r.longitude
          );
          return {
            ...r,
            distMeters: stats.distMeters,
            distance: stats.distanceStr,
            time: stats.timeStr,
          };
        });

        // Sort by distance to find nearest
        restaurantsWithDistance.sort((a, b) => a.distMeters - b.distMeters);

        if (!active) return;

        setNearbyRestaurants(restaurantsWithDistance);

        // Focus nearest restaurant initially if available
        if (restaurantsWithDistance.length > 0) {
          setSelectedRestaurant(restaurantsWithDistance[0]);
        } else {
          setSelectedRestaurant(null);
        }

        // Animate user location if no restaurants are found
        if (restaurantsWithDistance.length === 0 && mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }, 500);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        if (active) setLoading(false);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [selectedFood]);

  // Smooth Auto-Focus Camera when selected restaurant changes (Bug 3)
  useEffect(() => {
    if (selectedRestaurant && mapRef.current && location) {
      const timer = setTimeout(() => {
        const coordinates = [
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: selectedRestaurant.latitude, longitude: selectedRestaurant.longitude },
        ];

        const dist = getDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: selectedRestaurant.latitude, longitude: selectedRestaurant.longitude }
        );

        if (dist > 50 && dist < 15000) {
          // Fit both user and selected restaurant with card padding offset
          mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: { top: 140, right: 100, bottom: 280, left: 100 },
            animated: true,
          });
        } else {
          // Direct center with smooth offset if too close or too far
          mapRef.current?.animateToRegion({
            latitude: selectedRestaurant.latitude - 0.002,
            longitude: selectedRestaurant.longitude,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
          }, 600);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [selectedRestaurant, location]);


  const openNavigation = (lat: number, lng: number, label: string, address?: string) => {
    // Open Google Maps using a genuine search query which shows the real business details
    let query = label;
    if (address) {
      query = `${label}, ${address}`;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open Google Maps navigation link.");
    });
  };

  const getMarkerEmoji = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes("bbq")) return "🍖";
    if (catLower.includes("pizza")) return "🍕";
    if (catLower.includes("gà rán") || catLower.includes("ga ran")) return "🍗";
    if (catLower.includes("trà sữa") || catLower.includes("tra sua")) return "🧋";
    if (catLower.includes("buffet")) return "🍽️";
    if (catLower.includes("lẩu thái") || catLower.includes("lau thai") || catLower.includes("lẩu")) return "🍲";
    if (catLower.includes("bánh ngọt") || catLower.includes("banh ngot")) return "🍰";
    if (catLower.includes("phở") || catLower.includes("pho")) return "🍜";
    if (catLower.includes("cháo") || catLower.includes("chao")) return "🥣";
    if (catLower.includes("bún bò") || catLower.includes("bun bo")) return "🥢";
    if (catLower.includes("chocolate")) return "🍫";
    if (catLower.includes("soup")) return "🍲";
    if (catLower.includes("bánh mì") || catLower.includes("banh mi")) return "🥖";
    if (catLower.includes("matcha")) return "🍵";
    if (catLower.includes("sushi")) return "🍣";
    if (catLower.includes("healthy")) return "🥗";
    if (catLower.includes("coffee") || catLower.includes("cà phê")) return "☕";
    if (catLower.includes("tea") || catLower.includes("trà")) return "🫖";
    if (catLower.includes("steak")) return "🥩";
    if (catLower.includes("pasta")) return "🍝";
    if (catLower.includes("wine") || catLower.includes("rượu")) return "🍷";
    if (catLower.includes("fine dining") || catLower.includes("sang trọng")) return "🥂";
    if (catLower.includes("ăn vặt") || catLower.includes("an vat")) return "🍟";
    if (catLower.includes("xiên que") || catLower.includes("xien que")) return "🍢";
    if (catLower.includes("ốc đêm") || catLower.includes("oc dem") || catLower.includes("ốc")) return "🐌";
    if (catLower.includes("bia craft") || catLower.includes("bia")) return "🍺";
    if (catLower.includes("salad")) return "🥗";
    return "📍";
  };

  // Fullscreen loader only on initial load when location is null
  if (loading && !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Finding {selectedFood} nearby...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedFood} Nearby 📍</Text>

      {location && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            {/* RESTAURANTS MARKERS */}
            {nearbyRestaurants.map((restaurant: any) => (
              <Marker
                key={`${restaurant.id}_${selectedFood}_${selectedRestaurant?.id === restaurant.id}`}
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                }}
                onPress={() => {
                  setSelectedRestaurant(restaurant);
                }}
              >
                <View style={[
                  styles.markerContainer,
                  selectedRestaurant?.id === restaurant.id && styles.selectedMarkerContainer
                ]}>
                  <Text style={styles.markerEmoji}>
                    {getMarkerEmoji(restaurant.category)}
                  </Text>
                </View>
              </Marker>
            ))}
          </MapView>

          {/* Loading Indicator Overlay */}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.loadingOverlayText}>Updating...</Text>
            </View>
          )}

          {/* Bottom Card for Selected Restaurant */}
          {selectedRestaurant && (
            <View style={styles.bottomCard}>
              <Image source={{ uri: selectedRestaurant.image }} style={styles.cardImage} />
              
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName} numberOfLines={1}>
                    {selectedRestaurant.name}
                  </Text>
                  <TouchableOpacity 
                    style={styles.closeBtn} 
                    onPress={() => setSelectedRestaurant(null)}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.cardAddress} numberOfLines={1}>
                  {selectedRestaurant.address}
                </Text>
                
                <Text style={styles.cardStats}>
                  📍 {selectedRestaurant.distance} • 🚗 {selectedRestaurant.time}
                </Text>
                
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={styles.detailsBtn}
                    onPress={() =>
                      navigation.navigate("RestaurantDetail", {
                        restaurant: selectedRestaurant,
                        food: { name: selectedFood },
                        mood: route.params?.selectedMood || "Current Mood",
                      })
                    }
                  >
                    <Text style={styles.detailsBtnText}>Details</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.navBtn}
                    onPress={() =>
                      openNavigation(
                        selectedRestaurant.latitude,
                        selectedRestaurant.longitude,
                        selectedRestaurant.name,
                        selectedRestaurant.address
                      )
                    }
                  >
                    <Text style={styles.navBtnText}>Navigate 🗺️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 20,
    fontSize: 18,
  },
  loadingOverlay: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  loadingOverlayText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "600",
  },
  markerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#3b82f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  selectedMarkerContainer: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.15 }],
  },
  markerEmoji: {
    fontSize: 18,
  },
  bottomCard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  cardImage: {
    width: 85,
    height: 85,
    borderRadius: 16,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardAddress: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 4,
  },
  cardStats: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  detailsBtnText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  navBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  navBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
