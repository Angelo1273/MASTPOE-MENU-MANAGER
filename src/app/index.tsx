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
