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