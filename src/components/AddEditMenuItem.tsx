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