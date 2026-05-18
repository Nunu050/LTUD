import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function LoginScreen({
  navigation,
  setIsLoggedIn,
}: any) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    () => {
      if (
        email ===
          "demo@foodmood.com" &&
        password === "123456"
      ) {
        setIsLoggedIn(true);
      } else {
        Alert.alert(
          "Login Failed",
          "Demo account:\n\ndemo@foodmood.com\n123456"
        );
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        FoodMood 🍔
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={
          setEmail
        }
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={
          setPassword
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={
          handleLogin
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Register"
          )
        }
      >
        <Text
          style={
            styles.switchText
          }
        >
          Create Account
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

      padding: 20,
    },

    title: {
      fontSize: 42,

      color: "#ff7b7b",

      fontWeight:
        "bold",

      marginBottom: 40,

      textAlign: "center",
    },

    input: {
      backgroundColor:
        "#1e293b",

      borderRadius: 14,

      padding: 15,

      marginBottom: 20,

      color: "white",

      fontSize: 16,
    },

    button: {
      backgroundColor:
        "#ff7b7b",

      padding: 16,

      borderRadius: 14,

      alignItems: "center",
    },

    buttonText: {
      color: "white",

      fontWeight:
        "bold",

      fontSize: 18,
    },

    switchText: {
      color: "#ff7b7b",

      marginTop: 20,

      textAlign: "center",
    },
  });