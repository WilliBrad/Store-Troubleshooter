// components/ScreenBackground.js
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")} // <- your fries image
      style={styles.bg}
      resizeMode="cover"
    >
      {/* subtle overlay so text is readable */}
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)", // tweak if you want lighter/darker
  },
});