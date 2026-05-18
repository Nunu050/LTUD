import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import DiaryScreen from "../screens/diary/DiaryScreen";
import MapScreen from "../screens/map/MapScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },

        tabBarActiveTintColor: "#ff7b7b",
        tabBarInactiveTintColor: "#9ca3af",

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Diary") {
            iconName = "book";
          } else if (route.name === "Map") {
            iconName = "map";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}