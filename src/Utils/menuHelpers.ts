//UTILITY & HELPER FUNCTIONS 
// Pure functions to compute statistics and filter menu items.
import { MenuItem, CourseType } from "../Types/menu";


 //Calculates the average price across all items currently on the menu.
 export const calculateAveragePrice = (items: MenuItem[]): number => {
  // Return 0 if the menu is empty to prevent division-by-zero errors
  if (items.length === 0) return 0;
  // Sum up all item prices and divide by the total number of items
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return total / items.length;
};
 