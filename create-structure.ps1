# =========================

# FOODMOOD PROJECT STRUCTURE

# =========================

# Delete old Expo folders

Remove-Item -Recurse -Force app -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force components -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force constants -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force hooks -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force scripts -ErrorAction SilentlyContinue

# =========================

# CREATE SRC STRUCTURE

# =========================

New-Item -ItemType Directory -Force -Path src

# Main folders

New-Item -ItemType Directory -Force -Path src/assets
New-Item -ItemType Directory -Force -Path src/components
New-Item -ItemType Directory -Force -Path src/constants
New-Item -ItemType Directory -Force -Path src/firebase
New-Item -ItemType Directory -Force -Path src/navigation
New-Item -ItemType Directory -Force -Path src/screens
New-Item -ItemType Directory -Force -Path src/services
New-Item -ItemType Directory -Force -Path src/types
New-Item -ItemType Directory -Force -Path src/utils

# Screen folders

New-Item -ItemType Directory -Force -Path src/screens/auth
New-Item -ItemType Directory -Force -Path src/screens/home
New-Item -ItemType Directory -Force -Path src/screens/diary
New-Item -ItemType Directory -Force -Path src/screens/map
New-Item -ItemType Directory -Force -Path src/screens/profile

# =========================

# CREATE FILES

# =========================

# Login Screen

@"
import { View, Text, StyleSheet } from "react-native";

export default function LoginScreen() {
return ( <View style={styles.container}> <Text style={styles.title}>FoodMood</Text> <Text>Login Screen</Text> </View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},

title: {
fontSize: 32,
fontWeight: "bold",
marginBottom: 10,
},
});
"@ | Set-Content src/screens/auth/LoginScreen.tsx

# Home Screen

@"
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
return ( <View style={styles.container}> <Text style={styles.title}>Home Screen</Text> </View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},

title: {
fontSize: 28,
fontWeight: "bold",
},
});
"@ | Set-Content src/screens/home/HomeScreen.tsx

# Navigation

@"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
return ( <NavigationContainer>
<Stack.Navigator initialRouteName="Login">
<Stack.Screen
name="Login"
component={LoginScreen}
/>

```
    <Stack.Screen
      name="Home"
      component={HomeScreen}
    />
  </Stack.Navigator>
</NavigationContainer>
```

);
}
"@ | Set-Content src/navigation/AppNavigator.tsx

# App.tsx

@"
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
return <AppNavigator />;
}
"@ | Set-Content App.tsx

Write-Host ""
Write-Host "====================================="
Write-Host " FOODMOOD STRUCTURE CREATED SUCCESS"
Write-Host "====================================="
Write-Host ""
