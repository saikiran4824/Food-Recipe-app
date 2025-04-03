import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import MealItem from './blocks'
import Header from './header'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

interface Category {
  strArea: string
}

// Fetch meal categories from API
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  const data = await response.json()
  return data.meals || []
}

// Fetch meals for a given category
const fetchMeals = async ({ queryKey }: { queryKey: readonly [string, string] }): Promise<{ meals: Meal[] }> => {
  const [, selectedOption] = queryKey
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOption}`)
  const data = await response.json()
  return { meals: data.meals || [] }
}

// List of meal categories
const categoryList: string[] = [
  'Spanish', 'British', 'French', 'Canadian', 'Chinese',
  'American', 'Indian', 'Italian','American', 'British', 'Canadian', 'Chinese', 'Croatian',
  'Dutch', 'Egyptian', 'Filipino', 'French', 'Greek',
  'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese',
  'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Polish',
  'Portuguese', 'Russian', 'Spanish', 'Thai', 'Tunisian',
  'Turkish', 'Vietnamese'
]

const Main: React.FC = () => {
  const getRandomIndex = () => Math.floor(Math.random() * categoryList.length)
  const [categoryIndex, setCategoryIndex] = useState<number>(getRandomIndex())
  const [selectedOption, setSelectedOption] = useState<string>(categoryList[categoryIndex])
  const [query, setQuery] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('') // Sorting state

  // ✅ Stores all fetched meals
  const [allMeals, setAllMeals] = useState<Meal[]>([])
  const [triggered, setTriggered] = useState<boolean>(false)

  const navigate = useNavigate()
  const { ref, inView } = useInView()

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  // Fetch meals for the selected category
  const { data } = useQuery<{ meals: Meal[] }, Error, { meals: Meal[] }, [string, string]>({
    queryKey: ['meals', selectedOption],
    queryFn: fetchMeals,
    enabled: !!selectedOption,
  })

  // ✅ Append new meals instead of replacing them.
  useEffect(() => {
    if (data?.meals) {
      setAllMeals((prevMeals) => [...prevMeals, ...data.meals]) // Append new meals
    }
  }, [data])

  // ✅ Function to change category when selected manually
  const handleCategoryChange = () => {
    const randomIndex = getRandomIndex()
    setCategoryIndex(randomIndex)
    setSelectedOption(categoryList[randomIndex])
  }

  // ✅ Ensure category updates randomly even after selection
  useEffect(() => {
    handleCategoryChange()
  }, [categories]) // Runs when categories change

  // ✅ Filtering meals based on search query
  let filteredMeals = allMeals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(query.toLowerCase())
  )

  // ✅ Sorting logic applied on the filtered meals
  if (sortOrder === 'Sort A-Z') {
    filteredMeals = [...filteredMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal))
  } else if (sortOrder === 'Sort Z-A') {
    filteredMeals = [...filteredMeals].sort((a, b) => b.strMeal.localeCompare(a.strMeal))
  }

  // ✅ Handle sorting option change
  const handleSortChange = (value: string) => {
    setSortOrder(value)
  }

  // ✅ Infinite Scroll: Load new meals when scrolling
  useEffect(() => {
    if (inView && !triggered && categoryIndex < categoryList.length - 1) {
      setTriggered(true)
      setCategoryIndex((prevIndex) => {
        const newIndex = prevIndex + 1
        setSelectedOption(categoryList[newIndex]) // ✅ Updates category dynamically
        return newIndex
      })
    }
    if (!inView) {
      setTriggered(false)
    }
  }, [inView, categoryIndex, triggered])

  return (
    <>
      <Header 
        query={query}
        setQuery={setQuery}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        category={categories ?? []}
        handleSortChange={handleSortChange}
      />

      <div className="md:pt-5 md:px-5 w-full h-full flex flex-col items-center align-middle text-center bg-[#ebedee93] justify-center relative">
        
        <div className="meal-list grid z-0 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 mt-8">
          {filteredMeals.map((meal: Meal, index: number) => (
            <div key={meal.idMeal} ref={index === filteredMeals.length - 1 ? ref : null}>
              <button onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                <MealItem meal={meal} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main
