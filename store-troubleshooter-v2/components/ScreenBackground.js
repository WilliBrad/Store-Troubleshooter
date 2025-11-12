// components/ScreenBackground.js

import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";

export default function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.5 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
});
