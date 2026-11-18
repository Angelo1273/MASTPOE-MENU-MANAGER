// Renders individual dish details with edit and delete controls.
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { MenuItem } from "../Types/menu";

// Define props expected by the card component
interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}
export default function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      {/* Header Row: Dish Name and Course Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.course}</Text>
        </View>
      </View>

      {/* Dish Description (limited to 2 lines for clean layout) */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Footer Row: Formatted Price and Action Buttons */}
      <View style={styles.footerRow}>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        
        <View style={styles.actionButtons}>
          {/* Trigger edit callback */}
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          
          {/* Trigger delete callback */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}