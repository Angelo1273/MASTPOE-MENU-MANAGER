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
      
      //Starting  an infinite loop
       //that gently  the text container upward.
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
      ></Animated.View>
      
    