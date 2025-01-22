import React, { useState, useEffect } from "react";
import MealItem from "./blocks";
import Pagination from "./pagination";
import Modal from "./modal";
import MyComponent from "./header";

function Main() {
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("American");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);
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
    setCurrentPage(1);
  }, [meals, query]);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e);
    setQuery("");
    setCurrentPage(1);
    setIsOpen(false);
  };

  const handleSortChange = (value) => {
    setSort(value);

    let sortedMeals;
    if (value === "Sort A-Z") {
      sortedMeals = [...filteredMeals].sort((a, b) =>
        a.strMeal.localeCompare(b.strMeal)
      );
    } else if (value === "Sort Z-A") {
      sortedMeals = [...filteredMeals].sort((a, b) =>
        b.strMeal.localeCompare(a.strMeal)
      );
    }
    setFilteredMeals(sortedMeals);
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
        setFilteredMeals(data.meals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = filteredMeals.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <MyComponent />
      <div className="md:pt-5 w-full h-full flex flex-col items-center align-middle text-center bg-[#ebedee93] justify-center relative ">
        <div className="flex relative flex-wrap md:justify-between text-center gap-5 ml-6 md:ml-0 md:w-3/4 mt-5 mb-8">
          <div className="">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search for meals..."
              className="bg-white text-[#FC8112] border-2 border-[#FC8112] py-2 px-4 rounded-full shadow-lg w-[320px] focus:outline-none pl-4 pr-12" // Add padding-right for space for the icon
            />
          </div>

          <div className="relative inline-block">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-[#FC8112] text-white mr-8 sm:mr-0 py-2 px-4 rounded-full shadow-lg hover:bg-[#d56c0b] transition duration-300"
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

          <select
            value={postsort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="flex items-center bg-[#FC8112] text-white py-2 px-4  ml-16 sm:ml-0  rounded-full shadow-lg hover:bg-[#d56c0b] transition duration-300"
          >
            <option
              className="px-4 py-2 cursor-pointer hover:bg-[#FC8112] hover:text-white flex items-center transition duration-300"
              value="Sort by"
            >
              Sort By
            </option>
            <option
              className="px-4 py-2 cursor-pointer hover:bg-[#FC8112] hover:text-white flex items-center transition duration-300"
              value="Sort A-Z"
            >
              Sort A-Z
            </option>
            <option
              className="px-4 py-2 cursor-pointer hover:bg-[#FC8112] hover:text-white flex items-center transition duration-300"
              value="Sort Z-A"
            >
              Sort Z-A
            </option>
          </select>
        </div>

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
                className="p-2 text-xl rounded-full bg-[#FC8112] w-[50px] font-bold text-white justify-end right-0 "
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
    </>
  );
}

export default Main;
