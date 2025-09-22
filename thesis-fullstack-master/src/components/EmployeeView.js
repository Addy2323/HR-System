import React, { Component } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { getUsers } from '../utils/localStorage'

export default class EmployeeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      department: {
        departmentName: null
      },
      job: {
        jobTitle: null,
      },
      userPersonalInfo: {
        dateOfBirth: null,
        gender: null,
        maritalStatus: null,
        fatherName: null,
        country: null,
        address: null,
        mobile: null,
        emailAddress: null
      },
      userFinancialInfo: {
        bankName: null,
        accountName: null,
        accountNumber: null,
        iban: null
      },
      falseRedirect: false,
      editRedirect: false
    };
  }

  componentDidMount() {
      if(this.props.location.state) {
          // Use localStorage instead of axios
          const allUsers = getUsers();
          const user = allUsers.find(u => u.id == this.props.location.state.selectedUser.id);
          
          if (user) {
              this.setState({user: user}, () => {
                  // Map job data from user properties
                  const jobData = {
                      jobTitle: user.position || user.jobTitle || 'N/A'
                  };
                  this.setState({job: jobData});
                  
                  // Map department data
                  const departmentData = {
                      departmentName: user.department || 'N/A'
                  };
                  this.setState({department: departmentData});
                  
                  // Map personal info from user properties
                  const personalInfo = {
                      dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth).format('D MMM YYYY') : 'N/A',
                      gender: user.gender || 'N/A',
                      maritalStatus: user.maritalStatus || 'N/A',
                      fatherName: user.fatherName || 'N/A',
                      country: user.country || 'N/A',
                      city: user.city || 'N/A',
                      address: user.address || 'N/A',
                      mobile: user.mobile || user.phone || 'N/A',
                      phone: user.phone || '',
                      emailAddress: user.email || user.emailAddress || 'N/A'
                  };
                  this.setState({userPersonalInfo: personalInfo});
                  
                  // Map financial info from user properties
                  const financialInfo = {
                      bankName: user.bankName || 'N/A',
                      accountName: user.accountName || 'N/A',
                      accountNumber: user.accountNumber || 'N/A',
                      iban: user.iban || 'N/A'
                  };
                  this.setState({userFinancialInfo: financialInfo});
              })
          } else {
              this.setState({falseRedirect: true})
          }
      } else {
          this.setState({falseRedirect: true})
      }
  }

  onEdit = () => {
    this.setState({editRedirect: true})
  }

  render() {
    return (
        <div className="container-fluid pt-3">
            {this.state.falseRedirect ? <Redirect to="/" /> : (<></>)}
            {this.state.editRedirect ? (<Redirect to={{pathname: "/employee-edit", state: {selectedUser: this.state.user}}} />) : null}
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header style={{ backgroundColor: "#515e73", color: "white", fontSize: '17px' }}>Employee Detail <Form className="float-right"><span style={{cursor: 'pointer'}} onClick={this.onEdit}><i className="far fa-edit"></i> Edit</span></Form></Card.Header>
                        <Card.Body>
                            <Card.Title><strong>{this.state.user.fullName}</strong></Card.Title>
                            <Card.Text>
                                <Col lg={12}>
                                    <Row className="pt-4">
                                        <Col lg={3}>
                                            <img className="img-circle elevation-1 bp-2" src={process.env.PUBLIC_URL + '/user-128.png'} alt=""></img>
                                        </Col>
                                        <Col className="pt-4" lg={9}>
                                            <div className="emp-view-list">
                                                <ul>
                                                    <li><span>Employee ID: </span> {this.state.user.employeeId || `EMP${String(this.state.user.id).padStart(3, '0')}`}</li>
                                                    <li><span>Department: </span> {this.state.department.departmentName}</li>
                                                    <li><span>Job Title: </span> {this.state.job.jobTitle}</li>
                                                    <li><span>Role: </span>{this.state.user.role==='ROLE_ADMIN' ? 'Admin' : this.state.user.role==='ROLE_MANAGER' ? 'Manager' : 'Employee'}</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <Card className="secondary-card emp-view">
                                                <Card.Header>Personal Details</Card.Header>
                                                <Card.Body>
                                                    <Card.Text id="emp-view-personal">
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Date of Birth: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.dateOfBirth}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Gender: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.gender}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Marital Status: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.maritalStatus}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Father's Name: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.fatherName}
                                                            </span>
                                                        </Form.Group>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col sm={6}>
                                            <Card className="secondary-card emp-view">
                                                <Card.Header>Contact Details</Card.Header>
                                                <Card.Body>
                                                    <Card.Text id="emp-view-contact">
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Location: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.country}, {this.state.userPersonalInfo.city}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Address: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.address}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Mobile: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.mobile} {this.state.userPersonalInfo.phone ? (' (' + this.state.userPersonalInfo.phone + ')') : null} 
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Email Address: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userPersonalInfo.emailAddress}
                                                            </span>
                                                        </Form.Group>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col cm={6}>
                                            <Card className="secondary-card">
                                                <Card.Header>Bank Information</Card.Header>
                                                <Card.Body>
                                                    <Card.Text id="emp-view-bank">
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Bank Name: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userFinancialInfo.bankName}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Account Name: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userFinancialInfo.accountName}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                Account Number: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userFinancialInfo.accountNumber}
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label className="label">
                                                                IBAN: 
                                                            </Form.Label>
                                                            <span>
                                                                {this.state.userFinancialInfo.iban}
                                                            </span>
                                                        </Form.Group>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col sm={6}>
                                        </Col>
                                    </Row>
                                </Col>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
}