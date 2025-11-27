// App.js

import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import IssueListScreen from "./screens/IssueListScreen";
import IssueDetailScreen from "./screens/IssueDetailScreen";

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Root MUST be flex:1 so web fills screen */}
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="IssueList" component={IssueListScreen} />
            <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}