import React, { useState, useEffect } from "react";
import MealItem from "./blocks";
import Pagination from "./pagination";
import Modal from "./modal";

function Main() {
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("American");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

  const [postsort, setSort] = useState(true);
  const [modalval, setModalVal] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e);
    setCurrentPage(1);
    console.log();
  };
  // console.log(selectedOption);

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

        // console.log(category_data);
        setCategory(category_data.meals);
        setMeals(data.meals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = meals?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (value) => {
    setSort(value);
    if (value === "Sort A-Z") {
      setSort(true);
      setMeals(meals.reverse());
    } else if (value === "Sort Z-A") {
      setSort(false);
      setMeals(meals.reverse());
    }
  };

  return (
    <div className="pt-5 w-full h-full flex flex-col items-center bg-[#ebedee93] justify-center relative ">
      <p className="text-2xl font-bold w-[75%]"></p>
      <div class="flex relative flex-wrap gap-5 ml-6 md:ml-0 md:w-3/4 mt-5 mb-8">
        <div className="">
          <div className=" inline-block">
            <button
              className="button-style pl-3 pr-3 p-1 z-0"
              onClick={toggleDropdown}
            >
              Filter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 inline-block ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                ></path>
              </svg>
            </button>
            {isOpen && (
              <div className="absolute left-10 right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20 overflow-y-auto max-h-80">
                <ul>
                  {category.map((option) => (
                    <li
                      key={option.strArea}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                      onClick={() => handleOptionClick(option.strArea)}
                    >
                      <input
                        type="radio" // Change type to "radio"
                        name="category" // Set the same name for all radio buttons to ensure only one can be selected
                        value={option.strArea}
                        checked={selectedOption === option.strArea} // Check if the current option is selected
                        onChange={() => handleOptionClick(option.strArea)}
                        className="mr-2 text-black"
                      />
                      {option.strArea}
                      {console.log(selectedOption)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <select
          value={postsort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="text-black button-style bg-slate-100"
        >
          <option value="Sort by">Sort By</option>
          <option value="Sort A-Z">Sort Z-A</option>
          <option value="Sort Z-A">Sort A-Z</option>
        </select>

        <button className="button-style">Fast Delivery</button>
        <button className="button-style">Pure Veg</button>
        <button className="button-style">Non Veg</button>
        <button className="button-style">Offer</button>
      </div>

      <div className=" w-[80%]">
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={meals?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
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
              className="p-2 text-xl rounded-full bg-red-400 w-[50px] font-bold text-white"
            >
              X
            </button>
            <Modal prop={modalval} />
          </div>
        </div>
      )}

      {console.log(postPerPage, meals?.length)}
    </div>
  );
}

export default Main;
