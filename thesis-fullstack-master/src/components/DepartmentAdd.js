import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom'
import { addDepartment } from "../utils/localStorage";

export default class DepartmentAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentName: "",
      hasError: false,
      errMsg: "",
      completed: false
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault()

    this.setState({ hasError: false, errorMsg: "", completed: false });

    let department = {
      departmentName: this.state.departmentName,
      description: `${this.state.departmentName} Department`
    };

    try {
      const newDept = addDepartment(department);
      this.setState({
        departmentName: '',
        hasError: false,
        errMsg: ''
      });
      toast.success("Department added successfully!");
      // Refresh the page to show the new department
      window.location.reload();
    } catch (error) {
      toast.error("Failed to add department. Department might already exist.");
      window.scrollTo(0, 0);
    }
  };

  render() {
    return (
      <Card className="mb-3 secondary-card">
          <Card.Header>
            <b>Add Department</b>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formDepartmentName">
                  <Form.Label className="text-muted mb-2">
                    Department Name
                  </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Department Name"
                        name="departmentName"
                        style={{width: "50%"}}
                        value={this.state.departmentName}
                        onChange={this.handleChange}
                        required
                        />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Add
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
    );
  }
}
