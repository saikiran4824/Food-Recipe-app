import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className='w-full bg-[#FC8112] py-4 bottom-0'>
      <div className='w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between text-white'>
        <span className='font-bold text-2xl'>Tasty Food Recipes</span>

        <span className='text-sm mt-2 md:mt-0'>
          © {new Date().getFullYear()} Pr Sai Kiran 
        </span>
      </div>
    </div>
  )
}

export default Footer
