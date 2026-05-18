import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RegisterScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Demo Mode 📱
      </Text>

      <Text style={styles.text}>
        Use demo account to login:
      </Text>

      <Text style={styles.text}>
        demo@foodmood.com
      </Text>

      <Text style={styles.text}>
        123456
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#020c2c",
      justifyContent:
        "center",
      alignItems: "center",
      padding: 20,
    },

    title: {
      fontSize: 40,
      color: "#ff7b7b",
      fontWeight:
        "bold",
      marginBottom: 30,
    },

    text: {
      color: "white",
      fontSize: 18,
      marginBottom: 10,
    },

    button: {
      marginTop: 30,
      backgroundColor:
        "#ff7b7b",
      padding: 15,
      borderRadius: 14,
    },

    buttonText: {
      color: "white",
      fontWeight:
        "bold",
      fontSize: 18,
    },
  });