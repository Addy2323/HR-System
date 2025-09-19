import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { getApplications, getEmployees, setItem, STORAGE_KEYS } from '../utils/localStorage';
import moment from 'moment'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

export default class ApplicationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      selectedApplications: null,
      done: false,
      hasError: false,
      errorMsg: "",
      completed: false,
      showModel: false,
    };
  }

  componentDidMount() {
    // Force initialization of applications and employees if empty
    let applications = getApplications();
    if (applications.length === 0) {
      const defaultApplications = [
        {
          id: 1,
          employeeId: 4,
          employeeName: 'John Doe',
          type: 'Leave',
          reason: 'Annual Leave',
          startDate: '2024-01-20',
          endDate: '2024-01-25',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          employeeId: 5,
          employeeName: 'Jane Smith',
          type: 'Leave',
          reason: 'Medical Leave',
          startDate: '2024-02-10',
          endDate: '2024-02-15',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          employeeId: 3,
          employeeName: 'Jane Employee',
          type: 'Leave',
          reason: 'Personal Leave',
          startDate: '2024-03-05',
          endDate: '2024-03-08',
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('hrms_applications', JSON.stringify(defaultApplications));
      applications = defaultApplications;
    }

    let employees = getEmployees();
    if (employees.length === 0) {
      const defaultEmployees = [
        {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@hrms.com',
          phone: '+255 123 456 789',
          department: 'Information Technology',
          position: 'System Administrator',
          salary: 1200000,
          hireDate: '2023-01-15',
          status: 'active'
        },
        {
          id: 2,
          firstName: 'John',
          lastName: 'Manager',
          email: 'manager@hrms.com',
          phone: '+255 987 654 321',
          department: 'Human Resources',
          position: 'HR Manager',
          salary: 1500000,
          hireDate: '2022-06-10',
          status: 'active'
        },
        {
          id: 3,
          firstName: 'Jane',
          lastName: 'Employee',
          email: 'jane.employee@hrms.com',
          phone: '+255 555 123 456',
          department: 'Sales',
          position: 'Sales Representative',
          salary: 800000,
          hireDate: '2023-03-20',
          status: 'active'
        },
        {
          id: 4,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@hrms.com',
          phone: '+255 444 789 123',
          department: 'Information Technology',
          position: 'Software Developer',
          salary: 1100000,
          hireDate: '2023-05-15',
          status: 'active'
        },
        {
          id: 5,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@hrms.com',
          phone: '+255 333 456 789',
          department: 'Marketing',
          position: 'Marketing Specialist',
          salary: 900000,
          hireDate: '2023-07-01',
          status: 'active'
        }
      ];
      localStorage.setItem('hrms_employees', JSON.stringify(defaultEmployees));
      employees = defaultEmployees;
    }
    
    // Transform data to match expected format
    const transformedApplications = applications.map(app => {
      const employee = employees.find(emp => emp.id === app.employeeId);
      return {
        id: app.id,
        user: {
          id: app.employeeId,
          fullName: app.employeeName || (employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown')
        },
        startDate: moment(app.startDate).format('YYYY-MM-DD'),
        endDate: moment(app.endDate).format('YYYY-MM-DD'),
        type: app.type,
        reason: app.reason,
        status: app.status || 'pending'
      };
    });
    
    console.log('DEBUG: ApplicationList transformed applications:', transformedApplications);
    this.setState({ applications: transformedApplications });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onApprove = (app) => {
    return (event) => {
      event.preventDefault();

      // Update application status in localStorage
      const applications = getApplications();
      const updatedApplications = applications.map(application => 
        application.id === app.id ? { ...application, status: 'approved' } : application
      );
      localStorage.setItem('hrms_applications', JSON.stringify(updatedApplications));
      
      // Update state to reflect changes immediately
      const transformedApplications = this.state.applications.map(application => 
        application.id === app.id ? { ...application, status: 'approved' } : application
      );
      this.setState({ applications: transformedApplications });
      
      console.log('DEBUG: Application approved:', app.id);
    };
  }

  onReject = (app) => {
    return (event) => {
      event.preventDefault();

      // Update application status in localStorage
      const applications = getApplications();
      const updatedApplications = applications.map(application => 
        application.id === app.id ? { ...application, status: 'rejected' } : application
      );
      localStorage.setItem('hrms_applications', JSON.stringify(updatedApplications));
      
      // Update state to reflect changes immediately
      const transformedApplications = this.state.applications.map(application => 
        application.id === app.id ? { ...application, status: 'rejected' } : application
      );
      this.setState({ applications: transformedApplications });
      
      console.log('DEBUG: Application rejected:', app.id);
    };
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
      <div className="container-fluid pt-5">
        <div className="col-sm-12">
          <Card>
            <Card.Header style={{ backgroundColor: "#515e73", color: "white" }}>
              <div className="panel-title">
                <strong>Application List</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <ThemeProvider theme={theme}>
                <MaterialTable
                    columns={[
                        {title: 'APP ID', field: 'id'},
                        {title: 'Full Name', field: 'user.fullName'},
                        {title: 'Start Date', field: 'startDate'},
                        {title: 'End Date', field: 'endDate'},
                        {title: 'Leave Type', field: 'type'},
                        {title: 'Comments', field: 'reason'},
                        {
                            title: 'Status', 
                            field: 'status',
                            render: rowData => (
                                <Button size="sm" variant={
                                  rowData.status.toLowerCase() === 'approved' ? "success" : 
                                  rowData.status.toLowerCase() === 'pending' ? "warning" : 
                                  "danger"
                                }>
                                  {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
                                </Button>
                            )
                        },
                        {
                            title: 'Action',
                            render: rowData => {
                              const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
                              const isOwnApplication = rowData.user.id == currentUser.id;
                              const isPending = rowData.status.toLowerCase() === 'pending';
                              
                              if (!isOwnApplication && isPending) {
                                return (
                                  <>
                                    <Button 
                                      onClick={this.onApprove(rowData)} 
                                      variant="success" 
                                      size="sm" 
                                      className="mr-2"
                                    >
                                      <i className="fas fa-check"></i> Approve
                                    </Button>
                                    <Button 
                                      onClick={this.onReject(rowData)} 
                                      variant="danger" 
                                      size="sm" 
                                      className="ml-2"
                                    >
                                      <i className="fas fa-times"></i> Reject
                                    </Button>
                                  </>
                                );
                              }
                              return <span className="text-muted">No actions available</span>;
                            }
                        }
                    ]}
                    data={this.state.applications}
                    
                    options={{
                    rowStyle: (rowData, index) => {
                      if(index%2) {
                        return {backgroundColor: '#f2f2f2'}
                      }
                    },
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30, 50, 75, 100]
                  }}
                    title="Applications"
                />
              </ThemeProvider>
            </Card.Body>
          </Card>
        </div>
        {this.state.hasError ? (
          <Alert variant="danger" className="m-3" block>
            {this.state.errMsg}
          </Alert>
        ) : this.state.completed ? (
          <Redirect to="/application-list" />
        ) : (
          <></>
        )}
      </div>
    );
  }
}