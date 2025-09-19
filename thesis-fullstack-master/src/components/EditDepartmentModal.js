import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { updateDepartment } from '../utils/localStorage'

export default class AddEventModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentName: "",
      id: null,
      event: {},
      showAlert: false,
      errorMsg: "",
      done: false
    };
  }

  componentDidMount() {
      this.setState({
          departmentName: this.props.data.departmentName,
          id:  this.props.data.id
        })
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let data = {
        departmentName: this.state.departmentName
    }

    try {
      updateDepartment(this.state.id, data);
      this.setState({done: true});
      toast.success("Department updated successfully!");
    } catch (err) {
      toast.error("Failed to update department: " + err.message);
    }
  };

  render() {
    const {showAlert, done} = this.state  
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {done ? <Redirect to="/departments" /> : <></>}
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formDepartmentName">
                    <Form.Label className="mb-2">Department Name</Form.Label>
                    <Form.Control
                        type="text"
                        className="col-8"
                        name="departmentName"
                        value={this.state.departmentName}
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                </Form.Group>

                <Button variant="success" type="submit" className="mt-2">
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