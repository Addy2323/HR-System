import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import {NavLink} from 'react-router-dom'
import { addUser } from "../utils/localStorage";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      hasError: false,
      errorMessage: '',
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  passwordVisibilityHandler = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  passwordVisibilityHandlerCheck = () => {
    var x = document.getElementById("checkPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    
    // Set loading state
    this.setState({ isLoading: true, hasError: false });
    
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        hasError: true,
        errorMessage: "Passwords do not match!",
        isLoading: false
      });
      return;
    }

    // Add a small delay for smooth loading animation
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        username: this.state.username,
        password: this.state.password,
        role: 'employee',
        departmentId: 1
      };

      const result = addUser(newUser);
      
      if (result.success) {
        // Redirect to login page or show success message
        this.setState({ isLoading: false });
        this.props.history.push('/login');
      } else {
        this.setState({
          hasError: true,
          errorMessage: result.message,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.setState({
        hasError: true,
        errorMessage: "Registration failed. Username might already exist.",
        isLoading: false
      });
    }
  };

  render() {
    return (
      <div className="split-register-container">
        <style>{`
          .split-register-container {
            min-height: 100vh;
            display: flex;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            animation: fadeIn 0.8s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .left-panel {
            flex: 1;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: white;
            position: relative;
            animation: slideInLeft 1s ease-out;
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .left-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          
          .company-logo {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            animation: bounceIn 1.2s ease-out 0.3s both;
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .logo-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #2e8b57 0%, #228b22 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            font-size: 24px;
            color: #ffd700;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(46, 139, 87, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(46, 139, 87, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(46, 139, 87, 0);
            }
          }
          
          .company-info h1 {
            font-size: 2.2rem;
            font-weight: 700;
            margin: 0 0 5px 0;
            letter-spacing: -0.5px;
          }
          
          .company-info p {
            font-size: 1rem;
            opacity: 0.8;
            margin: 0;
          }
          
          .system-description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 50px;
            opacity: 0.9;
            max-width: 80%;
          }
          
          .stats-container {
            display: flex;
            gap: 40px;
            margin-top: 40px;
            animation: fadeInUp 1s ease-out 0.6s both;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .stat-item {
            text-align: left;
          }
          
          .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #3498db;
            margin-bottom: 8px;
            animation: countUp 2s ease-out 1s both;
          }
          
          @keyframes countUp {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .stat-label {
            font-size: 1rem;
            opacity: 0.8;
          }
          
          .right-panel {
            flex: 1;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            animation: slideInRight 1s ease-out;
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .register-form-container {
            width: 100%;
            max-width: 450px;
            background: white;
            padding: 50px 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            animation: zoomIn 0.8s ease-out 0.2s both;
            transform-origin: center;
          }
          
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .form-header {
            text-align: center;
            margin-bottom: 20px;
          }
          
          .form-title {
            font-size: 2rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
          }
          
          .form-subtitle {
            color: #7f8c8d;
            font-size: 0.95rem;
          }
          
          .input-group {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .input-label {
            width: 130px;
            flex-shrink: 0;
            font-size: 14px;
            font-weight: 500;
            color: #2c3e50;
            padding-right: 10px;
          }
          
          .input-wrapper {
            position: relative;
            flex-grow: 1;
          }
          
          .form-input {
            width: 100%;
            padding: 16px 50px 16px 50px;
            border: 1px solid #e1e8ed;
            border-radius: 6px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: white;
            box-sizing: border-box;
            animation: slideUp 0.6s ease-out;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .form-input:focus {
            outline: none;
            border-color: #3498db;
            background: white;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.15);
          }
          
          .form-input::placeholder {
            color: #a0a6b1;
            font-size: 15px;
          }
          
          .input-icon-left {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0a6b1;
            font-size: 18px;
          }
          
          .input-icon-right {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0a6b1;
            font-size: 18px;
          }
          
          .password-toggle {
            cursor: pointer;
            transition: color 0.3s ease;
          }
          
          .password-toggle:hover {
            color: #3498db;
          }
          
          .register-btn {
            width: 100%;
            padding: 15px;
            background: #2c3e50;
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 25px;
            position: relative;
            overflow: hidden;
          }
          
          .register-btn:hover {
            background: #34495e;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
          }
          
          .register-btn:active {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
          }
          
          .register-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .register-btn:hover::before {
            left: 100%;
          }
          
          .register-btn:disabled {
            background: #95a5a6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          .register-btn:disabled:hover {
            background: #95a5a6;
            transform: none;
            box-shadow: none;
          }
          
          .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #ffffff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 8px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .login-link {
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
          }
          
          .login-link a {
            color: #3498db;
            text-decoration: none;
            font-weight: 500;
          }
          
          .login-link a:hover {
            text-decoration: underline;
          }
          
          .demo-section {
            background: #f8f9fa;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            border: 1px solid #e9ecef;
          }
          
          .error-alert {
            background: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
          }
          
          .success-alert {
            background: #efe;
            border: 1px solid #cfc;
            color: #363;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
          }
          
          .success-alert a {
            color: #3498db;
            text-decoration: none;
            font-weight: 600;
          }
          
          @media (max-width: 768px) {
            .register-container {
              flex-direction: column;
            }
            
            .left-panel {
              padding: 40px 20px;
            }
            
            .stats-container {
              gap: 20px;
            }
            
            .right-panel {
              padding: 20px;
            }
            
            .login-form-container {
              padding: 30px 20px;
            }
          }
        `}</style>
        
        <div className="left-panel">
          <div className="company-logo">
            <div className="logo-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="company-info">
              <h1>HRMS Pro</h1>
              <p>Human Resource Management System</p>
            </div>
          </div>
          
          <div className="system-description">
            Streamline your human resource operations with our comprehensive 
            HRMS solution. Manage employees, departments, payroll, and applications 
            across all organizational levels with ease.
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Employees</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Departments</div>
            </div>
          </div>
        </div>
        
        <div className="right-panel">
          <div className="login-form-container">
            <div className="form-header">
              <h1 className="form-title">Create Account</h1>
              <p className="form-subtitle">Sign up to access your dashboard</p>
            </div>
            
            {this.state.hasError && (
              <div className="error-alert">
                {this.state.errorMessage}
              </div>
            )}
            
            {this.state.completed && (
              <div className="success-alert">
                Registration successful! <NavLink to="/login">Sign in now</NavLink>
              </div>
            )}
            
            <form onSubmit={this.onSubmit}>
              <div className="input-group">
                <label className="input-label">Username</label>
                <div className="input-wrapper">
                  <i className="fas fa-user input-icon-left"></i>
                  <input
                    type="text"
                    className="form-input"
                    name="username"
                    placeholder="Enter your username"
                    value={this.state.username}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div className="input-wrapper">
                  <i className="fas fa-id-card input-icon-left"></i>
                  <input
                    type="text"
                    className="form-input"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={this.state.fullname}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon-left"></i>
                  <input
                    type="password"
                    className="form-input"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  <i
                    className={`fas ${this.state.passwordShow ? 'fa-eye' : 'fa-eye-slash'} input-icon-right password-toggle`}
                    onClick={this.passwordVisibilityHandler}
                  ></i>
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon-left"></i>
                  <input
                    type="password"
                    className="form-input"
                    name="checkPassword"
                    id="checkPassword"
                    placeholder="Confirm your password"
                    value={this.state.checkPassword}
                    onChange={this.onChange}
                    required
                  />
                  <i
                    className={`fas ${this.state.passwordCheckShow ? 'fa-eye' : 'fa-eye-slash'} input-icon-right password-toggle`}
                    onClick={this.passwordVisibilityHandlerCheck}
                  ></i>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="register-btn"
                disabled={this.state.isLoading}
              >
                {this.state.isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <div className="login-link">
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
