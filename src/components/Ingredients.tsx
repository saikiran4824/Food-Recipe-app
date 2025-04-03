import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface IngredientsProps {
  ingredients: string[]
  measurements: string[]
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients, measurements }) => {
  const ingredientsRef = useRef(null)
  const isIngredientsInView = useInView(ingredientsRef, { once: false, margin: "-50px" })

  return (
    <div ref={ingredientsRef} className='mt-8 max-w-3xl text-center bg-white p-6 rounded-lg shadow-md'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isIngredientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className='text-2xl md:text-3xl font-semibold text-gray-900 mb-4'
      >
        Ingredients
      </motion.h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 text-left lg:grid-cols-3 gap-4 text-base text-gray-700'>
        {ingredients.map((ingredient, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={isIngredientsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='relative pl-8 before:absolute before:left-0 before:top-1 before:w-3 before:h-3 before:bg-[#FC8112] before:rounded-full'
          >
            <span>{ingredient}</span>
            <span className='ml-2'>{measurements[index]}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default Ingredients
