import React from 'react'

const Header = () => {
  return (
    <div>
        <header>
          <a href="#" className="logo">airbnb</a>
          <div className="search-container">
              <div className="search-item">Anywhere</div>
              <div className="search-divider"></div>
              <div className="search-item">Any week</div>
              <div className="search-divider"></div>
              <div className="search-item">Add guests</div>
              <div className="search-icon">
                  <i className="fas fa-search"></i>
              </div>
          </div>
          <div className="user-menu">
              <a href="#" className="host-link">Become a Host</a>
              <div className="user-icon">
                  <i className="fas fa-bars"></i>
                  <i className="fas fa-user-circle" style={{ fontSize: "28px" }}></i>
              </div>
          </div>
      </header>
    </div>
  )
}

export default Header