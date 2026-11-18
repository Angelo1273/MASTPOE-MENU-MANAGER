// Form interface with validation for creating or modifying menu items.

import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/theme";
import { CourseType, MenuItem } from "../Types/menu";

// Null if adding new; contains item data if editing
interface AddEditMenuItemProps {
  editingItem: MenuItem | null; 
  onSave: (itemData: Omit<MenuItem, "id">, existingId?: string) => void;
  onCancel: () => void;
}

const COURSES: CourseType[] = ["Starter", "Main Course", "Dessert", "Beverage", "Special"];

export default function AddEditMenuItem({
  editingItem,
  onSave,
  onCancel,
  }: AddEditMenuItemProps) {
  // Initialize form state (pre-populate if editing, empty if adding)
  const [name, setName] = useState(editingItem ? editingItem.name : "");
  const [description, setDescription] = useState(
    editingItem ? editingItem.description : ""
  );
  const [course, setCourse] = useState<CourseType>(
    editingItem ? editingItem.course : "Main Course"
  );
  const [price, setPrice] = useState(
    editingItem ? editingItem.price.toString() : ""
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Validate inputs before saving
  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setErrorMsg("Please enter a valid price greater than zero.");
      return;
    }
    // Trigger parent save callback with payload
    onSave(
      {
        name: name.trim(),
        description: description.trim(),
        course,
        price: numericPrice,
      },
      editingItem ? editingItem.id : undefined
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {editingItem ? "Edit Menu Dish" : "Add New Menu Dish"}
      </Text>
      <Text style={styles.subtitle}>
        Fill in the recipe and pricing details below.
      </Text>

      {/* Conditional Error Banner */}
      {errorMsg && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}

      {/* Dish Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Dish Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Truffle Mushroom Risotto"
          placeholderTextColor="#64748B"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Course Selection Chips */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Course Category *</Text>
        <View style={styles.courseChipsContainer}>
          {COURSES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.chip, course === c && styles.chipSelected]}
              onPress={() => setCourse(c)}
            >
              <Text
                style={[
                  styles.chipText,
                  course === c && styles.chipTextSelected,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description / Ingredients *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Brief description of flavors and preparation..."
          placeholderTextColor="#64748B"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Price Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price (R) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 145.00"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {editingItem ? "Save Changes" : "Add to Menu"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#991B1B",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  courseChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontWeight: "700",
    fontSize: 14,
  },
  saveButton: {
    flex: 2,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});