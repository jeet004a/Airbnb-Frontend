// App.jsx
import React, { useState, useEffect } from 'react';
import './AirbnbSearch.css';
import {useNavigate} from 'react-router-dom'

const AirBnbSearch = () => {
    let navigate=useNavigate()
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Modern Apartment in Downtown",
      location: "New York City",
      price: 129,
      rating: 4.9,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "Entire apartment",
      bedrooms: 2,
      beds: 3,
      baths: 2,
      superhost: true,
      instantBook: true
    },
    {
      id: 2,
      title: "Cozy Cottage in the Mountains",
      location: "Aspen, Colorado",
      price: 185,
      rating: 4.7,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "Entire cabin",
      bedrooms: 3,
      beds: 4,
      baths: 2,
      superhost: true,
      instantBook: false
    },
    {
      id: 3,
      title: "Beachfront Villa with Pool",
      location: "Miami Beach, Florida",
      price: 320,
      rating: 4.8,
      reviews: 215,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "Entire villa",
      bedrooms: 4,
      beds: 6,
      baths: 3,
      superhost: false,
      instantBook: true
    },
    {
      id: 4,
      title: "Studio in Arts District",
      location: "Los Angeles, California",
      price: 89,
      rating: 4.5,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "Entire studio",
      bedrooms: 1,
      beds: 1,
      baths: 1,
      superhost: true,
      instantBook: true
    },
    {
      id: 5,
      title: "Luxury Penthouse with View",
      location: "Chicago, Illinois",
      price: 450,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "Entire penthouse",
      bedrooms: 3,
      beds: 4,
      baths: 3,
      superhost: true,
      instantBook: true
    },
    {
      id: 6,
      title: "Rustic Farmhouse Retreat",
      location: "Austin, Texas",
      price: 165,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "Entire farmhouse",
      bedrooms: 4,
      beds: 5,
      baths: 2,
      superhost: false,
      instantBook: false
    }
  ]);

  const [filters, setFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    propertyType: 'all',
    bedrooms: 0,
    amenities: []
  });

  const [filteredListings, setFilteredListings] = useState(listings);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Property type options
  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'house', label: 'Houses' },
    { value: 'cabin', label: 'Cabins' },
    { value: 'villa', label: 'Villas' },
    { value: 'studio', label: 'Studios' }
  ];

  // Amenities options
  const amenitiesOptions = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'pool', label: 'Pool' },
    { id: 'parking', label: 'Free Parking' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'washer', label: 'Washer' }
  ];

  // Filter listings based on filters
  useEffect(() => {
    const filtered = listings.filter(listing => {
      // Location filter
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (listing.price < filters.minPrice || listing.price > filters.maxPrice) {
        return false;
      }

      // Property type filter
      if (filters.propertyType !== 'all') {
        const listingType = listing.type.toLowerCase();
        if (!listingType.includes(filters.propertyType)) {
          return false;
        }
      }

      // Bedrooms filter
      if (filters.bedrooms > 0 && listing.bedrooms < filters.bedrooms) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        // This is a simplified check - in a real app, you'd have proper amenities data
        const hasAllAmenities = filters.amenities.every(amenity => 
          listing.amenities?.some(listingAmenity => 
            listingAmenity.toLowerCase().includes(amenity)
          )
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    setFilteredListings(filtered);
  }, [filters, listings]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger filtering through useEffect
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleAmenityToggle = (amenityId) => {
    setFilters(prev => {
      const currentAmenities = [...prev.amenities];
      const index = currentAmenities.indexOf(amenityId);
      
      if (index > -1) {
        currentAmenities.splice(index, 1);
      } else {
        currentAmenities.push(amenityId);
      }

      return {
        ...prev,
        amenities: currentAmenities
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      minPrice: 0,
      maxPrice: 1000,
      propertyType: 'all',
      bedrooms: 0,
      amenities: []
    });
  };

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {'★'.repeat(Math.floor(rating))}
        {'☆'.repeat(5 - Math.floor(rating))}
        <span className="rating-text">{rating}</span>
      </div>
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo" onClick={()=>navigate('/')}>airbnb</div>
          {/* Main Search Bar */}
            {/* <div className="search-container"> */}
            <form className="search-bar" onSubmit={handleSearch}>
                <div className="search-field">
                    <label>Location</label>
                    <input
                    type="text"
                    placeholder="Where are you going?"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                </div>
                
                <div className="search-field">
                    <label>Check in</label>
                    <input
                    type="date"
                    value={filters.checkIn}
                    onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                    />
                </div>
                
                <div className="search-field">
                    <label>Check out</label>
                    <input
                    type="date"
                    value={filters.checkOut}
                    onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                    />
                </div>
                
                <div className="search-field">
                    <label>Guests</label>
                    <div className="guests-input">
                    <button 
                        type="button" 
                        className="guest-btn"
                        onClick={() => handleFilterChange('guests', Math.max(1, filters.guests - 1))}
                    >
                        -
                    </button>
                    <span>{filters.guests} guest{filters.guests !== 1 ? 's' : ''}</span>
                    <button 
                        type="button" 
                        className="guest-btn"
                        onClick={() => handleFilterChange('guests', filters.guests + 1)}
                    >
                        +
                    </button>
                    </div>
                </div>
                {/* <button type="submit" className="search-btn">
                    <span className="search-icon">🔍</span> Search
                </button> */}
                <div className="search-icon" onClick={()=> navigate('/search')}>
                  <i className="fas fa-search"></i>
              </div>
                </form>
            {/* </div> */}
        </div>
        <div className="header-right">
          <button className="become-host">Become a host</button>
          <button className="language-selector">🌐</button>
          <button className="profile-menu">
            <div className="menu-icon">☰</div>
            <div className="avatar">👤</div>
          </button>
        </div>
      </header>

      

      {/* Main Content */}
      <main className="main-content">
        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="filters-left">
            <button 
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
            <button className="filter-btn">Price</button>
            <button className="filter-btn">Type of place</button>
            <button className="filter-btn">Rooms and beds</button>
            <button className="filter-btn">More filters</button>
          </div>
          
          <div className="filters-right">
            <button 
              className="view-toggle"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
            <button className="map-btn">Show map</button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <h3>Price range</h3>
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-input">
                    <label>Min price</label>
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="price-input">
                    <label>Max price</label>
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 1000)}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  className="price-slider"
                  min="0"
                  max="1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>Type of place</h3>
              <div className="property-types">
                {propertyTypes.map(type => (
                  <button
                    key={type.value}
                    className={`type-btn ${filters.propertyType === type.value ? 'active' : ''}`}
                    onClick={() => handleFilterChange('propertyType', type.value)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Bedrooms</h3>
              <div className="bedrooms-selector">
                {[0, 1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    className={`bedroom-btn ${filters.bedrooms === num ? 'active' : ''}`}
                    onClick={() => handleFilterChange('bedrooms', num)}
                  >
                    {num === 0 ? 'Any' : `${num}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {amenitiesOptions.map(amenity => (
                  <label key={amenity.id} className="amenity-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                    />
                    <span>{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-filters" onClick={clearFilters}>
                Clear all
              </button>
              <button className="apply-filters" onClick={() => setShowFilters(false)}>
                Show {filteredListings.length} places
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="results-section">
          <h2>{filteredListings.length} stays available</h2>
          <p className="results-subtitle">Book unique homes and experiences all over the world.</p>
          
          {/* Listings Grid */}
          <div className={`listings-grid ${viewMode}`}>
            {filteredListings.map(listing => (
              <div key={listing.id} className="listing-card">
                <div className="listing-image">
                  <img src={listing.image} alt={listing.title} />
                  <button className="wishlist-btn">♥</button>
                  {listing.superhost && <span className="superhost-badge">SUPERHOST</span>}
                </div>
                
                <div className="listing-info">
                  <div className="listing-header">
                    <h3 className="listing-title">{listing.title}</h3>
                    <div className="listing-rating">
                      {renderStars(listing.rating)}
                      <span className="reviews">({listing.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="listing-location">{listing.location}</p>
                  <p className="listing-type">{listing.type} • {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''}</p>
                  
                  <div className="listing-details">
                    <span>👥 {listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
                    <span>🛁 {listing.baths} bath{listing.baths !== 1 ? 's' : ''}</span>
                  </div>
                  
                  <div className="listing-footer">
                    <div className="listing-price">
                      <span className="price">${listing.price}</span>
                      <span className="per-night"> / night</span>
                    </div>
                    {listing.instantBook && <span className="instant-badge">🔒 Instant Book</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Airbnb Clone. This is a demo project for educational purposes.</p>
      </footer>
    </div>
  );
};

export default AirBnbSearch;