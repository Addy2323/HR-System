import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { updateUserInStorage } from '../utils/localStorage'

export default class NewPasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      newPasswordCheck: null,
      showAlert: false,
      completed: false,
      hasError: false,
      errMsg: ""
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassword !== this.state.newPasswordCheck) {
        toast.error("Passwords don't match.");
    } else {
        let userId = JSON.parse(localStorage.getItem('user')).id
        
        try {
          // For demo purposes, we'll just update the user's password in localStorage
          // In a real application, you would want to verify the old password first
          const updatedUser = updateUserInStorage({id: userId, password: this.state.newPassword});
          if (updatedUser) {
            toast.success("Password changed successfully.");
            this.setState({completed: true});
          } else {
            toast.error("Failed to change password.");
          }
        } catch (err) {
          toast.error("Failed to change password: " + err.message);
        }
    }
  };

  render() {
  
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formOldPassword">
                    <Form.Label className="required">Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        className="col-6"
                        name="oldPassword"
                        value={this.state.oldPassword}
                        onChange={this.handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new Password"
                        className="col-6"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                
                <Form.Group controlId="formNewPasswordCheck">
                    <Form.Label>New Password Repeat</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat new Password"
                        className="col-6"
                        name="newPasswordCheck"
                        value={this.state.newPasswordCheck}
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Text className="mb-3 required"> Required Fields</Form.Text>
                <Button variant="success" type="submit">
                    Submit
            </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
