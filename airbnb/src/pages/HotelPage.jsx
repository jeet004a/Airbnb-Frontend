// AirbnbHotelPage.js
import React, { useState, useEffect } from 'react';
import './AirbnbHotelPage.css';
import {useParams} from 'react-router-dom'
import { findHotelById } from '../apiCalls/hotelApiCalls.js';
const AirbnbHotelPage = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [hotel,setHotel]=useState(null)
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const {id}=useParams()
  
  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    const fetchHotel = async () => {
      try {
        const response = await findHotelById(id);
        // console.log(response.data.response)
        if (!response || !response.data?.response?.[0]) {
          setError('Hotel not found');
        } else {
          setHotel(response.data.response[0]);
        }
      } catch (err) {
        console.error('Error fetching hotel:', err);
        setError('Something went wrong while fetching hotel');
      } finally {
        setLoading(false);
      }
    };
    fetchHotel()

    // console.log('xxx',hotel)
    //Below is the sample data
    // setTimeout(() => {
    //   setProperty({
    //     id: propertyId,
    //     title: "Luxury Villa with Private Pool and Ocean View",
    //     location: "Bali, Indonesia",
    //     host: {
    //       name: "Sarah Johnson",
    //       joined: "2018",
    //       verified: true,
    //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
    //     },
    //     images: [
    //       "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    //       "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
    //       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    //       "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    //       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    //     ],
    //     price: 245,
    //     rating: 4.89,
    //     reviews: 127,
    //     type: "Entire villa",
    //     bedrooms: 3,
    //     beds: 4,
    //     bathrooms: 2.5,
    //     amenities: [
    //       "Private pool",
    //       "WiFi",
    //       "Kitchen",
    //       "Air conditioning",
    //       "Hot tub",
    //       "Free parking",
    //       "BBQ grill",
    //       "Ocean view"
    //     ],
    //     description: "Experience luxury in this stunning villa featuring a private infinity pool overlooking the ocean. Perfect for families or groups looking for a peaceful retreat with modern amenities and traditional Balinese architecture.",
    //     highlights: [
    //       "Stunning ocean views from every room",
    //       "Private infinity pool",
    //       "5-minute walk to the beach",
    //       "Fully equipped modern kitchen"
    //     ]
    //   });
    //   setLoading(false);
    // }, 1000);

    if (id) {
      fetchHotel();
      console.log('xxx',hotel)
    } else {
      setError('No hotel ID provided');
      setLoading(false);
    }
  }, [id])

  // useEffect(() => {
  //   if (hotel) {
  //     console.log('Hotel data loaded ✅', hotel);
  //   }
  // }, [hotel]);
  
  if (loading) {
    return <div className="loading" >Loading property...</div>;
  }


  if (!hotel) {
    return <div className="error">Hotel not found</div>;
  }

  const totalNights = checkIn && checkOut ? 
    Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;
  const serviceFee = hotel.price * totalNights * 0.14;
  const totalPrice = hotel.price * totalNights + serviceFee;

  return (
    <div className="airbnb-hotel-page">
      {/* Header */}
      <header className="property-header">
        <h1>{hotel?.name}</h1>
        <div className="property-rating">
          <span className="stars">★ {hotel?.rating}</span>
          <span className="reviews">({hotel?.reviews} reviews)</span>
          <span className="location">📍 {hotel?.location}</span>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image">
          <img 
            src={hotel?.images[selectedImage]} 
            alt={hotel?.title}
          />
        </div>
        <div className="thumbnail-grid">
          {hotel.images.slice(0, 4).map((image, index) => (
            <div 
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${hotel?.title} ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="property-content">
        <div className="property-details">
          {/* Host Info */}
          <section className="host-section">
            <div className="host-info">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150" alt="Not available" />
              <div>
                <h3>Hosted by Jeet</h3>
                <p>Joined in 2018</p>
                {/* {property.host.verified && <span className="verified">✓ Verified</span>} */}
                <span className="verified">✓ Verified</span>
              </div>
            </div>
          </section>

          {/* Property Features */}
          <section className="features-section">
            <div className="feature-item">
              <span className="icon">🏠</span>
              <span>{hotel?.type}</span>
            </div>
            <div className="feature-item">
              <span className="icon">🛏️</span>
              <span>{hotel?.bedrooms} bedrooms</span>
            </div>
            <div className="feature-item">
              <span className="icon">🛌</span>
              <span>{hotel?.beds} beds</span>
            </div>
            <div className="feature-item">
              <span className="icon">🚿</span>
              <span>{hotel?.bathrooms} bathrooms</span>
            </div>
          </section>

          {/* Description */}
          <section className="description-section">
            <h2>About this place</h2>
            <p>{hotel?.description}</p>
          </section>

          {/* Highlights */}
          <section className="highlights-section">
            <h2>What makes this place special</h2>
            <ul>
              {hotel?.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </section>

          {/* Amenities */}
          <section className="amenities-section">
            <h2>What this place offers</h2>
            <div className="amenities-grid">
              {hotel?.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="reviews-section">
            <h2>★ {hotel?.rating} · {hotel?.reviews} reviews</h2>
            <div className="reviews-grid">
              {/* Mock reviews - replace with actual data */}
              <div className="review-card">
                <div className="reviewer">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Reviewer" />
                  <div>
                    <strong>Michael Chen</strong>
                    <p>March 2024</p>
                  </div>
                </div>
                <p>"Absolutely stunning villa! The views were breathtaking and the pool was perfect. Sarah was an amazing host!"</p>
              </div>
              <div className="review-card">
                <div className="reviewer">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Reviewer" />
                  <div>
                    <strong>Emma Rodriguez</strong>
                    <p>February 2024</p>
                  </div>
                </div>
                <p>"Perfect getaway! The villa had everything we needed and the location was ideal. Would definitely return!"</p>
              </div>
            </div>
          </section>
        </div>

        {/* Booking Widget */}
        <div className="booking-widget">
          <div className="price-card">
            <div className="price-header">
              <span className="price">${hotel?.price}</span>
              <span className="period">night</span>
            </div>
            
            <div className="date-selector">
              <div className="date-input">
                <label>CHECK-IN</label>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="date-input">
                <label>CHECKOUT</label>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>

            <div className="guests-selector">
              <label>GUESTS</label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>

            <button className="reserve-btn">
              Reserve
            </button>

            {totalNights > 0 && (
              <div className="price-breakdown">
                <div className="price-line">
                  <span>${hotel?.price} × {totalNights} nights</span>
                  <span>${hotel?.price * totalNights}</span>
                </div>
                <div className="price-line">
                  <span>Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="price-total">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirbnbHotelPage;