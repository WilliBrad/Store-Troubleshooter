import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import IssueListScreen from "./screens/IssueListScreen";
import IssueDetailScreen from "./screens/IssueDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IssueList" component={IssueListScreen} />
        <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}