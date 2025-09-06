import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as  Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp'
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
      </Routes>
      </div>
    </Router>

    // <div className="App">
    //   <Home></Home>  
    // </div>
  )
}


export default App
