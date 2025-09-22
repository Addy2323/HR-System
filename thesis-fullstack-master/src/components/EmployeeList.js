import React, { Component } from "react";
import { Card, Badge, Button, Form, Modal } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import MaterialTable from 'material-table'
import DeleteModal from './DeleteModal'
import { getEmployees, deleteEmployee } from '../utils/localStorage'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

export default class EmployeeList extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      selectedUser: null,
      viewRedirect: false,
      editRedirect: false,
      deleteModal: false
    }
  }

  componentDidMount() {
    this.loadEmployees();
  }

  componentDidUpdate(prevProps) {
    // Reload employees when returning from edit page
    if (prevProps.location !== this.props.location) {
      this.loadEmployees();
    }
  }

  loadEmployees = () => {
    try {
      const employees = getEmployees();
      console.log('DEBUG: Raw employees data:', employees);
      
      if (!employees || employees.length === 0) {
        console.log('DEBUG: No employees found, setting empty array');
        this.setState({ users: [] });
        return;
      }
      
      const transformedEmployees = employees.map(emp => {
        if (!emp.firstName || !emp.lastName) {
          console.warn('DEBUG: Employee missing name fields:', emp);
          return null;
        }
        
        return {
          id: emp.id,
          employeeId: emp.employeeId || `EMP${String(emp.id).padStart(3, '0')}`,
          fullName: `${emp.firstName} ${emp.lastName}`,
          department: { departmentName: emp.department || 'Unknown' },
          jobs: [{ jobTitle: emp.position || 'Employee', startDate: emp.hireDate || new Date().toISOString(), endDate: '2030-12-31' }],
          user_personal_info: { mobile: emp.phone || 'N/A' },
          active: emp.status === 'active',
          status: emp.status || 'inactive'
        };
      }).filter(emp => emp !== null);
      
      console.log('DEBUG: Transformed employees:', transformedEmployees);
      this.setState({ users: transformedEmployees });
    } catch (error) {
      console.error('DEBUG: Error loading employees:', error);
      this.setState({ users: [] });
    }
  }

  onView = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, viewRedirect: true})
    } 
  }

  onEdit = (user) => {
    return (event) => {
      event.preventDefault()

      this.setState({selectedUser: user, editRedirect: true})
    }
  }

  onDelete = user => {
    return event => {
      event.preventDefault()

      this.setState({selectedUser: user, deleteModal: true})
    }
  }

  onCloseDeleteModal = () => {
    this.setState({ deleteModal: false });
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
        {this.state.editRedirect ? (<Redirect to={{pathname: '/employee-edit', state: {selectedUser: this.state.selectedUser}}}></Redirect>) : (<></>)}
        {this.state.deleteModal ? (<DeleteModal user={this.state.selectedUser} onClose={this.onCloseDeleteModal} onDelete={this.onDelete}></DeleteModal>) : (<></>)}
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>Employee List ({this.state.users.length} employees)</strong>
              </div>
            </Card.Header>
            <Card.Body>
              {this.state.users.length === 0 ? (
                <div className="text-center p-4">
                  <p>No employees found. Please add employees first.</p>
                </div>
              ) : null}
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
                      render: rowData => {
                        if (rowData.jobs && rowData.jobs.length > 0) {
                          const currentJob = rowData.jobs.find(job => 
                            new Date(job.startDate).setHours(0) <= Date.now() && 
                            new Date(job.endDate).setHours(24) >= Date.now()
                          );
                          return currentJob ? currentJob.jobTitle : rowData.jobs[0].jobTitle;
                        }
                        return 'N/A';
                      }
                    },
                    {title: 'Mobile', field: 'user_personal_info.mobile'},
                    {
                      title: 'Status', 
                      field: 'status',
                      render: rowData => (
                        rowData.status === 'active' ? (
                          <Badge pill variant="success">Active</Badge>
                        ) : (
                          <Badge pill variant="warning">Inactive</Badge>
                        )
                      )
                    },
                    {
                      title: 'View',
                      render: rowData => (
                        <Button 
                          size="sm" 
                          variant="info" 
                          onClick={this.onView(rowData)}
                          style={{minWidth: '50px'}}
                        >
                          <i className="far fa-eye"></i>
                        </Button>
                      )
                    },
                    {
                      title: 'Action',
                      render: rowData => (
                        <div className="d-flex gap-2">
                          <Button 
                            size="sm" 
                            variant="info" 
                            onClick={this.onEdit(rowData)}
                            className="mr-2"
                            style={{minWidth: '70px'}}
                          >
                            <i className="far fa-edit"></i> Edit
                          </Button>
                          <Button 
                            onClick={this.onDelete(rowData)} 
                            size="sm" 
                            variant="danger"
                            style={{minWidth: '70px'}}
                          >
                            <i className="far fa-trash-alt"></i> Delete
                          </Button>
                        </div>
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
