import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker
from "expo-image-picker";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  db,
  storage,
} from "../../firebase/config";

import { COLORS } from "../../constants/colors";

export default function RestaurantDetailScreen({
  route,
}: any) {
  const restaurant =
    route.params?.restaurant;

  const food =
    route.params?.food;

  const mood =
    route.params?.mood;

  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");

  const [favorite, setFavorite] =
    useState(false);

  const [image, setImage] =
    useState<any>(null);

  const [uploading, setUploading] =
    useState(false);

  const pickImage =
    async () => {
      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,

          allowsEditing: true,

          aspect: [4, 3],

          quality: 0.7,
        });

      if (!result.canceled) {
        setImage(
          result.assets[0].uri
        );
      }
    };

  const takePhoto =
    async () => {
      const result =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,

          aspect: [4, 3],

          quality: 0.7,
        });

      if (!result.canceled) {
        setImage(
          result.assets[0].uri
        );
      }
    };

  const saveReview =
    async () => {
      try {
        setUploading(true);

        let imageUrl = "";

        if (image) {
          const response =
            await fetch(image);

          const blob =
            await response.blob();

          const filename =
            `foods/${Date.now()}.jpg`;

          const storageRef =
            ref(
              storage,
              filename
            );

          await uploadBytes(
            storageRef,
            blob
          );

          imageUrl =
            await getDownloadURL(
              storageRef
            );
        }

        await addDoc(
          collection(
            db,
            "reviews"
          ),
          {
            mood,
            food: food.name,
            restaurant: restaurant.name,
            address: restaurant.address,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            review,
            rating,
            favorite,
            imageUrl,
            createdAt: serverTimestamp(),
          }
        );

        Alert.alert(
          "Success",
          "Review saved!"
        );

        setReview("");

        setImage(null);

        setUploading(false);
      } catch (error) {
        console.log(error);

        setUploading(false);
      }
    };

  const openDirections =
    () => {
      const query =
        encodeURIComponent(
          restaurant.name
        );

      const url =
        `https://www.google.com/maps/search/?api=1&query=${query}`;

      Linking.openURL(url);
    };

  return (
    <ScrollView
      style={styles.container}
    >
      <Image
        source={{
          uri:
            restaurant.image,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {restaurant.name}
        </Text>

        <Text style={styles.address}>
          {restaurant.address}
        </Text>

        <Text style={styles.food}>
          🍴 {food.name}
        </Text>

        <Text style={styles.mood}>
          Mood: {mood}
        </Text>

        <Text style={styles.rating}>
          ⭐ Rating: {rating}
        </Text>

        <View
          style={styles.ratingRow}
        >
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <TouchableOpacity
                key={star}
                onPress={() =>
                  setRating(
                    star
                  )
                }
              >
                <Text
                  style={{
                    fontSize: 35,
                    marginRight: 8,
                  }}
                >
                  {star <=
                  rating
                    ? "⭐"
                    : "☆"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          style={
            styles.imageButton
          }
          onPress={
            takePhoto
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Take Photo 📸
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.imageButton
          }
          onPress={
            pickImage
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Upload Gallery 🖼️
          </Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{
              uri: image,
            }}
            style={
              styles.preview
            }
          />
        )}

        <TextInput
          placeholder="Write your review..."
          placeholderTextColor="#aaa"
          value={review}
          onChangeText={
            setReview
          }
          multiline
          style={styles.input}
        />

        <TouchableOpacity
          style={
            styles.favorite
          }
          onPress={() =>
            setFavorite(
              !favorite
            )
          }
        >
          <Text
            style={
              styles.favoriteText
            }
          >
            {favorite
              ? "❤️ Favorited"
              : "🤍 Add Favorite"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={
            openDirections
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Open Directions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.saveButton
          }
          onPress={
            saveReview
          }
        >
          {uploading ? (
            <ActivityIndicator
              color="white"
            />
          ) : (
            <Text
              style={
                styles.buttonText
              }
            >
              Save Review
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
    },

    image: {
      width: "100%",
      height: 260,
    },

    content: {
      padding: 20,
    },

    name: {
      color: "white",
      fontSize: 34,
      fontWeight: "bold",
    },

    address: {
      color: "#aaa",
      marginTop: 10,
      fontSize: 18,
    },

    food: {
      color: "#ff7b7b",
      marginTop: 20,
      fontSize: 24,
      fontWeight: "bold",
    },

    mood: {
      color: "white",
      marginTop: 10,
      fontSize: 20,
    },

    rating: {
      color: "#ffd166",
      marginTop: 20,
      fontSize: 22,
      fontWeight: "bold",
    },

    ratingRow: {
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 20,
    },

    imageButton: {
      backgroundColor:
        "#334155",

      padding: 15,

      borderRadius: 15,

      alignItems: "center",

      marginBottom: 15,
    },

    preview: {
      width: "100%",

      height: 220,

      borderRadius: 20,

      marginBottom: 20,
    },

    input: {
      backgroundColor:
        "#1e293b",

      borderRadius: 20,

      padding: 20,

      color: "white",

      minHeight: 120,

      textAlignVertical:
        "top",

      fontSize: 18,
    },

    favorite: {
      marginTop: 20,
      marginBottom: 20,
    },

    favoriteText: {
      color: "white",
      fontSize: 20,
    },

    button: {
      backgroundColor:
        "#3b82f6",

      padding: 18,

      borderRadius: 20,

      alignItems: "center",

      marginBottom: 15,
    },

    saveButton: {
      backgroundColor:
        "#ff7b7b",

      padding: 18,

      borderRadius: 20,

      alignItems: "center",
    },

    buttonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
  });