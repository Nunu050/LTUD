import React, {
  useState,
} from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigator";

import LoginScreen from "../screens/auth/LoginScreen";

import RegisterScreen from "../screens/auth/RegisterScreen";

import RestaurantDetailScreen from "../screens/restaurant/RestaurantDetailScreen";

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main">
              {(props) => (
                <BottomTabNavigator />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="RestaurantDetail"
              component={
                RestaurantDetailScreen
              }
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  setIsLoggedIn={
                    setIsLoggedIn
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Register"
              component={
                RegisterScreen
              }
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}