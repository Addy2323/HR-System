import React, { Component } from "react";
import { Card, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      username: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      hasError: false,
      errorMsg: "",
      successMsg: "",
      showPasswordSection: false,
      updated: false
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.setState({
      user: userData,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      department: userData.department || "",
      position: userData.position || "",
      username: userData.username || ""
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      hasError: false,
      errorMsg: "",
      successMsg: ""
    });
  };

  onUpdateProfile = (e) => {
    e.preventDefault();
    
    // Validation
    if (!this.state.firstName || !this.state.lastName || !this.state.email) {
      this.setState({
        hasError: true,
        errorMsg: "First Name, Last Name, and Email are required fields."
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        hasError: true,
        errorMsg: "Please enter a valid email address."
      });
      return;
    }

    try {
      // Update user data
      const updatedUser = {
        ...this.state.user,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        department: this.state.department,
        position: this.state.position,
        username: this.state.username
      };

      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update users array in localStorage
      const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
      const updatedUsers = users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
      localStorage.setItem('hrms_users', JSON.stringify(updatedUsers));

      this.setState({
        user: updatedUser,
        successMsg: "Profile updated successfully!",
        hasError: false,
        errorMsg: ""
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        this.setState({ successMsg: "" });
      }, 3000);

    } catch (error) {
      this.setState({
        hasError: true,
        errorMsg: "Failed to update profile. Please try again."
      });
    }
  };

  onChangePassword = (e) => {
    e.preventDefault();

    // Password validation
    if (!this.state.currentPassword || !this.state.newPassword || !this.state.confirmPassword) {
      this.setState({
        hasError: true,
        errorMsg: "All password fields are required."
      });
      return;
    }

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        hasError: true,
        errorMsg: "New password and confirm password do not match."
      });
      return;
    }

    if (this.state.newPassword.length < 6) {
      this.setState({
        hasError: true,
        errorMsg: "New password must be at least 6 characters long."
      });
      return;
    }

    // Check current password (in real app, this would be verified on server)
    if (this.state.currentPassword !== this.state.user.password) {
      this.setState({
        hasError: true,
        errorMsg: "Current password is incorrect."
      });
      return;
    }

    try {
      // Update password
      const updatedUser = {
        ...this.state.user,
        password: this.state.newPassword
      };

      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update users array in localStorage
      const users = JSON.parse(localStorage.getItem('hrms_users') || '[]');
      const updatedUsers = users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
      localStorage.setItem('hrms_users', JSON.stringify(updatedUsers));

      this.setState({
        user: updatedUser,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        successMsg: "Password changed successfully!",
        hasError: false,
        errorMsg: "",
        showPasswordSection: false
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        this.setState({ successMsg: "" });
      }, 3000);

    } catch (error) {
      this.setState({
        hasError: true,
        errorMsg: "Failed to change password. Please try again."
      });
    }
  };

  togglePasswordSection = () => {
    this.setState({
      showPasswordSection: !this.state.showPasswordSection,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      hasError: false,
      errorMsg: ""
    });
  };

  render() {
    return (
      <div className="container-fluid pt-5">
        <Row>
          <Col md={8} className="mx-auto">
            <Card>
              <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
                <div className="panel-title">
                  <strong>My Profile</strong>
                </div>
              </Card.Header>
              <Card.Body>
                {this.state.hasError && (
                  <Alert variant="danger" className="mb-3">
                    {this.state.errorMsg}
                  </Alert>
                )}
                {this.state.successMsg && (
                  <Alert variant="success" className="mb-3">
                    {this.state.successMsg}
                  </Alert>
                )}

                <Form onSubmit={this.onUpdateProfile}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          placeholder="Enter first name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          placeholder="Enter last name"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Enter email address"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          placeholder="Enter phone number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                          type="text"
                          name="department"
                          value={this.state.department}
                          onChange={this.handleChange}
                          placeholder="Enter department"
                          readOnly
                          style={{ backgroundColor: "#f8f9fa" }}
                        />
                        <Form.Text className="text-muted">
                          Contact admin to change department
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                          type="text"
                          name="position"
                          value={this.state.position}
                          onChange={this.handleChange}
                          placeholder="Enter position"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit">
                      <i className="fas fa-save"></i> Update Profile
                    </Button>
                    <Button 
                      variant="secondary" 
                      type="button"
                      onClick={this.togglePasswordSection}
                    >
                      <i className="fas fa-key"></i> {this.state.showPasswordSection ? 'Cancel' : 'Change Password'}
                    </Button>
                  </div>
                </Form>

                {this.state.showPasswordSection && (
                  <Card className="mt-4">
                    <Card.Header>
                      <strong>Change Password</strong>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={this.onChangePassword}>
                        <Form.Group className="mb-3">
                          <Form.Label>Current Password *</Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            value={this.state.currentPassword}
                            onChange={this.handleChange}
                            placeholder="Enter current password"
                            required
                          />
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>New Password *</Form.Label>
                              <Form.Control
                                type="password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.handleChange}
                                placeholder="Enter new password"
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Confirm New Password *</Form.Label>
                              <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                placeholder="Confirm new password"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button variant="success" type="submit">
                          <i className="fas fa-check"></i> Change Password
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
