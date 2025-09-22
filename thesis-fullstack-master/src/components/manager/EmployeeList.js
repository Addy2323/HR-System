import React, { Component } from "react";
import { Card, Badge, Button, Form, Modal } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { getUsers, getDepartments } from '../../utils/localStorage'

export default class EmployeeList extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      selectedUser: null,
      viewRedirect: false,
      viewSalaryRedirect: false,
      editRedirect: false,
      deleteModal: false
    }
  }

  componentDidMount() {
      try {
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const deptId = currentUser.departmentId;
          console.log('DEBUG: Manager departmentId:', deptId);
          
          // Use localStorage instead of axios
          const allUsers = getUsers();
          const departments = getDepartments();
          console.log('DEBUG: All users:', allUsers);
          console.log('DEBUG: All departments:', departments);
          
          // If no department ID, show all users (fallback for admin/manager)
          const deptUsers = deptId ? allUsers.filter(user => user.departmentId == deptId) : allUsers;
          console.log('DEBUG: Filtered users:', deptUsers);
          
          // Format users data to match expected structure
          const formattedUsers = deptUsers.map(user => {
              const department = departments.find(dept => dept.id == user.departmentId);
              return {
                  ...user,
                  employeeId: user.employeeId || `EMP${String(user.id).padStart(3, '0')}`,
                  fullName: user.fullName || `${user.firstName} ${user.lastName}`,
                  department: department ? { departmentName: department.departmentName } : { departmentName: user.department || 'Unknown' },
                  user_personal_info: {
                      mobile: user.mobile || user.phone || 'N/A'
                  },
                  active: user.active !== undefined ? user.active : (user.status === 'active' ? 1 : 0),
                  jobs: [{
                      jobTitle: user.position || 'Employee',
                      startDate: user.hireDate || new Date().toISOString(),
                      endDate: '2030-12-31'
                  }]
              };
          });
          
          console.log('DEBUG: Formatted users:', formattedUsers);
          this.setState({users: formattedUsers})
      } catch (error) {
          console.error('Error loading manager employee list:', error);
          this.setState({users: []});
      }
  }

  onView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, viewRedirect: true})
    } 
  }

  onSalaryView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: {user: {id: user.id}}, viewSalaryRedirect: true})
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
        {this.state.viewRedirect ? (<Redirect to={{pathname: '/employee-view', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        {this.state.viewSalaryRedirect ? (<Redirect to={{pathname: '/salary-view', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>Employee List</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <ThemeProvider theme={theme}>
                <MaterialTable 
                  columns={[
                    {
                      title: 'EMP ID', 
                      render: rowData => (
                        rowData.employeeId || `EMP${String(rowData.id).padStart(3, '0')}`
                      )
                    },
                    {title: 'Full Name', field: 'fullName'},
                    {title: 'Department', field: 'department.departmentName'},
                    {
                      title: 'Job Title', 
                      field: 'jobs',
                      render: rowData => (
                        rowData.jobs && rowData.jobs.map((job, index) => {
                          if(new Date(job.startDate).setHours(0) <= Date.now() && new Date(job.endDate).setHours(24) >= Date.now()) {
                            return job.jobTitle
                          }
                          return null;
                        })
                      )
                    },
                    {title: 'Mobile', field: 'user_personal_info.mobile'},
                    {
                      title: 'Status', 
                      field: 'active',
                      render: rowData => (
                        rowData.active ? (
                          <Badge pill variant="success">Active</Badge>
                        ) : (
                          <Badge pill variant="danger">Inactive</Badge>
                        )
                      )
                    },
                    {
                      title: 'View',
                      render: rowData => (
                        <Form>
                          <Button size="sm" variant="info" onClick={this.onView(rowData)}><i className="far fa-address-card"></i></Button>
                          <Button className="ml-2" size="sm" variant="info" onClick={this.onSalaryView(rowData)}><i className="fas fa-money-bill-wave"></i></Button>
                        </Form>
                      )
                    }
                  ]}
                  data={this.state.users}
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