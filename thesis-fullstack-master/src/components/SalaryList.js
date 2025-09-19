import React, { Component } from "react";
import { Card, Badge, Button, Form, Modal } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { getSalaryDetails, getUsers } from '../utils/localStorage'

export default class SalaryList extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      financialInformations: [],
      selectedUser: null,
      editRedirect: false,
      deleteModal: false
    }
  }

  componentDidMount() {
    // Force initialization of users and salary details if empty
    let users = getUsers();
    if (users.length === 0) {
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
      users = defaultUsers;
    }

    let salaryDetails = getSalaryDetails();
    if (salaryDetails.length === 0) {
      const defaultSalaryDetails = [
        {
          id: 1,
          userId: 1,
          employmentType: 'Full Time',
          salaryBasic: 800000,
          allowanceHouseRent: 200000,
          allowanceMedical: 50000,
          allowanceSpecial: 100000,
          allowanceFuel: 75000,
          allowancePhoneBill: 25000,
          allowanceOther: 50000,
          deductionTax: 120000,
          deductionOther: 30000,
          salaryGross: 1300000,
          deductionTotal: 150000,
          salaryNet: 1150000
        },
        {
          id: 2,
          userId: 2,
          employmentType: 'Full Time',
          salaryBasic: 1000000,
          allowanceHouseRent: 250000,
          allowanceMedical: 75000,
          allowanceSpecial: 150000,
          allowanceFuel: 100000,
          allowancePhoneBill: 30000,
          allowanceOther: 75000,
          deductionTax: 180000,
          deductionOther: 50000,
          salaryGross: 1680000,
          deductionTotal: 230000,
          salaryNet: 1450000
        }
      ];
      localStorage.setItem('hrms_salary_details', JSON.stringify(defaultSalaryDetails));
      salaryDetails = defaultSalaryDetails;
    }
    
    // Combine salary details with user information
    const financialInformations = salaryDetails.map(detail => {
      const user = users.find(u => u.id == detail.userId);
      if (user) {
        return {
          ...detail,
          user: {
            ...user,
            fullName: `${user.firstName} ${user.lastName}`
          }
        };
      }
      return null;
    }).filter(item => item !== null);
    
    console.log('DEBUG: SalaryList financial informations:', financialInformations);
    this.setState({financialInformations: financialInformations});
  }

  onEdit = (financialInfo) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: financialInfo.user, editRedirect: true})
    } 
  }

  onView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, viewRedirect: true})
    }
  }

  render() {

    const theme = createMuiTheme({
        overrides: {
            MuiTableCell: {
                root: {
                    padding: '6px 6px 6px 6px'
                }
            }
        }
    })

    return (
      <div className="container-fluid pt-4">
        {this.state.editRedirect ? (<Redirect to={{pathname: '/salary-details', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        {this.state.viewRedirect ? (<Redirect to={{pathname: '/salary-view', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>List of Employees and Their Salaries</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <ThemeProvider theme={theme}>
                <MaterialTable 
                  columns={[
                    {title: 'EMP ID', field: 'user.id'},
                    {title: 'Full Name', field: 'user.fullName'},
                    {title: 'Gross Salary', field: 'salaryGross'},
                    {title: 'Deductions', field: 'deductionTotal'},
                    {title: 'Net Salary', field: 'salaryNet'},
                    {title: 'Emp Type', field: 'employmentType'},
                    {
                      title: 'View',
                      render: rowData => (
                        <Form>
                          <Button size="sm" variant="info" onClick={this.onView(rowData)}><i className="far fa-address-card"></i></Button>
                        </Form>
                      )
                    },
                    {
                      title: 'Action',
                      render: rowData => (
                        <>
                          <Button size="sm" variant="info" className="mr-2" onClick={this.onEdit(rowData)}><i className="far fa-edit"></i>Edit</Button>
                        </>
                      )
                    }
                  ]}
                  data={this.state.financialInformations}
                  options={{
                    rowStyle: (rowData, index) => {
                      if(index%2) {
                        return {backgroundColor: '#f2f2f2'}
                      }
                    },
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30, 50, 75, 100]
                  }}
                  title="Employees"
                />
              </ThemeProvider>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}