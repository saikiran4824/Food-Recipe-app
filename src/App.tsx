import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";  // Import Redux store
import Main from "./components/mainBody";
import MealDetails from "./components/MealDetails";
import FavoritesList from "./components/FavoritesList";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/meal/:id" element={<MealDetails />} />
            {/* 404 Route */}
            <Route path="*" element={<h2 className="text-center">Page Not Found</h2>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
