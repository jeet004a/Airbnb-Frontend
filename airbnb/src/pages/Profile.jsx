// UserProfilePage.js
import React, { useState,useEffect } from 'react';
import './UserProfilePage.css';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { updateUser } from '../apiCalls/userApiCalls';
const UserProfilePage = () => {
  // Sample data using only the fields from your schema
  const sampleUser = {
    id: 1,
    firstname: 'Sarah',
    lastname: 'Chen',
    email: 'sarah.chen@example.com',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    createdAt: '2023-06-15T00:00:00.000Z'
  };
  const [user, setUser] = useState(sampleUser);
  const [formData, setFormData] = useState({ ...sampleUser });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(sampleUser.profileImage);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const {id}=useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(()=>{
    const fetchUser = async () => {
        
        // console.log(response.data.data)
          try {
            const response=await axios(`http://localhost:3001/api/v1/auth/user/profile/${id}`)
            console.log(response.data.data)
            if (!response.data.data) {
              setError('Hotel not found');
            } else {
              setData(response.data.data);
            }
          } catch (err) {
            console.error('Error fetching hotel:', err);
            setError('Something went wrong while fetching hotel');
          } finally {
            setLoading(false);
          }
        };
        if (id) {
            fetchUser();
            console.log('data is here ',data)
        } else {
            setError('No hotel ID provided');
            setLoading(false);
        }
  },[id])

  if (loading) {
    return <div className="loading" >User info loading...</div>;
  }


  if (!data) {
    return <div className="error">User not found</div>;
  }

  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Simulate API call
    
    const response=await updateUser(formData)
    // console.log('mmm',response.data.data)
    
    
    setTimeout(() => {
      const updatedUser = {
        ...formData,
        profileImage: previewImage
      };
      
      setUser(response.data.data);
      setData(response.data.data)
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setProfilePicture(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setProfilePicture(null);
    setFormData({ ...user });
    setPreviewImage(user.profileImage);
  };

  return (
    <div className="airbnb-profile-page">
      {/* Header */}
      <a href="/home" className="logoair">airbnb</a>
      <div className="profile-header">
        <div className="header-content">
          <div className="profile-hero">
            <div className="profile-image-large">
              <img src={previewImage} alt={`${data?.firstname} ${data?.lastname}`} />
              {isEditing && (
                <label className="change-photo-btn">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                  Change Photo
                </label>
              )}
            </div>
            <div className="profile-intro">
              <div className="name-section">
                <h1>{data?.firstname} {data?.lastname}</h1>
                <p className="member-since">
                  Joined in {new Date(data?.created_at).getFullYear()}
                </p>
              </div>

              {!isEditing && (
                <button 
                  className="airbnb-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <div className="content-container">
          {/* Success Message */}
          {successMessage && (
            <div className="airbnb-success-message">
              <i className="fas fa-check"></i>
              {successMessage}
            </div>
          )}

          {isEditing ? (
            <form className="edit-profile-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Personal info</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First name</label>
                    <input
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-section">
                <h3>Personal information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-label">First Name</div>
                    <div className="info-value">{data?.firstname}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Last Name</div>
                    <div className="info-value">{data?.lastname}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Email</div>
                    <div className="info-value">{data?.email}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Member Since</div>
                    <div className="info-value">
                      {(() => {
                            if (!data?.created_at) return 'N/A';
                            return new Date(data.created_at.replace(' ', 'T')).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                            });
                        })()}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">User ID</div>
                    <div className="info-value">{data?.id}</div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Account</h3>
                <div className="account-actions">
                  <button className="account-btn">
                    <i className="fas fa-shield-alt"></i>
                    Privacy & settings
                  </button>
                  <button className="account-btn">
                    <i className="fas fa-question-circle"></i>
                    Help & support
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;