import React, { useState, useEffect } from "react";

export default function Modal({ prop }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${prop}`
        );
        const response = await res.json();
        setData(response.meals[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [prop]);

  console.log(data);

  return (
    <div className=" bg-white  p-2  text-gray-700 m-auto  md:w-[60%] w-[90%] rounded-2xl flex flex-col ">
      <div className="h-[200px] md:h-[300px] flex items-center justify-center object-cover relative rounded-[15px] overflow-hidden shadow-xl shadow-slate-600 mb-4">
        <img
          src={data?.strMealThumb}
          alt={data?.strMeal}
          className="w-full m-auto mt-[-30%] "
        />{" "}
      </div>

      <h2 className="text-xl font-bold p-2">{data?.strMeal}</h2>

      <p>
        <span className="text-lg font-bold p-2">Category:</span>{" "}
        {data?.strCategory}
      </p>
      <p>
        <span className="text-lg font-bold p-2">Area:</span> {data?.strArea}
      </p>
      <p>
        <span className="text-lg font-bold p-2">Category:</span>{" "}
        {data?.strCategory}
      </p>

      <div className="flex flex-wrap ml-auto  mr-auto max-w-[90%]">
        <pre className="flex flex-col whitespace-pre-wrap">
          <span className="text-lg font-bold p-2">Instructions:</span>
          {data?.strInstructions}
        </pre>
      </div>

      <div className="m-auto mt-4 flex flex-col ">
        <span className="text-xl font-bold p-2">Ingredients:</span>
        <ol className="gap-2 flex flex-col">
          {Object.entries(data || {})
            .filter(([key, value]) => key.startsWith("strIngredient") && value)
            .map(([key, value]) => (
              <li key={key}>
                <span className="text-md font-semibold p-2">{value}</span> -{" "}
                {data[`strMeasure${key.slice(13)}`]}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
