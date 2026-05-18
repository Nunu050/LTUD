import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function FoodCard({
  food,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.name}>
        {food.emoji} {food.name}
      </Text>

      <Text style={styles.category}>
        {food.category}
      </Text>

      <Text style={styles.action}>
        Find nearby restaurants →
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor: "#1e293b",
      padding: 24,
      borderRadius: 24,
      marginBottom: 18,
    },

    name: {
      color: "white",
      fontSize: 28,
      fontWeight: "bold",
    },

    category: {
      color: "#cbd5e1",
      marginTop: 10,
      fontSize: 18,
    },

    action: {
      color: "#ff7b7b",
      marginTop: 15,
      fontSize: 18,
      fontWeight: "bold",
    },
  });