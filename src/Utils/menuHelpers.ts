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
//Counts how many items exist within a specific course category.
 
export const getCourseCount = (items: MenuItem[], course: CourseType): number => {

  // Filter items matching the requested course and return the length
  return items.filter((item) => item.course === course).length;
};

//Filters menu items based on a search query (matching name or description)
// and an optional course category filter
export const filterMenuItems = (
  items: MenuItem[],
  searchQuery: string,
  selectedCourse: CourseType | "All"
): MenuItem[] => {
  return items.filter((item) => {
    // Check if search query matches either dish name or description (case-insensitive)
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Check if item matches the selected course filter (or if "All" is selected)
    const matchesCourse =
      selectedCourse === "All" || item.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });
};
