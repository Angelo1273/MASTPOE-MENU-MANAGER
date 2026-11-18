// Provides real-time search and category filtering for the menu.

import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/theme";
import { CourseType, MenuItem, ScreenType } from "../Types/menu";
import { filterMenuItems } from "../utils/menuHelpers";
import MenuItemCard from "./MenuItemCard";

interface MenuListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onStartAdd: () => void;
  }

// Available course filter chips
const FILTER_COURSES: (CourseType | "All")[] = [
  "All",
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
  "Special",
];

export default function MenuList({
  items,
  onEdit,
  onDelete,
  onStartAdd,
}: MenuListProps) {
  // Local state for search query and active course filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseType | "All">("All");
  // Filter items using utility helper function
  const filteredItems = filterMenuItems(items, searchQuery, selectedCourse);

  return (
    <View style={styles.container}>
      {/* Header and Add Button */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Full Menu Catalog</Text>
        <TouchableOpacity style={styles.addButton} onPress={onStartAdd}>
          <Text style={styles.addButtonText}>+ Add Dish</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search dishes or ingredients..."
        placeholderTextColor="#64748B"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Horizontal Course Filter Chips */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTER_COURSES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isActive = selectedCourse === item;
            return (
              <TouchableOpacity
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setSelectedCourse(item)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Filtered Menu Items List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onEdit={onEdit} onDelete={onDelete} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No menu dishes found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  addButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 12,
  },
  filterContainer: {
    marginBottom: 14,
  },
  filterList: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterChipText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  listContainer: {
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});