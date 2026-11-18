// Summarizes menu statistics, pricing averages, and category counts.
// ==========================================

import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { MenuItem, ScreenType } from "../Types/menu";
import { calculateAveragePrice, getCourseCount } from "../utils/menuHelpers";

interface DashboardProps {
  items: MenuItem[];
  onNavigate: (screen: ScreenType) => void;
  onStartAdd: () => void;
}
export default function Dashboard({ items, onNavigate, onStartAdd }: DashboardProps) {
  // Compute analytics dynamically on render
  const avgPrice = calculateAveragePrice(items);
  const starterCount = getCourseCount(items, "Starter");
  const mainCount = getCourseCount(items, "Main Course");
  const dessertCount = getCourseCount(items, "Dessert");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome & Quick Action Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Culinary Management Portal</Text>
        <Text style={styles.welcomeSubtitle}>
          Manage your restaurant offerings, update pricing, and curate courses effortlessly.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onStartAdd}>
          <Text style={styles.primaryButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Menu Analytics</Text>