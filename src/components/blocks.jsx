import React from "react";

function MealItem({ meal }) {
  return (
    <div className="meal-item  md:m-4 flex flex-col items-center justify-center w-[90vw]  md:w-[300px] ">
      <div className="h-[300px] md:h-[200px] object-cover relative rounded-[15px] overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-[98vw] md:w-[300px] m-auto"
        />
        <div className="image-overlay w-full h-full absolute top-0 flex items-end p-2 justify-center text-[20px] font-bold text-white "></div>
      </div>

      <div className="mt-3 flex flex-col items-start w-full overflow-hidden m-3">
        <h3 className="font-semibold  ml-4 md:ml-0 overflow-hidden text-gray-700 text-xl">
          {meal.strMeal}
        </h3>

       
      </div>
    </div>
  );
}

export default MealItem;
