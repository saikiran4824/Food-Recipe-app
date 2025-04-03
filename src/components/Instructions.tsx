/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface InstructionsProps {
  strInstructions: string
}

const Instructions: React.FC<InstructionsProps> = ({ strInstructions }) => {
  const instructionsRef = useRef(null)
  const isInstructionsInView = useInView(instructionsRef, { once: false, margin: "-30%" }) // Trigger animation as it enters view
  const [revealedText, setRevealedText] = useState(0)

  useEffect(() => {
    if (isInstructionsInView) {
      setRevealedText(0)
      let index = 0
      const interval = setInterval(() => {
        setRevealedText((prev) => prev + 1)
        index++
        if (index >= strInstructions.split('. ').length) {
          clearInterval(interval)
        }
      }, 80)
      return () => clearInterval(interval)
    }
  }, [isInstructionsInView, strInstructions])

  return (
    <motion.div
      ref={instructionsRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInstructionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='mt-8 max-w-3xl text-center bg-white p-6 rounded-lg shadow-lg border border-gray-200'
    >
      {/* Heading with Scroll-based Scaling Effect */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInstructionsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='text-2xl md:text-3xl font-semibold text-gray-900 mb-4'
      >
        How to Prepare 🍽️
      </motion.h2>

      {/* Instructions List with Scroll-triggered Animations */}
      <div className='text-lg text-gray-700 leading-relaxed text-left space-y-4'>
        {strInstructions
          ?.split('. ')
          .filter((step) => step.trim() !== '')
          .map((step, index) => {
            const stepInViewRef = useRef(null)
            const isStepInView = useInView(stepInViewRef, { once: false, margin: "-10%" }) // Trigger for each step

            return (
              <motion.p
                ref={stepInViewRef}
                key={index}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={isStepInView && index < revealedText ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut", type: "spring", stiffness: 100 }}
                className='relative pl-8 before:absolute before:left-0 before:top-1 before:w-3 before:h-3 before:bg-[#FC8112] before:rounded-full'
              >
                {step}.
              </motion.p>
            )
          })}
      </div>
    </motion.div>
  )
}

export default Instructions
