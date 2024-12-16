import React, { useState, useEffect } from "react";
import MealItem from "./blocks";
import Pagination from "./pagination";
import Modal from "./modal";

function Main() {
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("American");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [query, setQuery] = useState(""); // To store search query

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const [postsort, setSort] = useState("Sort by");
  const [modalval, setModalVal] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMeals(filtered);
    setCurrentPage(1); // Reset to first page when search query changes
  }, [meals, query]); // This effect will run when meals or query changes

  const handleSearch = (e) => {
    setQuery(e.target.value); // Update the query state as user types
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e);
    setQuery(""); // Reset search query when category changes
    setCurrentPage(1);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const handleSortChange = (value) => {
    setSort(value);

    let sortedMeals;
    if (value === "Sort A-Z") {
      sortedMeals = [...filteredMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (value === "Sort Z-A") {
      sortedMeals = [...filteredMeals].sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    }
    setFilteredMeals(sortedMeals); // Update filteredMeals after sorting
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOption}`
        );
        const categories = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );

        const data = await response.json();
        const category_data = await categories.json();

        setCategory(category_data.meals);
        setMeals(data.meals);
        setFilteredMeals(data.meals); // Initialize filteredMeals with fetched meals
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  // Use filteredMeals here instead of meals for pagination
  const currentPosts = filteredMeals.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-5 w-full h-full flex flex-col items-center bg-[#ebedee93] justify-center relative ">
      <p className="text-2xl font-bold w-[75%]"></p>
      <div className="flex relative flex-wrap gap-5 ml-6 md:ml-0 md:w-3/4 mt-5 mb-8">
        
           {/* Search Input */}
      <div className="">
      <input
  type="text"
  value={query}
  onChange={handleSearch} // Update query state and filter meals dynamically
  placeholder="Search for meals..."
  className="bg-white text-[#FC8112] border-2 border-[#FC8112] py-2 px-4 rounded-full shadow-lg focus:outline-none pl-4 pr-12" // Add padding-right for space for the icon
/>
   <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 30 30"
  className="text-slate-400 h-8 absolute ml-52 -mt-5 md:mt-3 sm:top-1/4 transform -translate-y-1/2"
  style={{ fill: "orange" }} // Changed the color to orange
>
  <path
    d="M13 3C7.4889971 3 3 7.4889971 3 13C3 18.511003 7.4889971 23 13 23C15.396508 23 17.597385 22.148986 19.322266 20.736328L25.292969 26.707031A1.0001 1.0001 0 1 0 26.707031 25.292969L20.736328 19.322266C22.148986 17.597385 23 15.396508 23 13C23 7.4889971 18.511003 3 13 3zM13 5C17.430123 5 21 8.5698774 21 13C21 17.430123 17.430123 21 13 21C8.5698774 21 5 17.430123 5 13C5 8.5698774 8.5698774 5 13 5z"
  ></path>
</svg>
      </div>
        
        {/* Filter Dropdown Button */}
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-[#FC8112] text-white py-2 px-4 rounded-full shadow-lg hover:bg-[#d56c0b] transition duration-300"
          >
            <span>Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-[#FC8112] rounded-lg shadow-lg z-20 overflow-y-auto max-h-80">
              <ul className="divide-y divide-[#FC8112]">
                {category.map((option) => (
                  <li
                    key={option.strArea}
                    className="px-4 py-2 cursor-pointer hover:bg-[#FC8112] hover:text-white flex items-center transition duration-300"
                    onClick={() => handleOptionClick(option.strArea)}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={option.strArea}
                      checked={selectedOption === option.strArea}
                      onChange={() => handleOptionClick(option.strArea)}
                      className="mr-2 text-[#FC8112]"
                    />
                    {option.strArea}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

     



        {/* Sort Dropdown */}
        <select
          value={postsort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-white text-[#FC8112] border-2 border-[#FC8112] py-2 px-4 rounded-full shadow-lg hover:bg-[#FC8112] hover:text-white transition duration-300"
        >
          <option value="Sort by">Sort By</option>
          <option value="Sort A-Z">Sort A-Z</option>
          <option value="Sort Z-A">Sort Z-A</option>
        </select>

        {/* Additional Filters */}
        <button className="button-style shadow-lg hover:bg-[#FC8112] hover:text-white transition duration-300">Fast Delivery</button>
        <button className="button-style shadow-lg hover:bg-[#FC8112] hover:text-white transition duration-300">Pure Veg</button>
        <button className="button-style shadow-lg hover:bg-[#FC8112] hover:text-white transition duration-300">Non Veg</button>
        <button className="button-style shadow-lg hover:bg-[#FC8112] hover:text-white transition duration-300">Offer</button>
      </div>

      {/* Meal List */}
      <div className="meal-list grid z-0 lg:grid-cols-4 grid-cols-1 md:grid-cols-2 mt-8">
        {currentPosts?.map((meal) => (
          <div key={meal.idMeal}>
            <button
              onClick={() => {
                setModalVal(meal.idMeal);
              }}
            >
              <MealItem meal={meal} />
            </button>
          </div>
        ))}
      </div>

      {modalval && (
        <div className="absolute p-2 top-0 bg-[#444444d0] h-full overflow-x-hidden overflow-y-auto">
          <div className=" flex flex-col items-center w-[100vw] h-[100vh]">
            <button
              onClick={() => {
                setModalVal(null);
              }}
              className="p-2 text-xl rounded-full bg-red-400 w-[50px] font-bold text-white"
            >
              X
            </button>
            <Modal prop={modalval} />
          </div>
        </div>
      )}

      <div className="w-[80%]">
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={filteredMeals?.length} // Use filteredMeals length here
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Main;
