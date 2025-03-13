import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MealItem from './blocks'
import Pagination from './pagination'
import Header from './header'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

interface Category {
  strArea: string
}

const Main: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [category, setCategory] = useState<Category[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('American')
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([])
  const [query, setQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postPerPage] = useState<number>(12)

  const navigate = useNavigate()

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        const categoryData = await response.json()
        setCategory(categoryData.meals)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch meals when category changes
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOption}`,
        )
        const data = await response.json()
        setMeals(data.meals || [])
        setFilteredMeals(data.meals || [])
        setCurrentPage(1) // Reset pagination
      } catch (error) {
        console.error(error)
      }
    }

    fetchMeals()
  }, [selectedOption])

  // Filter meals based on search query
  useEffect(() => {
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredMeals(filtered)
    setCurrentPage(1)
  }, [query, meals])

  // Sorting logic
  const handleSortChange = (value: string) => {
    let sortedMeals
    if (value === 'Sort A-Z') {
      sortedMeals = [...filteredMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal))
    } else if (value === 'Sort Z-A') {
      sortedMeals = [...filteredMeals].sort((a, b) => b.strMeal.localeCompare(a.strMeal))
    }
    setFilteredMeals(sortedMeals ?? [])
  }

  // Pagination logic
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = filteredMeals.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        category={category}
        handleSortChange={handleSortChange}
      />
      <div className='md:pt-5 md:px-5 w-full h-full flex flex-col items-center align-middle text-center bg-[#ebedee93] justify-center relative'>
        {/* Meal List */}
        <div className='meal-list grid z-0 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 mt-8'>
          {currentPosts.map((meal) => (
            <div key={meal.idMeal}>
              <button onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                <MealItem meal={meal} />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='w-[80%]'>
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={filteredMeals.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  )
}

export default Main
