import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { addUser,fetchUser } from '../redux/slices/userSlice'
import { useNavigate, Link } from 'react-router-dom';
const Header = () => {
  const { user } = useSelector((state) => state.user); // ✅ get user from state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('abc',user)
  useEffect(() => {
    const token = localStorage.getItem('token')
    // ✅ Only fetch if token exists and user not loaded yet
    if (token && user.length<1) {
      console.log('Fetching user info...');
      dispatch(fetchUser());
    }
  }, [dispatch, user]);
  const handleUserClick=(userId)=>{
    window.open(`/profile/${userId}`, '_blank')
  }

  return (
    <div>
        <header>
          <a href="/home" className="logo">airbnb</a>
          <div className="search-container">
              <div className="search-item" onClick={()=> navigate('/search')}>Anywhere</div>
              <div className="search-divider"></div>
              <div className="search-item" onClick={()=> navigate('/search')}>Any week</div>
              <div className="search-divider"></div>
              <div className="search-item" onClick={()=> navigate('/search')}>Add guests</div>
              <div className="search-icon" onClick={()=> navigate('/search')}>
                  <i className="fas fa-search"></i>
              </div>
          </div>
          <div className="user-menu">
              <a href="#" className="host-link">Become a Host</a>
              <div className="user-icon" onClick={() => handleUserClick(user[0]?.id)}>
                  <i className="fas fa-bars"></i>
                  <h3 style={{ cursor: "pointer" }}>{user && user.length > 0 ? user[0].firstname : 'Guest'}</h3>
                  <i className="fas fa-user-circle" style={{ fontSize: "28px", cursor: "pointer" }}></i>
              </div>
          </div>
      </header>
    </div>
  )
}

export default Header