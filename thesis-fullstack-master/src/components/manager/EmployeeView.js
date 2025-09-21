import React, { Component } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { getUsers, getDepartments } from '../../utils/localStorage'

export default class EmployeeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: null,
        fullName: null,
        role: null
      },
      department: {
        departmentName: null
      },
      job: {
        jobTitle: null
      },
      userPersonalInfo: {
        dateOfBirth: null,
        gender: null,
        maritalStatus: null,
        fatherName: null,
        country: null,
        city: null,
        address: null,
        mobile: null,
        phone: null,
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
          const departments = getDepartments();
          
          const user = allUsers.find(u => u.id == this.props.location.state.selectedUser.id);
          
          if (user) {
              this.setState({user: user}, () => {
                  // Set department info
                  const department = departments.find(dept => dept.id == user.departmentId);
                  if (department) {
                      this.setState({department: { departmentName: department.departmentName }});
                  }
                  
                  // Set job info (if available)
                  if(user.jobs) {
                      let jobs = user.jobs
                      jobs.map(job => {
                          if(new Date(job.startDate) <= Date.now() && new Date(job.endDate) >= Date.now()) {
                              this.setState({job: { jobTitle: job.jobTitle }})
                          }
                      })
                  }
                  
                  // Set personal info
                  if(user.dateOfBirth || user.gender || user.maritalStatus || user.fatherName || 
                     user.country || user.city || user.address || user.mobile || user.phone || user.email) {
                      this.setState({
                          userPersonalInfo: {
                              dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth).format('D MMM YYYY') : null,
                              gender: user.gender,
                              maritalStatus: user.maritalStatus,
                              fatherName: user.fatherName,
                              country: user.country,
                              city: user.city,
                              address: user.address,
                              mobile: user.mobile,
                              phone: user.phone,
                              emailAddress: user.email
                          }
                      });
                  }
                  
                  // Set financial info
                  if(user.bankName || user.accountName || user.accountNumber || user.iban) {
                      this.setState({
                          userFinancialInfo: {
                              bankName: user.bankName,
                              accountName: user.accountName,
                              accountNumber: user.accountNumber,
                              iban: user.iban
                          }
                      });
                  }
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
                        <Card.Header style={{ backgroundColor: "#515e73", color: "white", fontSize: '17px' }}>Employee Detail </Card.Header>
                        <Card.Body>
                            <Card.Title><strong>{this.state.user.fullName || `${this.state.user.firstName} ${this.state.user.lastName}`}</strong></Card.Title>
                            <Card.Text>
                                <Col lg={12}>
                                    <Row className="pt-4">
                                        <Col lg={3}>
                                            <img className="img-circle elevation-1 bp-2" src={process.env.PUBLIC_URL + '/user-128.png'} alt=""></img>
                                        </Col>
                                        <Col className="pt-4" lg={9}>
                                            <div className="emp-view-list">
                                                <ul>
                                                    <li><span>Employee ID: </span> {this.state.user.id}</li>
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