import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import SearchFilterSort from "./SearchFilterSort";
import Logo from "./logo";

const Header: React.FC<{
  query: string;
  setQuery: (query: string) => void;
  handleSortChange: (value: string) => void;
  categoryList: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}> = ({
  query,
  setQuery,
  handleSortChange,
  categoryList,
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();

  // Ensure Redux state is updated correctly
  const favoritesCount = useSelector((state: RootState) => state.favorites.items.length);

  return (
    <header className="w-full sticky top-0 bg-white shadow-md px-2 md:px-6 z-50">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-1 w-full">
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 text-[#FC8112] font-extrabold text-[24px] md:text-[28px] tracking-wide hover:cursor-pointer whitespace-nowrap"
        onClick={() => navigate("/")}
      >
        <Logo />
        <span>Tasty Food Recipes</span>
      </div>
  
      {/* Right: Search + Filter + Sort + Favorites (side by side on md+) */}
      <div className="flex md:flex-row md:items-center md:gap-4 gap-3 w-full md:w-auto">
        <SearchFilterSort
          query={query}
          setQuery={setQuery}
          selectedOption={selectedCategory}
          setSelectedOption={setSelectedCategory}
          category={categoryList.map((cat) => ({ strArea: cat }))}
          handleSortChange={handleSortChange}
        />
  
        {/* Favorites Button - moved here on md+ screens */}
        <button
          onClick={() => navigate("/favorites")}
          className="bg-[#FC8112] text-white mt-2 md:mt-0 px-4 py-2  rounded-lg font-semibold whitespace-nowrap flex items-center"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                    C13.09 3.81 14.76 3 16.5 3 
                    19.58 3 22 5.42 22 8.5 
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          ({favoritesCount})
        </button>
      </div>
    </div>
  </header>
  

  );
};

export default Header;
