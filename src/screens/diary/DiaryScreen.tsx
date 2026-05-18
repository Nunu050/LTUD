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
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : null}

      <Text style={styles.food}>🍴 {item.food}</Text>
      <Text style={styles.restaurant}>📍 {item.restaurant}</Text>
      <Text style={styles.mood}>Mood: {item.mood}</Text>
      <Text style={styles.review}>{item.review}</Text>
      <Text style={styles.rating}>{"⭐".repeat(item.rating)}</Text>

      {item.favorite && <Text style={styles.favorite}>❤️ Favorite</Text>}

      <Text style={styles.date}>
        {item.createdAt?.toDate?.()?.toLocaleDateString()}
      </Text>

      <View style={styles.actionRow}>
        <Text style={styles.share} onPress={() => shareReview(item)}>
          Share ↗️
        </Text>
        
        {item.latitude && item.longitude && (
          <Text 
            style={styles.navigate} 
            onPress={() => openNavigation(item.latitude, item.longitude, item.restaurant)}
          >
            Navigate 🗺️
          </Text>
        )}

        <Text style={styles.delete} onPress={() => deleteReview(item.id)}>
          Delete 🗑️
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Food Diary 📔
      </Text>

      {reviews.length ===
      0 ? (
        <Text
          style={
            styles.empty
          }
        >
          No food memories yet 🍜
        </Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(
            item
          ) => item.id}
          renderItem={
            renderItem
          }
          showsVerticalScrollIndicator={
            false
          }
        />
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
      padding: 20,
    },

    title: {
      color:
        COLORS.primary,
      fontSize: 40,
      fontWeight:
        "bold",
      marginTop: 50,
      marginBottom: 30,
    },

    empty: {
      color: "white",
      fontSize: 20,
    },

    card: {
      backgroundColor:
        "#1e293b",
      padding: 20,
      borderRadius: 20,
      marginBottom: 20,
    },

    image: {
      width: "100%",
      height: 220,
      borderRadius: 20,
      marginBottom: 20,
    },

    food: {
      color: "white",
      fontSize: 28,
      fontWeight:
        "bold",
    },

    restaurant: {
      color: "#ff7b7b",
      marginTop: 10,
      fontSize: 18,
    },

    mood: {
      color: "#ffd166",
      marginTop: 10,
      fontSize: 18,
    },

    review: {
      color: "white",
      marginTop: 15,
      fontSize: 18,
      lineHeight: 28,
    },

    rating: {
      marginTop: 15,
      fontSize: 24,
    },

    favorite: {
      color: "#ff7b7b",
      marginTop: 10,
      fontSize: 18,
    },

    date: {
      color: "#aaa",
      marginTop: 15,
    },

    share: {
      color: "#3b82f6",
      marginTop: 15,
      fontWeight:
        "bold",
      fontSize: 18,
    },

    delete: {
      color: "#ef4444",
      marginTop: 15,
      fontWeight:
        "bold",
      fontSize: 18,
    },
  });