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
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.accent,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#475569",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});