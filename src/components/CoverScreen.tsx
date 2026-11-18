//Landing/welcome screen for the Chef's Menu Manager application.
//Displays an animated "Greetings, Chef" welcome message that smoothly fades in.

import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/theme";

//Props accepted by the CoverScreen component.
interface CoverScreenProps {
  onEnter: () => void;
}
export default function CoverScreen({ onEnter }: CoverScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      //Starting an infinite loop
      //that gently moves the text container upward.
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -8,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [fadeAnim, slideAnim, floatAnim]);

  return (
    // Main full-screen container centering the welcome card
    <View style={styles.container}>
      {/* Animated wrapper combining opacity and combined vertical translation */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              // Combine initial entrance slide with ongoing floating offset
              { translateY: Animated.add(slideAnim, floatAnim) },
            ],
          },
        ]}
      >
        {/* App brand eyebrow label */}
        <Text style={styles.badge}>CHEF&apos;S MENU MANAGER</Text>

        {/* Primary animated greeting headline */}
        <Text style={styles.greeting}>Greetings, Chef</Text>

        {/* Supporting tagline describing core app purpose */}
        <Text style={styles.subtitle}>
          Curate your courses, manage pricing, and craft your culinary lineup.
        </Text>

        {/* Primary call-to-action button to transition to the Dashboard */}
        <TouchableOpacity
          style={styles.enterButton}
          onPress={onEnter}
          activeOpacity={0.85}
        >
          <Text style={styles.enterButtonText}>Open Kitchen Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

/**
 * Component stylesheet utilizing centralized theme colors with safe fallbacks.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 340,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    color: COLORS.primary || "#D97706",
    marginBottom: 12,
  },
  greeting: {
    fontSize: 38,
    fontWeight: "800",
    color: COLORS.textPrimary || "#1F2937",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary || "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 36,
  },
  enterButton: {
    backgroundColor: COLORS.primary || "#D97706",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    // Cross-platform subtle drop shadow (iOS shadow* + Android elevation)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  enterButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});


