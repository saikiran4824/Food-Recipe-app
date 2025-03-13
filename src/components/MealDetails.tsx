import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
}

const MealDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json()

        setTimeout(() => {
          setMeal(data.meals ? data.meals[0] : null)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchMealDetails()
  }, [id])

  // 🔹 Show spinner while loading
  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
        <p className='text-xl font-semibold mt-4 text-gray-700'>Fetching details...</p>
      </div>
    )
  }

  if (!meal) {
    return <p className='text-center text-xl font-semibold mt-6'>Meal not found!</p>
  }

  return (
    <div className='min-h-screen bg-[#f9f9f9] flex flex-col items-center py-8 px-4 md:px-8 font-[Poppins]'>
      {/* Meal Title */}
      <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 text-center'>
        {meal.strMeal}
      </h1>

      {/* Meal Image */}
      <div className='mt-6'>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className='w-full max-w-[500px] rounded-xl shadow-lg'
        />
      </div>

      {/* Instructions Section */}
      <div className='mt-8 max-w-3xl text-center bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl md:text-3xl font-semibold text-gray-900 mb-4'>How to Prepare</h2>

        <div className='text-lg text-gray-700 leading-relaxed text-left space-y-4'>
          {(meal.strInstructions || '')
            .split('. ')
            .filter((step) => step.trim() !== '')
            .map((step, index) => (
              <p
                key={index}
                className='relative pl-8 before:absolute before:left-0 before:top-1 before:w-3 before:h-3 before:bg-[#FC8112] before:rounded-full'
              >
                {step}.
              </p>
            ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className='mt-4 bg-[#FC8112] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#e07010] transition-all'
      >
        ← Back to List
      </button>

      {/* Footer */}
      <footer className='mt-6 text-gray-500 text-sm'>
        © {new Date().getFullYear()} Sai Kiran Food Blog | All rights reserved by Preethi.
      </footer>
    </div>
  )
}

export default MealDetails
