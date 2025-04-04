import React, { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton'; // Import Skeleton Component

interface Meal {
  strMeal: string;
  strMealThumb: string;
}

interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When item enters viewport, show shimmer for 1s before loading actual data
          setTimeout(() => setIsLoading(false), 1000);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the item is visible
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div ref={itemRef} className="meal-item md:m-4 flex flex-col items-center justify-center w-[90vw] md:w-[300px]">
      <div className="h-[300px] md:h-[200px] object-cover relative rounded-[15px] overflow-hidden">
        {isLoading && <Skeleton />} {/* Show shimmer when loading */}

        {!isLoading && (
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-[98vw] md:w-[300px] m-auto transition-opacity duration-500"
          />
        )}
      </div>

      <div className="mt-3 flex flex-col items-start w-full overflow-hidden m-3">
        <h3 className="font-semibold ml-4 md:ml-0 overflow-hidden text-gray-700 text-xl">
          { meal.strMeal} 
        </h3>
      </div>
    </div>
  );
};

export default MealItem;
