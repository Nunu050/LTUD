import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/colors";

export default function BottomTabs() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.icon}>
          🏠
        </Text>

        <Text style={styles.label}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.icon}>
          📖
        </Text>

        <Text style={styles.label}>
          Diary
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.icon}>
          🗺️
        </Text>

        <Text style={styles.label}>
          Map
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.icon}>
          👤
        </Text>

        <Text style={styles.label}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    bottom: 20,

    left: 20,

    right: 20,

    backgroundColor: COLORS.card,

    borderRadius: 25,

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",

    paddingVertical: 16,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.3,

    shadowRadius: 10,

    elevation: 10,
  },

  icon: {
    fontSize: 24,

    textAlign: "center",
  },

  label: {
    color: COLORS.text,

    marginTop: 4,

    fontSize: 12,

    textAlign: "center",
  },
});