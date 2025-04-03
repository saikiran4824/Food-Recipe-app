import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Main from './components/mainBody'
import MealDetails from './components/MealDetails'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/meal/:id' element={<MealDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
