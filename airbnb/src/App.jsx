import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import AirbnbHotelPage from './pages/HotelPage'
import { BrowserRouter as  Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProfilePage from './pages/Profile'
import SignUp from './pages/SignUp'
import WishlistCart from './pages/WishListCart'
import AirBnbSearch from './pages/AirbnbSearch'
function App() {
  const [count, setCount] = useState(0)


  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  return (
    <Router>
      <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotel/:id" element={<AirbnbHotelPage />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/wishlist" element={<WishlistCart />} />
        <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<div>Page not found</div>} />
          <Route path='/search' element={<AirBnbSearch/>}></Route>
      </Routes>
      </div>
    </Router>

    // <div className="App">
    //   <Home></Home>  
    // </div>
  )
}


export default App
