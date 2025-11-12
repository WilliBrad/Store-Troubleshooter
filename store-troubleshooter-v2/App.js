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
          headerStyle: { backgroundColor: "#111" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#111" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Store IT Guide" }}
        />
        <Stack.Screen
          name="IssueList"
          component={IssueListScreen}
          options={({ route }) => ({
            title: route.params.categoryName || "Issues",
          })}
        />
        <Stack.Screen
          name="IssueDetail"
          component={IssueDetailScreen}
          options={({ route }) => ({
            title: route.params.issueTitle || "Details",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
