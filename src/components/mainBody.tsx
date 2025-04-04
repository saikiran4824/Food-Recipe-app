import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice";
import MealItem from "./blocks";
import Header from "./header";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

import { Meal } from "./types"; 

const categoryList: string[] = [
  "Indian", "Spanish", "British", "French", "Canadian", "Chinese",
  "American", "Italian", "Croatian", "Dutch", "Egyptian", "Filipino",
  "Greek", "Irish", "Jamaican", "Japanese", "Kenyan", "Malaysian",
  "Mexican", "Moroccan", "Polish", "Portuguese", "Russian", "Thai",
  "Tunisian", "Turkish", "Vietnamese"
];

const fetchAllMeals = async (): Promise<Meal[]> => {
  const mealPromises = categoryList.map(async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
    const data = await response.json();
    return Array.isArray(data?.meals) ? data.meals.map((meal: Meal) => ({ ...meal, category })) : [];
  });

  const mealsByCategory = await Promise.all(mealPromises);
  return mealsByCategory.flat();
};

const Main: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);  // FIXED

  const { data: allMeals = [] } = useQuery<Meal[]>({
    queryKey: ["allMeals"],
    queryFn: fetchAllMeals,
  });

  const filteredMeals = useMemo(() => {
    let meals = allMeals.filter(
      (meal) =>
        meal.strMeal.toLowerCase().includes(query.toLowerCase()) &&
        (selectedCategory ? meal.category === selectedCategory : true)
    );

    if (sortOrder === "Sort A-Z") {
      meals = [...meals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (sortOrder === "Sort Z-A") {
      meals = [...meals].sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    }

    return meals;
  }, [allMeals, query, selectedCategory, sortOrder]);

  const toggleFavorite = useCallback(
    (meal: Meal) => {
      const isFav = favorites.some((fav: Meal) => fav.idMeal === meal.idMeal);
      dispatch(isFav ? removeFavorite(meal.idMeal) : addFavorite(meal));
    },
    [favorites, dispatch]
  );

  return (
    <>
    
      <Header
        query={query}
        setQuery={setQuery}
        handleSortChange={setSortOrder}
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="md:pt-5 md:px-5 w-full h-full flex flex-col items-center text-center bg-[#ebedee93]">
        <div className="meal-list grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 mt-8">
          {filteredMeals.map((meal) => {
            const isFavorite = favorites.some((fav: Meal) => fav.idMeal === meal.idMeal);
            return (
              <div key={meal.idMeal} className="relative m-3">
                <button onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                  <MealItem meal={meal} />
                </button>
                <button
                  onClick={() => toggleFavorite(meal)}
                  className={`absolute top-2 right-2 p-2 rounded-full transition duration-300 ${
                    isFavorite ? "text-[#FC8112] bg-white shadow-md" : "text-gray-600 bg-white shadow-md"
                  } hover:scale-110`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Main;
