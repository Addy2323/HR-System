import React, { Component } from "react";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import JobAddModal from './JobAddModal'
import JobEditModal from './JobEditModal'
import JobDeleteModal from './JobDeleteModal'
import moment from 'moment'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from './AlertModal'
import { getDepartments, getUsers, getSalaryDetails, updateSalaryDetails } from '../utils/localStorage'

export default class SalaryDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            departments: [],
            selectedDepartment: null,
            selectedUser: null,
            financialId: null,
            users: [],
            salaryBasic: 0,
            allowanceHouseRent: 0,
            allowanceMedical: 0,
            allowanceSpecial: 0,
            allowanceFuel: 0,
            allowancePhoneBill: 0,
            allowanceOther: 0,
            deductionTax: 0,
            deductionOther: 0,
            hasError: false,
            errMsg: "",
            completed: false
        }
    }

    componentDidMount() {
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
        console.log('DEBUG: Setting departments in SalaryDetails:', defaultDepartments);
        
        this.setState({departments: defaultDepartments}, () => {
            console.log('DEBUG: Departments state set:', this.state.departments);
            if(this.props.location.state) {
                this.setState({selectedDepartment: this.props.location.state.selectedUser.departmentId}, () => {
                    this.fetchData()
                })
                this.setState({selectedUser: this.props.location.state.selectedUser.id}, () => {
                    this.pushChanges()
                })
            }
        });
    }

    pushChanges = () => {
        const salaryDetails = getSalaryDetails();
        const userSalary = salaryDetails.find(salary => salary.userId == this.state.selectedUser);
        
        if (userSalary) {
            this.setState(prevState => ({
                ...prevState,
                financialId: userSalary.id,
                ...userSalary
            }));
        } else {
            // Initialize default salary structure for user
            const defaultSalary = {
                id: Date.now(),
                userId: this.state.selectedUser,
                employmentType: 'Full Time',
                salaryBasic: 0,
                allowanceHouseRent: 0,
                allowanceMedical: 0,
                allowanceSpecial: 0,
                allowanceFuel: 0,
                allowancePhoneBill: 0,
                allowanceOther: 0,
                deductionTax: 0,
                deductionOther: 0
            };
            this.setState(prevState => ({
                ...prevState,
                financialId: defaultSalary.id,
                ...defaultSalary
            }));
        }
    }

    fetchData = () => {
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
        
        const departmentUsers = allUsers.filter(user => 
            user.departmentId == this.state.selectedDepartment
        );
        console.log('DEBUG: SalaryDetails filtered users for department', this.state.selectedDepartment, ':', departmentUsers);
        this.setState({users: departmentUsers});
    }

    fetchDataAll = () => {
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
        console.log('DEBUG: SalaryDetails all users:', allUsers);
        this.setState({users: allUsers});
    }

    pushDepartments = () => {
        let items= []
        items.push(<option key={584390} value="all">All departments</option>)
        this.state.departments.map((dept, index) => {
            if(this.state.selectedDepartment == dept.id) {
                items.push(<option key={index} value={dept.id} defaultValue>{dept.departmentName}</option>)
            } else {
                items.push(<option key={index} value={dept.id}>{dept.departmentName}</option>)
            }
        })
        return items
    }

    pushUsers = () => {
        let items = []
        
        this.state.users.map((user, index) => {
            const fullName = `${user.firstName} ${user.lastName}`;
            items.push(<option key={index} value={user.id}>{fullName}</option>)
        })

        return items
    }

    handleDepartmentChange = (event) => {
        this.setState({selectedDepartment: event.target.value}, () => {
            if(this.state.selectedDepartment === "all") {
                this.fetchDataAll()
            } else {
                this.fetchData()
            }
        })
    }

    handleUserChange = (event) => {
        this.setState({selectedUser: event.target.value}, () => {
            this.pushChanges();
        });
    }

    handleChangeEmploymentType = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: +value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        let salaryGross = this.state.salaryBasic + this.state.allowanceHouseRent + 
                         this.state.allowanceMedical + this.state.allowanceSpecial + 
                         this.state.allowancePhoneBill + this.state.allowanceFuel + 
                         this.state.allowanceOther;
        
        let deductionTotal = this.state.deductionTax + this.state.deductionOther;
        let salaryNet = salaryGross - deductionTotal;

        let data = {
            userId: this.state.selectedUser,
            employmentType: this.state.employmentType,
            salaryBasic: this.state.salaryBasic,
            allowanceHouseRent: this.state.allowanceHouseRent,
            allowanceMedical: this.state.allowanceMedical,
            allowanceSpecial: this.state.allowanceSpecial,
            allowanceFuel: this.state.allowanceFuel,
            allowancePhoneBill: this.state.allowancePhoneBill,
            allowanceOther: this.state.allowanceOther,
            allowanceTotal: this.state.allowanceHouseRent + this.state.allowanceMedical + this.state.allowanceSpecial +
                            this.state.allowanceFuel + this.state.allowancePhoneBill + this.state.allowanceOther,
            deductionTax: this.state.deductionTax,
            deductionOther: this.state.deductionOther,
            deductionTotal: deductionTotal,
            salaryGross: salaryGross,
            salaryNet: salaryNet
        }

        try {
            console.log('DEBUG: Saving salary details with data:', data);
            console.log('DEBUG: Financial ID:', this.state.financialId);
            const result = updateSalaryDetails(this.state.financialId, data);
            console.log('DEBUG: Update result:', result);
            
            this.setState({completed: true});
            window.scrollTo(0, 0);
            
            // Refresh the page after a short delay to show updated data
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('DEBUG: Error saving salary details:', error);
            this.setState({hasError: true, errMsg: 'Failed to update salary details. Please try again.'});
            window.scrollTo(0, 0);
        }
    }

    onEdit (job) {
        return event=> {
            event.preventDefault()
            
            this.setState({selectedJob: job, showEditModel: true})
        }
    }
    
  render() {

    let salaryGross = this.state.salaryBasic + this.state.allowanceHouseRent + 
                      this.state.allowanceMedical + this.state.allowanceSpecial + 
                      this.state.allowancePhoneBill + this.state.allowanceFuel + 
                      this.state.allowanceOther

    let deductionTotal = this.state.deductionTax + this.state.deductionOther

    let salaryNet = salaryGross - deductionTotal

    return (
      <div className="container-fluid pt-2">
        <div className="row">

          {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ): 
          this.state.completed ? (
            <Alert variant="success" className="m-3" block>
              Financial Infromation have been updated.
            </Alert>
          ) : (<></>)}

            <div className="col-sm-12">
                <Card className="main-card">
                    <Card.Header><div className="required">Manage Salary Details</div></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Select Department: </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="select-css"
                                        value={this.state.selectedDepartment}
                                        onChange={this.handleDepartmentChange}
                                    >
                                        <option key={34432432} value="">Choose one...</option>
                                        {this.pushDepartments()}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Select User: </Form.Label>
                                    <Form.Control
                                        as="select" 
                                        className="select-css"
                                        value={this.state.selectedUser || ''}
                                        onChange={this.handleUserChange}
                                    >
                                        <option value="">Choose one...</option>
                                        {this.pushUsers()}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
        {this.state.selectedUser ? (
            <Form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <Card className="main-card">
                            <Card.Header>Salary Details</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Form.Group>
                                        <Form.Label className="required">Employment Type </Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="select-css"
                                            value={this.state.employmentType}
                                            onChange={this.handleChangeEmploymentType}
                                            name="employmentType"
                                        >
                                            <option value="">Choose one...</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="required">Basic Salary</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.salaryBasic}
                                            onChange={this.handleChange}
                                            name="salaryBasic"
                                        />
                                    </Form.Group>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Card className="main-card">
                            <Card.Header>Allowances</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Form.Group>
                                        <Form.Label>House Rent Allowance</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.allowanceHouseRent}
                                            onChange={this.handleChange}
                                            name="allowanceHouseRent"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Medical Allowance</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.allowanceMedical}
                                            onChange={this.handleChange}
                                            name="allowanceMedical"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Special Allowance</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.allowanceSpecial}
                                            onChange={this.handleChange}
                                            name="allowanceSpecial"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Fuel Allowance</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.allowanceFuel}
                                            onChange={this.handleChange}
                                            name="allowanceFuel"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Phone Bill Allowance</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.allowancePhoneBill}
                                            onChange={this.handleChange}
                                            name="allowancePhoneBill"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Other Allowance</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={this.state.allowanceOther}
                                            onChange={this.handleChange}
                                            name="allowanceOther"
                                        />
                                    </Form.Group>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-12">
                                <Card className="main-card">
                                    <Card.Header>Deductions</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <Form.Group>
                                                <Form.Label>Tax Deduction</Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    value={this.state.deductionTax}
                                                    onChange={this.handleChange}
                                                    name="deductionTax"
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Other Deduction</Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    value={this.state.deductionOther}
                                                    onChange={this.handleChange}
                                                    name="deductionOther"
                                                />
                                            </Form.Group>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Card className="main-card">
                                    <Card.Header>Total Salary Details</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <Form.Group>
                                                <Form.Label>Gross Salary</Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    value={salaryGross}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Total Deductions</Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    value={deductionTotal}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Net Salary</Form.Label>
                                                <Form.Control 
                                                    type="number"
                                                    value={salaryNet}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <Button type="submit" block>Submit</Button>
                        </div>
                    </div>
                </div>
            </Form>
        ) : null}
        </div>
    );
  }
}