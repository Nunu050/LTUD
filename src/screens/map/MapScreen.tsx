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
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDistance } from "geolib";

import { COLORS } from "../../constants/colors";
import { restaurants } from "../../data/restaurants";

export default function MapScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const mapRef = useRef<MapView>(null);

  const selectedFood = route.params?.selectedFood || "Food";

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);

  // Clear previous markers & selected state immediately on category change
  useEffect(() => {
    setNearbyRestaurants([]);
    setSelectedRestaurant(null);
    fetchNearbyRestaurants();
  }, [selectedFood]);

  const fetchNearbyRestaurants = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow location access to show your position on the map.");
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const coords = currentLocation.coords;
      setLocation(coords);

      // Filter restaurants by category
      const filteredRestaurants = restaurants.filter(
        (r) => r.category.toLowerCase() === selectedFood.toLowerCase()
      );

      // Calculate exact distance and travel time
      const restaurantsWithDistance = filteredRestaurants.map(r => {
        const distMeters = getDistance(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: r.latitude, longitude: r.longitude }
        );
        // Assuming ~30km/h average city speed in VN (approx 500 meters per minute)
        const timeMins = Math.max(1, Math.ceil(distMeters / 500));
        
        return {
          ...r,
          distMeters,
          distance: distMeters > 1000 ? `${(distMeters / 1000).toFixed(1)}km` : `${distMeters}m`,
          time: `${timeMins} phút`
        };
      });

      // Sort by distance to find nearest
      restaurantsWithDistance.sort((a, b) => a.distMeters - b.distMeters);
      setNearbyRestaurants(restaurantsWithDistance);

      // Auto focus nearest restaurant if available
      if (restaurantsWithDistance.length > 0) {
        setSelectedRestaurant(restaurantsWithDistance[0]);
      } else {
        setSelectedRestaurant(null);
      }

      // Smooth Auto-Focus Experience
      if (restaurantsWithDistance.length > 0 && mapRef.current) {
        const markers = restaurantsWithDistance.map((r: any) => ({
          latitude: r.latitude,
          longitude: r.longitude,
        }));
        markers.push({ latitude: coords.latitude, longitude: coords.longitude });
        
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(markers, {
            edgePadding: { top: 120, right: 80, bottom: 260, left: 80 },
            animated: true,
          });
        }, 800);
      } else if (mapRef.current) {
        setTimeout(() => {
          mapRef.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          });
        }, 800);
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openNavigation = (lat: number, lng: number, label: string) => {
    // Open Google Maps navigation directly
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open Google Maps navigation link.");
    });
  };

  const getMarkerEmoji = () => {
    const foodLower = selectedFood.toLowerCase();
    if (foodLower.includes("bbq")) return "🍖";
    if (foodLower.includes("pizza")) return "🍕";
    if (foodLower.includes("gà rán") || foodLower.includes("ga ran")) return "🍗";
    if (foodLower.includes("trà sữa") || foodLower.includes("tra sua")) return "🧋";
    if (foodLower.includes("buffet")) return "🍽️";
    if (foodLower.includes("lẩu thái") || foodLower.includes("lau thai") || foodLower.includes("lẩu")) return "🍲";
    if (foodLower.includes("bánh ngọt") || foodLower.includes("banh ngot")) return "🍰";
    if (foodLower.includes("phở") || foodLower.includes("pho")) return "🍜";
    if (foodLower.includes("cháo") || foodLower.includes("chao")) return "🥣";
    if (foodLower.includes("bún bò") || foodLower.includes("bun bo")) return "🥢";
    if (foodLower.includes("chocolate")) return "🍫";
    if (foodLower.includes("soup")) return "🍲";
    if (foodLower.includes("bánh mì") || foodLower.includes("banh mi")) return "🥖";
    if (foodLower.includes("matcha")) return "🍵";
    if (foodLower.includes("sushi")) return "🍣";
    if (foodLower.includes("healthy")) return "🥗";
    if (foodLower.includes("coffee") || foodLower.includes("cà phê")) return "☕";
    if (foodLower.includes("tea") || foodLower.includes("trà")) return "🫖";
    if (foodLower.includes("steak")) return "🥩";
    if (foodLower.includes("pasta")) return "🍝";
    if (foodLower.includes("wine") || foodLower.includes("rượu")) return "🍷";
    if (foodLower.includes("fine dining") || foodLower.includes("sang trọng")) return "🥂";
    if (foodLower.includes("ăn vặt") || foodLower.includes("an vat")) return "🍟";
    if (foodLower.includes("xiên que") || foodLower.includes("xien que")) return "🍢";
    if (foodLower.includes("ốc đêm") || foodLower.includes("oc dem") || foodLower.includes("ốc")) return "🐌";
    if (foodLower.includes("bia craft") || foodLower.includes("bia")) return "🍺";
    if (foodLower.includes("salad")) return "🥗";
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
                key={restaurant.id}
                coordinate={{
                  latitude: restaurant.latitude,
                  longitude: restaurant.longitude,
                }}
                onPress={() => {
                  setSelectedRestaurant(restaurant);
                  mapRef.current?.animateToRegion({
                    latitude: restaurant.latitude - 0.003, // Slightly offset center so card doesn't cover marker
                    longitude: restaurant.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                  }, 400);
                }}
              >
                <View style={[
                  styles.markerContainer,
                  selectedRestaurant?.id === restaurant.id && styles.selectedMarkerContainer
                ]}>
                  <Text style={styles.markerEmoji}>
                    {getMarkerEmoji()}
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
                        selectedRestaurant.name
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
