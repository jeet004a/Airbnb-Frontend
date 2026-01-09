// WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import './WishlistCart.css';

const WishlistCart = () => {
  const [wishlist, setWishlist] = useState([]);

  // Sample wishlist data
  const sampleWishlist = [
    {
      id: 1,
      title: "Modern Apartment in Downtown",
      location: "New York, NY",
      price: 120,
      rating: 4.89,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      type: "Apartment",
      dates: "Nov 15-20, 2024"
    },
    {
      id: 2,
      title: "Beachfront Villa with Pool",
      location: "Miami, FL",
      price: 245,
      rating: 4.95,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      type: "Villa",
      dates: "Dec 10-17, 2024"
    },
    {
      id: 3,
      title: "Cozy Mountain Cabin",
      location: "Aspen, CO",
      price: 189,
      rating: 4.78,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
      type: "Cabin",
      dates: "Jan 5-12, 2025"
    }
  ];

  useEffect(() => {
    // Load wishlist from localStorage or use sample data
    const savedWishlist = localStorage.getItem('wishlist');
    // const savedWishlist=null
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    } else {
      // localStorage.setItem('wishlist', JSON.stringify(sampleWishlist))
      setWishlist(sampleWishlist);
    }
  }, []);

  const removeFromWishlist = (hotelId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== hotelId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{wishlist.length} saved properties</p>
        
        {wishlist.length > 0 && (
          <button className="clear-btn" onClick={clearWishlist}>
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">🤍</div>
          <h2>No properties saved yet</h2>
          <p>Your wishlist is empty</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <div className="card-image">
                <img src={hotel.image} alt={hotel.title} />
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(hotel.id)}
                >
                  ❌
                </button>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{hotel.title}</h3>
                  <div className="card-rating">
                    <span>⭐ {hotel.rating}</span>
                  </div>
                </div>
                
                <p className="card-location">{hotel.location}</p>
                <p className="card-type">{hotel.type}</p>
                <p className="card-dates">{hotel.dates}</p>
                
                <div className="card-footer">
                  <div className="price">
                    <span className="price-amount">${hotel.price}</span>
                    <span className="price-text"> night</span>
                  </div>
                  <div className="reviews">{hotel.reviews} reviews</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistCart;