import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { removeFavorite } from '../redux/slices/favoritesSlice'
import { useNavigate } from 'react-router-dom'
import MealItem from './blocks' 
import Header from './header'
import Footer from './Footer'

const FavoritesList: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items) 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <Header
        query=''
        setQuery={() => {}}
        handleSortChange={() => {}}
        categoryList={[]}
        selectedCategory=''
        setSelectedCategory={() => {}}
      />

      <div className='md:pt-5 md:px-5 w-full h-full flex flex-col items-center text-center bg-[#ebedee93] justify-center relative'>
        <h2 className='text-2xl font-bold my-6 text-[#FC8112]'>Your Favorite Recipes</h2>

        {favorites.length === 0 ? (
          <p className='text-gray-600'>No favorite meals yet. Start adding some!</p>
        ) : (
          <div className='meal-list grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-4'>
            {favorites.map((meal) => (
              <div key={meal.idMeal} className='relative'>
                <button onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                  <MealItem meal={meal} /> 
                </button>
                <button
                  className='absolute top-2 right-2 bg-[#FC8112] text-white px-3 py-1 rounded-full shadow-md'
                  onClick={() => dispatch(removeFavorite(meal.idMeal))}
                >
                  Remove ❌
                </button>
              </div>
            ))}
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}

export default FavoritesList
