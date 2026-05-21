import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
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

  // BUG 5 FIX: Clear previous markers & stale state immediately on dependency change
  useEffect(() => {
    setNearbyRestaurants([]);
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

      // Lọc quán ăn theo đúng category (đã chuẩn hóa trong data)
      const filteredRestaurants = restaurants.filter(
        (r) => r.category.toLowerCase() === selectedFood.toLowerCase()
      );

      // BUG 4 FIX: Calculate exact distance and travel time for realism
      const restaurantsWithDistance = filteredRestaurants.map(r => {
        const distMeters = getDistance(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: r.latitude, longitude: r.longitude }
        );
        // Assuming ~40km/h average city speed in VN (approx 666 meters per minute)
        const timeMins = Math.max(1, Math.ceil(distMeters / 666));
        
        return {
          ...r,
          distance: distMeters > 1000 ? `${(distMeters / 1000).toFixed(1)}km` : `${distMeters}m`,
          time: `${timeMins} phút`
        };
      });

      setNearbyRestaurants(restaurantsWithDistance);

      // BUG 4 FIX: Smooth Auto-Focus Experience
      if (restaurantsWithDistance.length > 0 && mapRef.current) {
        const markers = restaurantsWithDistance.map((r: any) => ({
          latitude: r.latitude,
          longitude: r.longitude,
        }));
        markers.push({ latitude: coords.latitude, longitude: coords.longitude });
        
        // Wait for MapView layout to finish rendering
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(markers, {
            edgePadding: { top: 100, right: 80, bottom: 100, left: 80 },
            animated: true,
          });
        }, 800);
      } else if (mapRef.current) {
        setTimeout(() => {
          mapRef.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
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
    const scheme = Platform.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  if (loading) {
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
            >
              <Callout 
                tooltip 
                onPress={() => openNavigation(restaurant.latitude, restaurant.longitude, restaurant.name)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                  
                  {/* BUG 4 FIX: Show realistic distance info */}
                  <Text style={styles.calloutDesc}>
                    {restaurant.distance} • {restaurant.time}
                  </Text>
                  
                  <View style={styles.buttonRow}>
                    <Text 
                      style={styles.detailsBtn}
                      onPress={() =>
                        navigation.navigate("RestaurantDetail", {
                          restaurant,
                          food: { name: selectedFood },
                          mood: route.params?.selectedMood || "Current Mood",
                        })
                      }
                    >
                      Details
                    </Text>
                    <Text style={styles.navBtn}>Navigate 🗺️</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
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
  calloutContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    width: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  calloutDesc: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "600",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  detailsBtn: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  navBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: "hidden",
    fontWeight: "600",
  },
});
