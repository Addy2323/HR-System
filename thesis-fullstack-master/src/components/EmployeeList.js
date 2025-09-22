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
    const employees = getEmployees();
    // Transform data to match expected format
    const transformedEmployees = employees.map(emp => ({
      id: emp.id,
      fullName: `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unknown Name',
      department: { departmentName: emp.department || 'Unknown Department' },
      jobs: [{ 
        jobTitle: emp.position || 'Unknown Position', 
        startDate: emp.hireDate || new Date().toISOString().split('T')[0], 
        endDate: '2030-12-31' 
      }],
      user_personal_info: { mobile: emp.phone || emp.mobile || 'N/A' },
      active: emp.status === 'active',
      status: emp.status || 'active'
    }));
    this.setState({ users: transformedEmployees });
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

  render() {

    let closeDeleteModel = () => this.setState({deleteModal: false})

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
        {this.state.deleteModal ? (
          <DeleteModal show={true} onHide={closeDeleteModel} data={this.state.selectedUser} />
        ) :(<></>)}
        <h4>
          <a className="fa fa-plus mb-2 ml-2" href="/employee-add">
            Add Employee
          </a>
        </h4>
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
                    {title: 'EMP ID', field: 'id'},
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
