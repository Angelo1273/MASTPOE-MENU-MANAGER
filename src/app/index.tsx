// Coordinates global application state, screen navigation,
// success feedback banners, and platform-safe item deletions.

import { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  } from "react-native";
import AddEditMenuItem from "../components/AddEditMenuItem";
import Dashboard from "../components/Dashboard";
import MenuList from "../components/MenuList";
import { COLORS } from "../constants/theme";
import { MenuItem, ScreenType } from "../Types/menu";
// Initial sample menu items for immediate application demonstration
const INITIAL_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Crispy Calamari & Lemon Aioli",
    description:
      "Flash-fried Falkland calamari tubes served with roasted garlic aioli and charred lemon.",
    course: "Starter",
    price: 95.0,
  },
  {
    id: "2",
    name: "Grilled Karoo Lamb Chops",
    description:
      "Herb-crusted free-range lamb loin chops with rosemary jus and baby potatoes.",
    course: "Main Course",
    price: 220.0,
  },
  {
    id: "3",
    name: "Cape Malva Pudding",
    description:
      "Warm apricot-glazed sponge pudding served with vanilla bean custard.",
    course: "Dessert",
    price: 85.0,
  },
]
export default function Index() {
  // Global Application State
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard");
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  // Show temporary success feedback toast banner
  const showSuccessFeedback = (message: string) => {
    setFeedbackBanner(message);
    setTimeout(() => {
      setFeedbackBanner(null);
    }, 3500);
  };