import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Alert } from "react-bootstrap";
import { authenticateUser, initializeDefaultData } from "../utils/localStorage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      hasError: false,
      errorMessage: '',
      isLoading: false,
      done: false
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
    
    // Initialize default data if needed
    initializeDefaultData();
    
    // Add a small delay for smooth loading animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const result = authenticateUser(this.state.username, this.state.password);
      
      if (result.success) {
        localStorage.setItem('token', JSON.stringify(result));
        this.setState({ done: true, isLoading: false });
      } else {
        this.setState({
          hasError: true,
          errorMessage: result.message,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      this.setState({
        hasError: true,
        errorMessage: "Login failed. Please try again.",
        isLoading: false
      });
    }
  };

  render() {
    return (
      <div className="split-login-container">
        <style>{`
          .split-login-container {
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
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 8px 0;
            color: white;
          }
          
          .company-info p {
            font-size: 1.1rem;
            color: #bdc3c7;
            margin: 0;
          }
          
          .system-description {
            margin: 40px 0;
            font-size: 1.1rem;
            line-height: 1.6;
            color: #ecf0f1;
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
            color: #bdc3c7;
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
          
          .login-form-container {
            width: 100%;
            max-width: 400px;
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
            margin-bottom: 40px;
          }
          
          .form-title {
            font-size: 1.8rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
          }
          
          .form-subtitle {
            color: #7f8c8d;
            font-size: 0.95rem;
          }
          
          .input-group {
            margin-bottom: 20px;
          }
          
          .input-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #2c3e50;
            margin-bottom: 6px;
          }
          
          .input-wrapper {
            position: relative;
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
          
          .login-btn {
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
          
          .login-btn:hover {
            background: #34495e;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
          }
          
          .login-btn:active {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
          }
          
          .login-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .login-btn:hover::before {
            left: 100%;
          }
          
          .login-btn:disabled {
            background: #95a5a6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          .login-btn:disabled:hover {
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
          
          .demo-accounts {
            background: #e8f4fd;
            border-radius: 8px;
            padding: 20px;
            margin-top: 25px;
          }
          
          .demo-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: #2980b9;
            margin-bottom: 12px;
          }
          
          .demo-account {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #d5e8f7;
            font-size: 0.85rem;
          }
          
          .demo-account:last-child {
            border-bottom: none;
          }
          
          .demo-role {
            font-weight: 500;
            color: #2c3e50;
          }
          
          .demo-creds {
            color: #7f8c8d;
            font-family: 'Courier New', monospace;
          }
          
          .register-link {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #7f8c8d;
          }
          
          .register-link a {
            color: #3498db;
            text-decoration: none;
            font-weight: 500;
          }
          
          .register-link a:hover {
            text-decoration: underline;
          }
          
          .error-alert {
            background: #fdf2f2;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 0.9rem;
          }
          
          @media (max-width: 768px) {
            .split-login-container {
              flex-direction: column;
            }
            
            .left-panel {
              padding: 40px 20px;
              min-height: 40vh;
            }
            
            .stats-container {
              flex-direction: column;
              gap: 20px;
            }
            
            .right-panel {
              padding: 20px;
            }
          }
        `}</style>
        
        {this.state.done ? <Redirect to="/" /> : null}
        
        <div className="left-panel">
          <div className="company-logo">
            <div className="logo-icon">
              <i className="fas fa-flag"></i>
            </div>
            <div className="company-info">
              <h1>HRMS Tanzania</h1>
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
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Sign in to access your dashboard</p>
            </div>
            
            {this.state.hasError && (
              <div className="error-alert">
                {this.state.errorMessage}
              </div>
            )}
            
            <form onSubmit={this.onSubmit}>
              <div className="input-group">
                <label className="input-label">Username</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon-left"></i>
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
              
              <button 
                type="submit" 
                className="login-btn"
                disabled={this.state.isLoading}
              >
                {this.state.isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            <div className="demo-accounts">
              <div className="demo-title">Demo Accounts</div>
              <div className="demo-account">
                <span className="demo-role">Owner</span>
                <span className="demo-creds">owner123</span>
              </div>
              <div className="demo-account">
                <span className="demo-role">Admin</span>
                <span className="demo-creds">admin123</span>
              </div>
            </div>
            
            <div className="register-link">
              Don't have an account? <a href="/register">Create one</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
