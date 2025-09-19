import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getDepartments, getUsers, addJobToStorage } from '../utils/localStorage'


export default class JobAddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      jobTitle: "",
      startDate: null,
      endDate: null,
      departments: [],
      users: [],
      selectedDepartment: null,
      selectedUser: null,
      showAlert: false,
      errorMsg: "",
      done: false
    };
  }

  componentDidMount() {
    this.fetchDepartments() 
  }

  fetchDepartments = () => {
    // Force initialization - always set departments
    const defaultDepartments = [
      { id: 1, departmentName: 'Human Resources', description: 'HR Department', createdAt: new Date().toISOString() },
      { id: 2, departmentName: 'Information Technology', description: 'IT Department', createdAt: new Date().toISOString() },
      { id: 3, departmentName: 'Sales', description: 'Sales Department', createdAt: new Date().toISOString() },
      { id: 4, departmentName: 'Marketing', description: 'Marketing Department', createdAt: new Date().toISOString() },
      { id: 5, departmentName: 'Finance', description: 'Finance Department', createdAt: new Date().toISOString() }
    ];
    
    // Always set in localStorage and state
    localStorage.setItem('hrms_departments', JSON.stringify(defaultDepartments));
    console.log('DEBUG: Setting departments in JobAddModal:', defaultDepartments);
    this.setState({departments: defaultDepartments}, () => {
      console.log('DEBUG: JobAddModal departments state:', this.state.departments);
    });
  }

  fetchUsers = () => {
    // Force initialization of users if empty
    let allUsers = getUsers();
    if (allUsers.length === 0) {
      const defaultUsers = [
        {
          id: 1,
          username: 'admin',
          email: 'admin@hrms.com',
          password: 'admin123',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          department: 'Information Technology',
          departmentId: 2,
          position: 'System Administrator'
        },
        {
          id: 2,
          username: 'manager',
          email: 'manager@hrms.com',
          password: 'manager123',
          role: 'manager',
          firstName: 'John',
          lastName: 'Manager',
          department: 'Human Resources',
          departmentId: 1,
          position: 'HR Manager'
        },
        {
          id: 3,
          username: 'employee',
          email: 'employee@hrms.com',
          password: 'employee123',
          role: 'employee',
          firstName: 'Jane',
          lastName: 'Employee',
          department: 'Sales',
          departmentId: 3,
          position: 'Sales Representative'
        },
        {
          id: 4,
          username: 'john.doe',
          email: 'john.doe@hrms.com',
          password: 'password123',
          role: 'employee',
          firstName: 'John',
          lastName: 'Doe',
          department: 'Information Technology',
          departmentId: 2,
          position: 'Software Developer'
        },
        {
          id: 5,
          username: 'jane.smith',
          email: 'jane.smith@hrms.com',
          password: 'password123',
          role: 'employee',
          firstName: 'Jane',
          lastName: 'Smith',
          department: 'Marketing',
          departmentId: 4,
          position: 'Marketing Specialist'
        }
      ];
      localStorage.setItem('hrms_users', JSON.stringify(defaultUsers));
      allUsers = defaultUsers;
    }
    
    console.log('DEBUG: All users loaded:', allUsers);
    console.log('DEBUG: Selected department ID:', this.state.selectedDepartment);
    console.log('DEBUG: Selected department type:', typeof this.state.selectedDepartment);
    
    // Convert selectedDepartment to number for proper comparison
    const selectedDeptId = parseInt(this.state.selectedDepartment);
    
    const departmentUsers = allUsers.filter(user => {
      console.log('DEBUG: Comparing user departmentId:', user.departmentId, 'with selected:', selectedDeptId);
      return user.departmentId === selectedDeptId;
    });
    
    console.log('DEBUG: Filtered users for department', selectedDeptId, ':', departmentUsers);
    this.setState({users: departmentUsers});
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onDepartmentChange = (event) => {
    console.log('DEBUG: Department changed to:', event.target.value);
    this.setState({selectedDepartment: event.target.value}, () => {
        console.log('DEBUG: State updated, now fetching users for department:', this.state.selectedDepartment);
        this.fetchUsers()
    })
  }

  onUserChange = (event) => {
    this.setState({selectedUser: event.target.value})
  }

  pushDepartments = () => {
      let items = []
      this.state.departments.map((dept, index) => {
        items.push(<option key={index} value={dept.id}>{dept.departmentName}</option>)
      })
      return items
  }

  pushUsers = () => {
      let items = []
      console.log('DEBUG: pushUsers called, users array:', this.state.users);
      console.log('DEBUG: users array length:', this.state.users.length);
      this.state.users.map((user, index) => {
          const fullName = `${user.firstName} ${user.lastName}`;
          console.log('DEBUG: Adding user option:', fullName, 'with ID:', user.id);
          items.push(<option key={index} value={user.id}>{fullName}</option>)
      })
      console.log('DEBUG: Total user options created:', items.length);
      return items
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.selectedDepartment || !this.state.selectedUser || !this.state.jobTitle || !this.state.startDate || !this.state.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    let job = {
        jobTitle: this.state.jobTitle,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        userId: this.state.selectedUser,
        departmentId: this.state.selectedDepartment,
        status: 'Active',
        createdAt: new Date().toISOString()
    }

    try {
      addJobToStorage(job);
      this.setState({done: true});
      toast.success("Job added successfully!");
    } catch (error) {
      toast.error('Failed to add job. Please try again.');
    }
  };

  render() {
    const {showAlert, done} = this.state  
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label className="mb-2 required">Select Department</Form.Label>
                    <Form.Control 
                        as="select"
                        className="form-control"
                        value={this.state.selectedDepartment || ""}
                        onChange={this.onDepartmentChange}
                    >
                        <option value="">Choose one...</option>
                        {this.pushDepartments()}
                    </Form.Control>
                </Form.Group>
                {this.state.selectedDepartment ? (
                    <Form.Group>
                        <Form.Label>Select User</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control"
                            value={this.state.selectedUser || ''}
                            onChange={this.onUserChange}
                        >
                            <option value="">Choose one...</option>
                            {this.pushUsers()}
                        </Form.Control>
                    </Form.Group>
                ): null}
                {done ? <Redirect to={{pathname: '/job-list', state: {selectedDepartment: this.state.departmentId}}} /> : <></>}
                <Form.Group controlId="formJobTitle">
                    <Form.Label className="mb-2 required">Job Title</Form.Label>
                    <Form.Control
                        type="text"
                        className="col-8"
                        name="jobTitle"
                        value={this.state.jobTitle}
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStartDate">
                    <Form.Label className="mb-2 required">Job Start Date</Form.Label>
                     <DatePicker
                              selected={this.state.startDate}
                              onChange={startDate => this.setState({startDate: startDate})}
                              minDate={Date.now()}
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Start Date"
                              autoComplete="off"
                              required
                            />
                </Form.Group>
                <Form.Group controlId="fromEndDate">
                    <Form.Label className="mb-2 required">Job End Date</Form.Label>
                     <DatePicker
                              selected={this.state.endDate}
                              onChange={endDate => this.setState({endDate: endDate})}
                              minDate={Date.now()}
                              dateFormat="yyyy-MM-dd"
                              className="form-control ml-1"
                              placeholderText="Select Start Date"
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
