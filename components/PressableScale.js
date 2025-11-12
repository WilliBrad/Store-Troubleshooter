// components/PressableScale.js
import React, { useRef } from "react";
import { Animated, Pressable } from "react-native";

export default function PressableScale({
  children,
  onPress,
  style,
  scaleTo = 0.96,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue) => {
    Animated.timing(scale, {
      toValue,
      duration: 90,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(scaleTo)}
        onPressOut={() => animateTo(1)}
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}