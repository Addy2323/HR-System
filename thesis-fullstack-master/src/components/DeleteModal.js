import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Alert, Button } from "react-bootstrap";
import { toast } from 'react-toastify'
import { deleteEmployee } from '../utils/localStorage'

export default class DeleteModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    onDelete = (event) => {
        event.preventDefault()

        try {
            deleteEmployee(this.props.data.id);
            this.setState({redirect: true});
            toast.success("Employee deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete employee: " + err.message);
        }
    }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.state.redirect ? (<Redirect to="/employee-list" />) : (<></>)}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Warning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete Employee: {this.props.data.fullName}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.onDelete}>Delete</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}