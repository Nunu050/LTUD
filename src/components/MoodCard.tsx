import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";

export default function MoodCard({
  mood,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.emoji}>
        {mood.emoji}
      </Text>

      <Text style={styles.text}>
        {mood.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,

    width: 100,

    height: 100,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 15,
  },

  emoji: {
    fontSize: 35,
  },

  text: {
    color: COLORS.text,

    marginTop: 10,

    fontWeight: "bold",
  },
});