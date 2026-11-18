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