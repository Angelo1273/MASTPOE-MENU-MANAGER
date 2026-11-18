
// DATA TYPES (`src/types/menu.ts`)
// Defines the shape of menu items, course categories,
// and navigation screen states across the app.

//Restricts menu item categories to these exact five culinary courses
export type CourseType = "Starter" | "Main Course" | "Dessert" | "Beverage" | "Special";

// Defines the structure of an individual dish
export interface MenuItem {
  id: string;          // Unique identifier for the dish
  name: string;        // Title of the dish
  description: string; // Ingredients and preparation details
  course: CourseType;  // Category of the course
  price: number;       // Price in Rand (R)
}