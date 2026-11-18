// Summarizes menu statistics, pricing averages, and category counts.
// ==========================================

import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { MenuItem, ScreenType } from "../types/menu";
import { calculateAveragePrice, getCourseCount } from "../utils/menuHelpers";

interface DashboardProps {
  items: MenuItem[];
  onNavigate: (screen: ScreenType) => void;
  onStartAdd: () => void;
}