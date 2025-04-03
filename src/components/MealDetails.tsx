import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Ingredients from './Ingredients'
import Instructions from './Instructions'
import Footer from './Footer'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  strTags: string
  strYoutube: string
  ingredients: string[]
  measurements: string[]
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
          const mealData = data.meals ? data.meals[0] : null

          if (mealData) {
            const ingredients: string[] = []
            const measurements: string[] = []
            for (let i = 1; i <= 20; i++) {
              const ingredient = mealData[`strIngredient${i}`]
              const measure = mealData[`strMeasure${i}`]
              if (ingredient && ingredient !== "" && measure) {
                ingredients.push(ingredient)
                measurements.push(measure)
              }
            }

            setMeal({
              ...mealData,
              ingredients,
              measurements,
            })
          }

          setLoading(false)
        }, 500)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchMealDetails()
  }, [id])

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

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className='text-4xl md:text-5xl font-extrabold text-[#FC8112] text-center'
      >
        {meal.strMeal}
      </motion.h1>

      {/* ✅ Image & Ingredients Side-by-Side on Laptop/Desktop with Equal Height & Width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className='mt-6 w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-8'
      >
        {/* Image Container */}
        <div className='w-full lg:w-1/2 flex justify-center items-center'>
          <div className='w-full max-w-[500px] h-full flex items-center justify-center bg-white shadow-lg rounded-xl'>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className='w-full h-auto max-h-[400px] object-cover rounded-xl'
            />
          </div>
        </div>

        {/* Ingredients Container - Same Size as Image Container */}
        <div className='w-full lg:w-1/2 h-full flex items-center justify-center bg-white shadow-lg rounded-xl p-6'>
          <Ingredients ingredients={meal.ingredients} measurements={meal.measurements} />
        </div>
      </motion.div>

      <Instructions strInstructions={meal.strInstructions} />

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-[#FC8112] text-white font-semibold px-6 py-3 mb-4 rounded-full shadow-md hover:bg-[#e07010] transition"
      >
        ← Back to List
      </button>

      <Footer />
    </div>
  )
}

export default MealDetails
