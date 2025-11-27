// components/ScreenBackground.js

import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")} // change to .jpg if needed
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden" // prevent any horizontal scroll bleed
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.18)"
  }
});