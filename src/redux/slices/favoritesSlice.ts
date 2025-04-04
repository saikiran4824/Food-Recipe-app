
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../components/types"; // Use the shared Meal type

// Define the FavoritesState
interface FavoritesState {
  items: Meal[];
}


// Load initial state from localStorage if available
const savedFavorites = localStorage.getItem("favorites");
const initialState: FavoritesState = {
  items: savedFavorites ? JSON.parse(savedFavorites) : [],
};

// Create the slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Meal>) => {
      const exists = state.items.some((meal: Meal) => meal.idMeal === action.payload.idMeal);
      if (!exists) {
        const newItem = {
          idMeal: action.payload.idMeal,
          strMeal: action.payload.strMeal,
          strMealThumb: action.payload.strMealThumb,
          category: action.payload.category,
        };
        state.items.push(newItem);

        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((meal: Meal) => meal.idMeal !== action.payload);

      // Persist to localStorage
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

// Export actions and reducer
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
