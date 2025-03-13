import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/mainBody'
import MealDetails from './components/MealDetails'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/meal/:id' element={<MealDetails />} />
      </Routes>
    </Router>
  )
}

export default App
