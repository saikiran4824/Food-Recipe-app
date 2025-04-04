export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;  // ✅ Ensure this is strictly 'string', not optional
    category?: string;
  }
  