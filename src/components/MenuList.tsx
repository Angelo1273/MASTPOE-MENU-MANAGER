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