import React, { Component } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { getUsers, getDepartments } from '../../utils/localStorage'

export default class SalaryViewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      currentJobTitle: null
    };
  }

  componentDidMount() {
        let id = JSON.parse(localStorage.getItem('user')).id
        
        // Use localStorage instead of axios
        const allUsers = getUsers();
        const departments = getDepartments();
        
        const user = allUsers.find(u => u.id == id);
        
        if (user) {
            // Add department info to user
            const department = departments.find(dept => dept.id == user.departmentId);
            const userWithDepartment = {
                ...user,
                department: department ? { departmentName: department.departmentName } : { departmentName: 'Unknown' }
            };
            
            this.setState({user: userWithDepartment}, () => {
                // Set current job title
                if(user.jobs) {
                    user.jobs.map(job => {
                        if(new Date(job.startDate).setHours(0) < new Date() && new Date(job.endDate).setHours(24) > new Date()) {
                            this.setState({currentJobTitle: job.jobTitle})
                        }
                    })
                }
            })
        }
  }

  render() {
    return (
        <div className="container-fluid pt-3">
            {this.state.user ? (
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header style={{ backgroundColor: "#515e73", color: "white", fontSize: '17px' }}>Employee Salary Detail</Card.Header>
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
                                                        <li><span>Department: </span> {this.state.user.department.departmentName}</li>
                                                        <li><span>Job Title: </span> {this.state.currentJobTitle}</li>
                                                        <li><span>Role: </span>{this.state.user.role==='ROLE_ADMIN' ? 'Admin' : this.state.user.role==='ROLE_MANAGER' ? 'Manager' : 'Employee'}</li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="pt-4">
                                            <Col sm={6}>
                                                <Card className="secondary-card sal-view">
                                                    <Card.Header>Salary Details</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-details">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Employment Type: 
                                                                </Form.Label>
                                                                <span>
                                                                    {this.state.user.employmentType}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Basic Salary: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.salaryBasic}
                                                                </span>
                                                            </Form.Group>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={6}>
                                                <Card className="secondary-card sal-view">
                                                    <Card.Header>Allowances</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-allowances">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    House Rent Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowanceHouseRent}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Medical Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowanceMedical}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Special Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowanceSpecial}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Fuel Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowanceFuel}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Phone Bill Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowancePhoneBill}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Other Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowanceOther}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Total Allowance: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.allowanceTotal}
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
                                                    <Card.Header>Deductions</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-deductions">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Tax Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.deductionTax}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Other Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.deductionOther}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Total Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.deductionTotal}
                                                                </span>
                                                            </Form.Group>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={6}>
                                            <Card className="secondary-card">
                                                    <Card.Header>Total Salary Details</Card.Header>
                                                    <Card.Body>
                                                        <Card.Text id="sal-view-total">
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Gross Salary: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.salaryGross}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Total Deduction: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.deductionTotal}
                                                                </span>
                                                            </Form.Group>
                                                            <Form.Group as={Row}>
                                                                <Form.Label className="label">
                                                                    Net Salary: 
                                                                </Form.Label>
                                                                <span>
                                                                    TSh {this.state.user.salaryNet}
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
            ) : null}
        </div>
    );
  }
}