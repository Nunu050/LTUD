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

  // Fix marker cache: depend on selectedFood
  useEffect(() => {
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

      // Lọc các quán ăn được tuyển chọn thủ công dựa trên món ăn (không dùng GPS tìm kiếm tự động nữa)
      const filteredRestaurants = restaurants.filter(
        (r) => r.category.toLowerCase() === selectedFood.toLowerCase()
      );

      setNearbyRestaurants(filteredRestaurants);

      // Cải thiện Map Focus UX: Tự động zoom bọc lấy toàn bộ các quán ăn và vị trí User
      if (filteredRestaurants.length > 0 && mapRef.current) {
        const markers = filteredRestaurants.map((r: any) => ({
          latitude: r.latitude,
          longitude: r.longitude,
        }));
        markers.push({ latitude: coords.latitude, longitude: coords.longitude });
        
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(markers, {
            edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
            animated: true,
          });
        }, 1000);
      } else if (mapRef.current) {
        // Nếu không có quán, chỉ focus vào user
        setTimeout(() => {
          mapRef.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }, 500);
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openNavigation = (lat: number, lng: number) => {
    const scheme = Platform.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
    const latLng = `${lat},${lng}`;
    const label = "Restaurant";
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
                onPress={() => openNavigation(restaurant.latitude, restaurant.longitude)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                  <Text style={styles.calloutDesc}>{selectedFood}</Text>
                  
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

// UI Style giữ nguyên tone màu Dark Mode sang trọng
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
    width: 200,
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
    color: "#666",
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: "hidden",
    fontWeight: "600",
  },
});
