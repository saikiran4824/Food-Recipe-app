import React from 'react'
import SearchFilterSort from './SearchFilterSort'
import Logo from './logo'

interface HeaderProps {
  query: string
  setQuery: (query: string) => void
  selectedOption: string
  setSelectedOption: (option: string) => void
  category: { strArea: string }[]
  handleSortChange: (value: string) => void
}

const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  selectedOption,
  setSelectedOption,
  category,
  handleSortChange,
}) => {
  return (
    <header className='w-full sticky top-0 bg-white shadow-md  px-2 md:px-6  flex flex-col md:flex-row md:items-center md:justify-between z-50'>
      {/* Logo Section */}
      <div className='text-[#FC8112] hover:cursor-pointer my-4 font-extrabold text-[28px]  tracking-wide flex items-center  gap-2'>
        <Logo></Logo>
        <span>Tasty Food Recipes </span>
      </div>

      {/* Search, Filter, and Sort Component */}
      {/* <div className=' flex flex-wrap justify-center md:justify-end items-center gap-4'>
        <SearchFilterSort
          query={query}
          setQuery={setQuery}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          category={category}
          handleSortChange={handleSortChange}
        />
      </div> */}
    </header>
  )
}

export default Header
