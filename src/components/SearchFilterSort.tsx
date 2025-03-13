import React, { useState } from 'react'

interface SearchFilterSortProps {
  query: string
  setQuery: (query: string) => void
  selectedOption: string
  setSelectedOption: (option: string) => void
  category: { strArea: string }[]
  handleSortChange: (value: string) => void
}

const SearchFilterSort: React.FC<SearchFilterSortProps> = ({
  query,
  setQuery,
  selectedOption,
  setSelectedOption,
  category,
  handleSortChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [postsort, setSort] = useState<string>('Sort by')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className='flex md:flex-wrap items-center justify-center md:justify-between gap-4 md:gap-6 w-full px-0 md:px-4 mt-5 mb-8'>
      {/* Search Input */}
      <div className='flex-grow md:flex-none'>
        <input
          type='text'
          value={query}
          onChange={handleSearch}
          placeholder='Search for meals...'
          className='bg-white text-black border-2 border-[#FC8112] py-2 px-4 rounded-full shadow-lg w-full md:w-[320px] focus:outline-none'
        />
      </div>

      {/* Filter Dropdown */}
      <div className='flex items-center justify-between'>
        <div className='relative min-w-20'>
          <button
            onClick={toggleDropdown}
            className='flex items-center rounded-md bg-[#FC8112] text-white py-2 px-4 shadow-lg hover:bg-[#d56c0b] transition duration-300'
          >
            <span>Filter</span>
          </button>
          {isOpen && (
            <div className='absolute left-0 mt-2 w-40 bg-white border border-[#FC8112] rounded-lg shadow-lg z-20 overflow-y-auto max-h-80'>
              <ul className='divide-y divide-[#FC8112]'>
                {category.map((option) => (
                  <li
                    key={option.strArea}
                    className='px-4 py-2 cursor-pointer hover:bg-[#FC8112] hover:text-white flex items-center transition duration-300'
                    onClick={() => handleOptionClick(option.strArea)}
                  >
                    <input
                      type='radio'
                      name='category'
                      value={option.strArea}
                      checked={selectedOption === option.strArea}
                      onChange={() => handleOptionClick(option.strArea)}
                      className='mr-2 text-[#FC8112]'
                    />
                    {option.strArea}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div>
          <select
            value={postsort}
            onChange={(e) => {
              setSort(e.target.value)
              handleSortChange(e.target.value)
            }}
            className='bg-[#FC8112] text-white py-2 px-3 rounded-md  focus:outline-none shadow-lg hover:bg-[#d56c0b] transition duration-300 focus'
          >
            <option value='Sort by'>Sort By</option>
            <option value='Sort A-Z'>Sort A-Z</option>
            <option value='Sort Z-A'>Sort Z-A</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchFilterSort
