import React, { Component } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { getUsers, getDepartments } from '../../utils/localStorage'

export default class EmployeeViewEmployee extends Component {
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
        // Use localStorage instead of axios
        const allUsers = getUsers();
        const departments = getDepartments();
        
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const user = allUsers.find(u => u.id == userId);
        
        if (user) {
            this.setState({user: user}, () => {
                // Set department info
                const department = departments.find(dept => dept.id == user.departmentId);
                if (department) {
                    this.setState({department: { departmentName: department.departmentName }});
                }
                
                // Set current job
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
                   user.country || user.city || user.address || user.mobile || user.email) {
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
        }
  }


  render() {
    return (
        <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white", fontSize: '17px' }}>My Profile</Card.Header>
            <Card.Body>
                <style>{`
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        padding: 8px 0;
                        border-bottom: 1px solid #f0f0f0;
                        margin-bottom: 5px;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                    }
                    .info-row:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                    }
                    .info-row strong {
                        color: #2c3e50;
                        font-weight: 600;
                        min-width: 100px;
                        max-width: 100px;
                        text-align: left;
                        flex-shrink: 0;
                    }
                    .info-row span {
                        color: #34495e;
                        text-align: right;
                        flex: 1;
                        margin-left: 10px;
                        word-break: break-word;
                        overflow-wrap: break-word;
                        max-width: calc(100% - 110px);
                        line-height: 1.4;
                    }
                    .emp-view .card-body {
                        padding: 15px;
                        overflow: hidden;
                    }
                    .emp-view .card-header {
                        background-color: #3498db !important;
                        color: white;
                        font-weight: 600;
                        text-align: center;
                    }
                    .secondary-card {
                        margin-bottom: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        border: 1px solid #e3e6f0;
                    }
                    .secondary-card .card-text {
                        padding: 0;
                        margin: 0;
                    }
                `}</style>
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
                                        <Card.Text id="emp-view-personal-dashboard">
                                            <div className="info-row">
                                                <strong>Date of Birth:</strong>
                                                <span>{this.state.userPersonalInfo.dateOfBirth || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Gender:</strong>
                                                <span>{this.state.userPersonalInfo.gender || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Marital Status:</strong>
                                                <span>{this.state.userPersonalInfo.maritalStatus || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Father's Name:</strong>
                                                <span>{this.state.userPersonalInfo.fatherName || 'N/A'}</span>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6}>
                                <Card className="secondary-card emp-view">
                                    <Card.Header>Contact Details</Card.Header>
                                    <Card.Body>
                                        <Card.Text id="emp-view-contact-dashboard">
                                            <div className="info-row">
                                                <strong>Location:</strong>
                                                <span>{this.state.userPersonalInfo.country ? `${this.state.userPersonalInfo.country}, ${this.state.userPersonalInfo.city || ''}` : 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Address:</strong>
                                                <span>{this.state.userPersonalInfo.address || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Mobile:</strong>
                                                <span>{this.state.userPersonalInfo.mobile || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Email Address:</strong>
                                                <span>{this.state.userPersonalInfo.emailAddress || 'N/A'}</span>
                                            </div>
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
                                        <Card.Text id="emp-view-bank-dashboard">
                                            <div className="info-row">
                                                <strong>Bank Name:</strong>
                                                <span>{this.state.userFinancialInfo.bankName || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Account Name:</strong>
                                                <span>{this.state.userFinancialInfo.accountName || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>Account Number:</strong>
                                                <span>{this.state.userFinancialInfo.accountNumber || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <strong>IBAN:</strong>
                                                <span>{this.state.userFinancialInfo.iban || 'N/A'}</span>
                                            </div>
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
    );
  }
}