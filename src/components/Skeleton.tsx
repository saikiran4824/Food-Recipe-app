import React from 'react'
import { motion } from 'framer-motion'

const Skeleton: React.FC = () => {
  return (
    <motion.div
      className='meal-item md:m-4 flex flex-col items-center justify-center w-[90vw] md:w-[300px]'
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.2, 0.5, 0.8, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} // Fade-in effect
    >
      <motion.div
        className='h-[300px] md:h-[200px] w-[98vw] md:w-[300px] object-cover relative rounded-[15px] overflow-hidden bg-gray-300'
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} // Subtle zoom animation
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} // Smooth sliding effect
        />
      </motion.div>
    </motion.div>
  )
}

export default Skeleton
