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