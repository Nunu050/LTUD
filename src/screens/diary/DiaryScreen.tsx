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
  TouchableOpacity,
  Alert,
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
import { allFoods, MOODS } from "../../constants/moods";
import { restaurants } from "../../data/restaurants";

export default function DiaryScreen() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
    });

    return unsubscribe;
  }, []);

  const deleteReview = async (id: string) => {
    Alert.alert(
      "Delete Memory",
      "Are you sure you want to delete this food memory?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "reviews", id));
          },
        },
      ]
    );
  };

  const getFoodEmoji = (foodName: string) => {
    const matched = allFoods.find(
      (f) =>
        f.category.toLowerCase() === foodName.toLowerCase() ||
        f.name.toLowerCase() === foodName.toLowerCase()
    );
    return matched ? matched.emoji : "🍴";
  };

  const getMoodDetails = (moodStr: string) => {
    const matched = MOODS.find(
      (m) =>
        m.title.toLowerCase() === moodStr.toLowerCase() ||
        moodStr.toLowerCase().includes(m.title.toLowerCase())
    );
    if (matched) {
      return { emoji: matched.emoji, title: matched.title, color: matched.color };
    }
    return { emoji: "😊", title: moodStr, color: "#ffd166" };
  };

  const getFallbackImage = (foodName: string, restaurantName: string) => {
    const matchedFood = allFoods.find(
      (f) =>
        f.category.toLowerCase() === foodName.toLowerCase() ||
        f.name.toLowerCase() === foodName.toLowerCase()
    );
    if (matchedFood && matchedFood.imageUrl) {
      return matchedFood.imageUrl;
    }
    const matchedRestaurant = restaurants.find(
      (r) => r.name.toLowerCase() === restaurantName.toLowerCase()
    );
    if (matchedRestaurant && matchedRestaurant.image) {
      return matchedRestaurant.image;
    }
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
  };

  const formatDate = (createdAt: any) => {
    if (!createdAt) return new Date().toLocaleDateString();
    if (typeof createdAt.toDate === "function") {
      try {
        const date = createdAt.toDate();
        return (
          date.toLocaleDateString() +
          " " +
          date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } catch (e) {
        // ignore
      }
    }
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
    return new Date().toLocaleDateString();
  };

  const shareReview = async (item: any) => {
    try {
      const dateStr = formatDate(item.createdAt);
      let mapsUrl = "";
      if (item.latitude && item.longitude) {
        mapsUrl = `\n🗺️ Open in Google Maps: https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
      } else if (item.mapsUrl) {
        mapsUrl = `\n🗺️ Open in Google Maps: ${item.mapsUrl}`;
      }

      const ratingStars = "⭐".repeat(item.rating);
      const moodInfo = getMoodDetails(item.mood || "Chill");
      const foodEmoji = getFoodEmoji(item.food);

      const message = `✨ FoodMood Experience! ✨\n\n${foodEmoji} Food: ${item.food}\n📍 Restaurant: ${item.restaurant}\n🕒 Check-in: ${dateStr}\n😊 Mood: ${moodInfo.emoji} ${moodInfo.title}\n⭐ Rating: ${ratingStars} (${item.rating}/5)\n\n💬 "${item.review || "A memory worth keeping."}"\n${mapsUrl}\n\nShared via FoodMood App 🍽️`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openNavigation = (lat: number, lng: number, label: string, address?: string) => {
    let url = "";
    if (lat && lng) {
      url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      let query = label;
      if (address) {
        query = `${label}, ${address}`;
      }
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open Google Maps navigation link.");
    });
  };

  const renderItem = ({ item }: any) => {
    const foodEmoji = getFoodEmoji(item.food);
    const moodInfo = getMoodDetails(item.mood || "Chill");
    const displayImage = item.imageUrl || getFallbackImage(item.food, item.restaurant);

    return (
      <View style={styles.card}>
        {/* HERO IMAGE BANNER SECTION */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: displayImage }} style={styles.image} />
          
          {/* GLASS BADGES OVERLAID ON IMAGE */}
          <View style={[styles.moodBadge, { backgroundColor: `${moodInfo.color}CC`, borderColor: moodInfo.color }]}>
            <Text style={styles.moodBadgeText}>
              {moodInfo.emoji} {moodInfo.title}
            </Text>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {foodEmoji} {item.food}
            </Text>
          </View>
        </View>

        {/* DETAILS BODY SECTION */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.foodName} numberOfLines={1}>
              {item.food} {foodEmoji}
            </Text>
            <Text style={styles.ratingStars}>{"⭐".repeat(item.rating)}</Text>
          </View>

          <TouchableOpacity
            style={styles.locationRow}
            onPress={() => openNavigation(item.latitude, item.longitude, item.restaurant, item.address)}
          >
            <Text style={styles.restaurantName} numberOfLines={1}>
              📍 {item.restaurant}
            </Text>
            {item.address ? (
              <Text style={styles.addressText} numberOfLines={1}>
                ({item.address})
              </Text>
            ) : null}
          </TouchableOpacity>

          <View style={styles.metaRow}>
            <Text style={styles.dateText}>🕒 {formatDate(item.createdAt)}</Text>
            {item.favorite && (
              <View style={styles.favoriteBadge}>
                <Text style={styles.favoriteText}>❤️ Loved it</Text>
              </View>
            )}
          </View>

          {/* BLOCKQUOTE REVIEW TEXT */}
          <View style={styles.reviewQuoteContainer}>
            <Text style={styles.reviewText}>
              "{item.review || "A memory worth keeping."}"
            </Text>
          </View>

          {/* MODERN SHADOW PILL ACTIONS */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.shareBtn]}
              onPress={() => shareReview(item)}
            >
              <Text style={styles.shareBtnText}>Share ↗️</Text>
            </TouchableOpacity>

            {item.latitude && item.longitude && (
              <TouchableOpacity
                style={[styles.actionButton, styles.navigateBtn]}
                onPress={() => openNavigation(item.latitude, item.longitude, item.restaurant, item.address)}
              >
                <Text style={styles.navigateBtnText}>Navigate 🗺️</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteBtn]}
              onPress={() => deleteReview(item.id)}
            >
              <Text style={styles.deleteBtnText}>Delete 🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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
    color: "#9ca3af",
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
    color: "#6b7280",
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    marginBottom: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: "#1e293b",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  moodBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  moodBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoryBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  categoryBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  foodName: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    flex: 1,
    marginRight: 10,
  },
  ratingStars: {
    fontSize: 18,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  restaurantName: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  addressText: {
    color: "#9ca3af",
    fontSize: 13,
    marginLeft: 6,
    flexShrink: 1,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  dateText: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "500",
  },
  favoriteBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  favoriteText: {
    color: "#f87171",
    fontWeight: "bold",
    fontSize: 12,
  },
  reviewQuoteContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    marginBottom: 20,
  },
  reviewText: {
    color: "#e2e8f0",
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    paddingTop: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 11,
    borderRadius: 14,
    marginHorizontal: 4,
  },
  shareBtn: {
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  shareBtnText: {
    color: "#60a5fa",
    fontWeight: "bold",
    fontSize: 14,
  },
  navigateBtn: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  navigateBtnText: {
    color: "#34d399",
    fontWeight: "bold",
    fontSize: 14,
  },
  deleteBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  deleteBtnText: {
    color: "#f87171",
    fontWeight: "bold",
    fontSize: 14,
  },
});