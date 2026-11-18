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
  // Handle saving new or edited menu items
  const handleSaveMenuItem = (
    itemData: Omit<MenuItem, "id">,
    existingId?: string
  ) => {
    if (existingId) {
      // Update existing dish
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === existingId ? { ...itemData, id: existingId } : item
        )
      );
      showSuccessFeedback(`Updated "${itemData.name}" successfully.`);
    } else {
      // Add new dish
      const newItem: MenuItem = {
        ...itemData,
        id: Date.now().toString(),
      };
      setMenuItems((prev) => [newItem, ...prev]);
      showSuccessFeedback(`Added "${itemData.name}" to the menu.`);
    }
    setEditingItem(null);
    setActiveScreen("menu");
  };
  const handleStartAdd = () => {
    setEditingItem(null);
    setActiveScreen("form");
  };

  const handleStartEdit = (item: MenuItem) => {
    setEditingItem(item);
    setActiveScreen("form");
  };
  // Handle platform-safe deletion (window.confirm on web, Alert.alert on mobile)
  const handleDeleteItem = (itemToDelete: MenuItem) => {
    const performDelete = () => {
      setMenuItems((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id)
      );
      showSuccessFeedback(`Removed "${itemToDelete.name}" from the menu.`);
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Delete "${itemToDelete.name}" from the menu?`)) {
        performDelete();
      }
    } else {
      Alert.alert(
        "Delete Menu Item",
        `Are you sure you want to remove "${itemToDelete.name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: performDelete },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Top Application Header Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Chef's Menu Manager</Text>
      </View>

      {/* Toast Feedback Banner */}
      {feedbackBanner && (
        <View style={styles.toastBanner}>
          <Text style={styles.toastText}>{feedbackBanner}</Text>
        </View>
      )}

      {/* Dynamic Screen Content Switcher */}
      <View style={styles.contentArea}>
        {activeScreen === "dashboard" && (
          <Dashboard
            items={menuItems}
            onNavigate={setActiveScreen}
            onStartAdd={handleStartAdd}
          />
        )}

        {activeScreen === "menu" && (
          <MenuList
            items={menuItems}
            onEdit={handleStartEdit}
            onDelete={handleDeleteItem}
            onStartAdd={handleStartAdd}
          />
        )}

        {activeScreen === "form" && (
          <AddEditMenuItem
            editingItem={editingItem}
            onSave={handleSaveMenuItem}
            onCancel={() => {
              setEditingItem(null);
              setActiveScreen("menu");
            }}
          />
        )}
      </View>

      {/* Bottom Navigation Tab Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[
            styles.navTab,
            activeScreen === "dashboard" && styles.navTabActive,
          ]}
          onPress={() => setActiveScreen("dashboard")}
        >
          <Text
            style={[
              styles.navTabText,
              activeScreen === "dashboard" && styles.navTabTextActive,
            ]}
          >
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navTab,
            activeScreen === "menu" && styles.navTabActive,
          ]}
          onPress={() => setActiveScreen("menu")}
        >
          <Text
            style={[
              styles.navTabText,
              activeScreen === "menu" && styles.navTabTextActive,
            ]}
          >
            Menu ({menuItems.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navTab,
            activeScreen === "form" && styles.navTabActive,
          ]}
          onPress={handleStartAdd}
        >
          <Text
            style={[
              styles.navTabText,
              activeScreen === "form" && styles.navTabTextActive,
            ]}
          >
            + Add Dish
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  topBarTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  toastBanner: {
    backgroundColor: COLORS.successLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.success,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  toastText: {
    color: "#065F46",
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
  },
  contentArea: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  navTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  navTabActive: {
    backgroundColor: COLORS.primary,
  },
  navTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  navTabTextActive: {
    color: "#FFFFFF",
  },
});