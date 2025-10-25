// AirbnbLogin.js
import React, { useState } from 'react';
import './AirbnbLogin.css'; // Import the CSS file
import { useNavigate, Link } from 'react-router-dom';
import {signinCall} from '../apiCalls/userApiCalls'
import {useDispatch} from 'react-redux'
import { addUser } from '../redux/slices/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const validateForm = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 4) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        return newErrors;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            // Simulate API call
            const userInfo=await signinCall({email,password})
            // console.log('hello',userInfo)
            dispatch(addUser(userInfo))
            setTimeout(() => {
                setIsSubmitting(false);
                
                // console.log(email,password)
                // Store authentication status (in real app, use context or redux)
                // localStorage.setItem('isAuthenticated', 'true');
                navigate('/home')
            }, 1500);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="airbnb-login-wrapper">
            <div className="airbnb-login-container">
                <div className="airbnb-container">
                    <div className="airbnb-welcome-section">
                        <div className="airbnb-welcome-content">
                            <h1>Welcome to Airbnb</h1>
                            <p>Log in to discover unique places to stay and experiences around the world.</p>
                            <ul className="airbnb-features">
                                <li><i className="fas fa-home"></i> Find the perfect accommodation</li>
                                <li><i className="fas fa-globe"></i> Explore unique experiences</li>
                                <li><i className="fas fa-heart"></i> Save your favorite places</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="airbnb-login-section">
                        <div className="airbnb-logo">airbnb</div>
                        <h2>Log in</h2>
                        
                        <form onSubmit={handleSubmit}>
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
                                    <span className="airbnb-input-placeholder">Enter your password</span>
                                    <button 
                                        type="button" 
                                        className="airbnb-password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                    </button>
                                    {errors.password && <span className="airbnb-error">{errors.password}</span>}
                                </div>
                                <a href="#" className="airbnb-forgot-password">Forgot password?</a>
                            </div>
                            
                            <button type="submit" className="airbnb-login-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Logging in...
                                    </>
                                ) : (
                                    'Log in'
                                )}
                            </button>
                        </form>
                        
                        <div className="airbnb-divider">
                            <div className="airbnb-divider-line"></div>
                            <div className="airbnb-divider-text">or</div>
                            <div className="airbnb-divider-line"></div>
                        </div>
                        
                        <div className="airbnb-social-login">
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
                        
                        <div className="airbnb-signup-text">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;