// AirbnbSignUp.js
import React, { useState } from 'react';
import './AirBnbSignup.css'; // Import the CSS file
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!username) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                // Store authentication status (in real app, use context or redux)
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/home');
            }, 1500);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="airbnb-signup-wrapper">
            <div className="airbnb-signup-container">
                <div className="airbnb-container">
                    <div className="airbnb-welcome-section">
                        <div className="airbnb-welcome-content">
                            <h1>Join Airbnb</h1>
                            <p>Create an account to discover unique places to stay and experiences around the world.</p>
                            <ul className="airbnb-features">
                                <li><i className="fas fa-home"></i> Find the perfect accommodation</li>
                                <li><i className="fas fa-globe"></i> Explore unique experiences</li>
                                <li><i className="fas fa-heart"></i> Save your favorite places</li>
                                <li><i className="fas fa-user-plus"></i> Personalize your experience</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="airbnb-signup-section">
                        <div className="airbnb-logo">airbnb</div>
                        <h2>Sign up</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="airbnb-form-group">
                                <label htmlFor="username">Username</label>
                                <div className="airbnb-input-container">
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder=" "
                                    />
                                    <i className="fas fa-user airbnb-input-icon"></i>
                                    <span className="airbnb-input-placeholder">Choose a username</span>
                                    {errors.username && <span className="airbnb-error">{errors.username}</span>}
                                </div>
                            </div>
                            
                            <div className="airbnb-form-group">
                                <label htmlFor="email">Email</label>
                                <div className="airbnb-input-container">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder=" "
                                    />
                                    <i className="fas fa-envelope airbnb-input-icon"></i>
                                    <span className="airbnb-input-placeholder">Enter your email</span>
                                    {errors.email && <span className="airbnb-error">{errors.email}</span>}
                                </div>
                            </div>
                            
                            <div className="airbnb-form-group">
                                <label htmlFor="password">Password</label>
                                <div className="airbnb-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder=" "
                                    />
                                    <i className="fas fa-lock airbnb-input-icon"></i>
                                    <span className="airbnb-input-placeholder">Create a password</span>
                                    <button 
                                        type="button" 
                                        className="airbnb-password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                    </button>
                                    {errors.password && <span className="airbnb-error">{errors.password}</span>}
                                </div>
                            </div>
                            
                            <div className="airbnb-form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="airbnb-input-container">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder=" "
                                    />
                                    <i className="fas fa-lock airbnb-input-icon"></i>
                                    <span className="airbnb-input-placeholder">Confirm your password</span>
                                    <button 
                                        type="button" 
                                        className="airbnb-password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                    </button>
                                    {errors.confirmPassword && <span className="airbnb-error">{errors.confirmPassword}</span>}
                                </div>
                            </div>
                            
                            <button type="submit" className="airbnb-signup-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Creating account...
                                    </>
                                ) : (
                                    'Sign up'
                                )}
                            </button>
                        </form>
                        
                        <div className="airbnb-divider">
                            <div className="airbnb-divider-line"></div>
                            <div className="airbnb-divider-text">or</div>
                            <div className="airbnb-divider-line"></div>
                        </div>
                        
                        <div className="airbnb-social-signup">
                            <button className="airbnb-social-btn">
                                <i className="fab fa-facebook-f" style={{color: '#1877F2'}}></i>
                                Continue with Facebook
                            </button>
                            <button className="airbnb-social-btn">
                                <i className="fab fa-google" style={{color: '#EA4335'}}></i>
                                Continue with Google
                            </button>
                            <button className="airbnb-social-btn">
                                <i className="fab fa-apple"></i>
                                Continue with Apple
                            </button>
                        </div>
                        
                        <div className="airbnb-login-text">
                            Already have an account? <Link to="/login">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;