// Summarizes menu statistics, pricing averages, and category counts.
// ==========================================

import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { MenuItem, ScreenType } from "../Types/menu";
import { calculateAveragePrice, getCourseCount } from "../Utils/menuHelpers";

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
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background || "#f5f5f5",
  },
  
  welcomeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.primary || "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
});