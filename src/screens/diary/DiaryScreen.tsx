import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Share,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { COLORS } from "../../constants/colors";

export default function DiaryScreen() {
  const [reviews, setReviews] =
    useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(
        db,
        "reviews"
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setReviews(data);
        }
      );

    return unsubscribe;
  }, []);

  const deleteReview =
    async (id: string) => {
      await deleteDoc(
        doc(
          db,
          "reviews",
          id
        )
      );
    };

  const shareReview = async (item: any) => {
    try {
      let mapsUrl = "";
      if (item.latitude && item.longitude) {
        mapsUrl = `\n🗺️ Google Maps: https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
      }

      await Share.share({
        message: `🍴 ${item.food}\n\n📍 ${item.restaurant}${mapsUrl}\n\n⭐ ${item.rating}/5\n\n📝 ${item.review}`,
      });
    } catch (error) {
      console.log(error);
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

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.moodBadge}>
          <Text style={styles.moodBadgeText}>{item.mood}</Text>
        </View>
        <Text style={styles.date}>
          {item.createdAt?.toDate?.()?.toLocaleDateString()}
        </Text>
      </View>

      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImagePlaceholder}>
          <Text style={styles.noImageText}>🍽️</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.foodName}>{item.food}</Text>
        <Text style={styles.restaurantName}>📍 {item.restaurant}</Text>
        {item.address ? <Text style={styles.addressText}>{item.address}</Text> : null}
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStar}>{"⭐".repeat(item.rating)}</Text>
          {item.favorite && <Text style={styles.favoriteText}>❤️ Loved it</Text>}
        </View>

        {item.review ? (
          <Text style={styles.reviewText}>"{item.review}"</Text>
        ) : (
          <Text style={styles.reviewText}>"A memory worth keeping."</Text>
        )}

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => shareReview(item)}>
            <Text style={styles.shareText}>Share ↗️</Text>
          </TouchableOpacity>
          
          {item.latitude && item.longitude && (
            <TouchableOpacity style={styles.actionButton} onPress={() => openNavigation(item.latitude, item.longitude, item.restaurant)}>
              <Text style={styles.navigateText}>Navigate 🗺️</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionButton} onPress={() => deleteReview(item.id)}>
            <Text style={styles.deleteText}>Delete 🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Food Diary 📔</Text>
      <Text style={styles.subtitle}>Your emotional culinary journey.</Text>

      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>No food memories yet 🍜</Text>
          <Text style={styles.emptySub}>Start eating and logging your feelings!</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#888",
    fontSize: 16,
    marginBottom: 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  emptySub: {
    color: "#888",
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 25,
    marginBottom: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  moodBadge: {
    backgroundColor: "rgba(255,209,102,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  moodBadgeText: {
    color: "#ffd166",
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: "#aaa",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 250,
  },
  noImagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 40,
  },
  content: {
    padding: 20,
  },
  foodName: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  restaurantName: {
    color: "#ff7b7b",
    fontSize: 18,
    marginTop: 8,
    fontWeight: "500",
  },
  addressText: {
    color: "#888",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  ratingStar: {
    fontSize: 20,
    marginRight: 10,
  },
  favoriteText: {
    color: "#ff7b7b",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "rgba(255,123,123,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  reviewText: {
    color: "#cbd5e1",
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    paddingLeft: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    paddingTop: 15,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  shareText: {
    color: "#3b82f6",
    fontWeight: "bold",
    fontSize: 16,
  },
  navigateText: {
    color: "#10b981",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },
});