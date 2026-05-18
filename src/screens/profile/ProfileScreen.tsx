import React, {
  useEffect,
  useState,
} from "react";

import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { COLORS } from "../../constants/colors";

export default function ProfileScreen({
  setIsLoggedIn,
}: any) {
  const [reviews, setReviews] =
    useState<any[]>([]);

  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(true);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [name, setName] =
    useState("FoodMood User");

  const [avatar, setAvatar] =
    useState(
      "https://i.pravatar.cc/300"
    );

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(
          db,
          "reviews"
        ),
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

  /* FAVORITES */
  const favorites =
    reviews.filter(
      (item) =>
        item.favorite
    );

  /* FAVORITE MOOD */
  const moodCount: any = {};

  reviews.forEach((item) => {
    moodCount[item.mood] =
      (moodCount[
        item.mood
      ] || 0) + 1;
  });

  const favoriteMood =
    Object.keys(
      moodCount
    ).length > 0
      ? Object.keys(
          moodCount
        ).reduce((a, b) =>
          moodCount[a] >
          moodCount[b]
            ? a
            : b
        )
      : "😊 Happy";

  /* FAVORITE FOOD */
  const foodCount: any = {};

  reviews.forEach((item) => {
    foodCount[item.food] =
      (foodCount[
        item.food
      ] || 0) + 1;
  });

  const favoriteFood =
    Object.keys(
      foodCount
    ).length > 0
      ? Object.keys(
          foodCount
        ).reduce((a, b) =>
          foodCount[a] >
          foodCount[b]
            ? a
            : b
        )
      : "🍕 Pizza";

  /* RECENT REVIEW */
  const recentReview =
    reviews.length > 0
      ? reviews[0]
      : null;

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            darkMode
              ? COLORS.background
              : "#f1f5f9",
        },
      ]}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.avatar}
        />

        <Text
          style={[
            styles.name,
            {
              color:
                darkMode
                  ? "white"
                  : "black",
            },
          ]}
        >
          {name}
        </Text>

        <Text style={styles.email}>
          demo@foodmood.com
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View
          style={
            styles.statCard
          }
        >
          <Text
            style={
              styles.statNumber
            }
          >
            {
              reviews.length
            }
          </Text>

          <Text
            style={
              styles.statLabel
            }
          >
            Reviews
          </Text>
        </View>

        <View
          style={
            styles.statCard
          }
        >
          <Text
            style={
              styles.statNumber
            }
          >
            {
              favorites.length
            }
          </Text>

          <Text
            style={
              styles.statLabel
            }
          >
            Favorites
          </Text>
        </View>

        <View
          style={
            styles.statCard
          }
        >
          <Text
            style={
              styles.statNumber
            }
          >
            {
              Object.keys(
                moodCount
              ).length
            }
          </Text>

          <Text
            style={
              styles.statLabel
            }
          >
            Moods
          </Text>
        </View>
      </View>

      {/* FAVORITE MOOD */}
      <View style={styles.card}>
        <Text
          style={
            styles.cardTitle
          }
        >
          Favorite Mood
        </Text>

        <Text
          style={
            styles.cardText
          }
        >
          {favoriteMood}
        </Text>
      </View>

      {/* FAVORITE FOOD */}
      <View style={styles.card}>
        <Text
          style={
            styles.cardTitle
          }
        >
          Favorite Food
        </Text>

        <Text
          style={
            styles.cardText
          }
        >
          {favoriteFood}
        </Text>
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.card}>
        <Text
          style={
            styles.cardTitle
          }
        >
          Recent Activity
        </Text>

        {recentReview ? (
          <>
            {/* IMAGE */}
            {recentReview.imageUrl ? (
              <Image
                source={{
                  uri:
                    recentReview.imageUrl,
                }}
                style={
                  styles.reviewImage
                }
              />
            ) : null}

            <Text
              style={
                styles.activity
              }
            >
              🍴{" "}
              {
                recentReview.food
              }
            </Text>

            <Text
              style={
                styles.activity
              }
            >
              📍{" "}
              {
                recentReview.restaurant
              }
            </Text>

            <Text
              style={
                styles.activity
              }
            >
              ⭐{" "}
              {
                recentReview.rating
              }
              /5
            </Text>

            <Text
              style={
                styles.activity
              }
            >
              📝{" "}
              {
                recentReview.review
              }
            </Text>
          </>
        ) : (
          <Text
            style={
              styles.activity
            }
          >
            No activity yet
          </Text>
        )}
      </View>

      {/* SETTINGS */}
      <View style={styles.card}>
        <Text
          style={
            styles.cardTitle
          }
        >
          Settings
        </Text>

        {/* EDIT PROFILE */}
        <TouchableOpacity
          style={
            styles.settingItem
          }
          onPress={() =>
            setModalVisible(
              true
            )
          }
        >
          <Text
            style={
              styles.settingText
            }
          >
            Edit Profile
          </Text>
        </TouchableOpacity>

        {/* NOTIFICATION */}
        <View
          style={
            styles.switchRow
          }
        >
          <Text
            style={
              styles.settingText
            }
          >
            Notifications
          </Text>

          <Switch
            value={
              notifications
            }
            onValueChange={
              setNotifications
            }
          />
        </View>

        {/* DARK MODE */}
        <View
          style={
            styles.switchRow
          }
        >
          <Text
            style={
              styles.settingText
            }
          >
            Dark Mode
          </Text>

          <Switch
            value={darkMode}
            onValueChange={
              setDarkMode
            }
          />
        </View>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={
          styles.logoutButton
        }
        onPress={() =>
          setIsLoggedIn(
            false
          )
        }
      >
        <Text
          style={
            styles.logoutText
          }
        >
          Logout
        </Text>
      </TouchableOpacity>

      {/* EDIT MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View
          style={
            styles.modalContainer
          }
        >
          <View
            style={
              styles.modalContent
            }
          >
            <Text
              style={
                styles.modalTitle
              }
            >
              Edit Profile
            </Text>

            <TextInput
              value={name}
              onChangeText={
                setName
              }
              placeholder="Name"
              placeholderTextColor="#999"
              style={
                styles.input
              }
            />

            <TextInput
              value={avatar}
              onChangeText={
                setAvatar
              }
              placeholder="Avatar URL"
              placeholderTextColor="#999"
              style={
                styles.input
              }
            />

            <TouchableOpacity
              style={
                styles.saveButton
              }
              onPress={() =>
                setModalVisible(
                  false
                )
              }
            >
              <Text
                style={
                  styles.saveText
                }
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      alignItems: "center",
      marginTop: 70,
      marginBottom: 30,
    },

    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor:
        "#ff7b7b",
      marginBottom: 20,
    },

    name: {
      fontSize: 30,
      fontWeight: "bold",
    },

    email: {
      color: "#aaa",
      marginTop: 10,
      fontSize: 16,
    },

    statsRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      paddingHorizontal: 20,
      marginBottom: 20,
    },

    statCard: {
      backgroundColor:
        "#1e293b",
      width: "30%",
      padding: 20,
      borderRadius: 20,
      alignItems: "center",
    },

    statNumber: {
      color: "#ff7b7b",
      fontSize: 28,
      fontWeight: "bold",
    },

    statLabel: {
      color: "white",
      marginTop: 10,
    },

    card: {
      backgroundColor:
        "#1e293b",
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 20,
      borderRadius: 20,
    },

    cardTitle: {
      color: "#ff7b7b",
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
    },

    cardText: {
      color: "white",
      fontSize: 20,
    },

    reviewImage: {
      width: "100%",
      height: 180,
      borderRadius: 20,
      marginBottom: 15,
    },

    activity: {
      color: "white",
      marginBottom: 10,
      fontSize: 17,
    },

    settingItem: {
      paddingVertical: 15,
    },

    settingText: {
      color: "white",
      fontSize: 18,
    },

    switchRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      paddingVertical: 15,
    },

    logoutButton: {
      backgroundColor:
        "#ef4444",
      marginHorizontal: 20,
      marginBottom: 50,
      padding: 18,
      borderRadius: 20,
      alignItems: "center",
    },

    logoutText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },

    modalContainer: {
      flex: 1,
      justifyContent:
        "center",
      backgroundColor:
        "rgba(0,0,0,0.7)",
      padding: 20,
    },

    modalContent: {
      backgroundColor:
        "#1e293b",
      borderRadius: 20,
      padding: 20,
    },

    modalTitle: {
      color: "white",
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
    },

    input: {
      backgroundColor:
        "#334155",
      borderRadius: 14,
      padding: 15,
      color: "white",
      marginBottom: 20,
    },

    saveButton: {
      backgroundColor:
        "#ff7b7b",
      padding: 15,
      borderRadius: 14,
      alignItems: "center",
    },

    saveText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });