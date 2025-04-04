# 🍽️ Food Recipe Application

A modern, performant, and scalable food recipe web app built with **React.js**, **Redux Toolkit**, **React Query**, **React Router**, and **Tailwind CSS**. The app allows users to search, explore, and save food recipes with a clean and responsive UI.

---

## 🧱 Tech Stack

| Technology        | Purpose                                           |
|-------------------|---------------------------------------------------|
| **React.js**       | Frontend library for building UI components       |
| **Redux Toolkit**  | Global state management (favorites, UI state)     |
| **React Query**    | Data fetching, caching & background updates       |
| **React Router v6**| Client-side routing                               |
| **Tailwind CSS**   | Utility-first CSS framework for fast UI styling   |
| **Axios/Fetch**    | HTTP client for API calls                         |
| **TheMealDB API**  | Free API for recipe data                          |

---

## ⚙️ Features

- ✅ **Search Recipes** via keyword input  
- ✅ **View Full Recipe Details**: ingredients, image, and instructions  
- ✅ **Add/Remove Favorites** using Redux  
- ✅ **Client-side Routing** with dynamic routes  
- ✅ **Optimized API Calls** using React Query  
- ✅ **Skeleton Loaders** to improve perceived performance  
- ✅ **Fully Responsive UI** for all device sizes  
- ✅ **Graceful Error & Loading State Management**  
- ✅ **Code-splitting & performance optimization**  

---
## 🧠 State Management
---

Global State:
Managed using Redux Toolkit, especially for managing the favorites list and UI state (e.g., modals or filters).

Async State & Caching:
API data is managed using React Query, which offers out-of-the-box caching, retry logic, stale time, and background updates.

Local State:
Controlled using useState or useReducer for form inputs and component-specific interactions.

---
