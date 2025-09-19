import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import moment from 'moment'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { toast } from 'react-toastify';
import { getApplications, getUsers, updateApplication } from '../../utils/localStorage'

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
      let deptId = JSON.parse(localStorage.getItem('user')).departmentId
      // Use localStorage instead of axios
      const allApplications = getApplications();
      const allUsers = getUsers();
      
      // Filter applications by department
      const deptApplications = allApplications.filter(app => {
          const user = allUsers.find(u => u.id == app.userId);
          return user && user.departmentId == deptId;
      });
      
      // Format dates and add user info
      const formattedApplications = deptApplications.map(app => {
          const user = allUsers.find(u => u.id == app.userId);
          return {
              ...app,
              user: user ? { fullName: user.fullName || `${user.firstName} ${user.lastName}` } : { fullName: 'Unknown User' },
              startDate: moment(app.startDate).format('YYYY-MM-DD'),
              endDate: moment(app.endDate).format('YYYY-MM-DD')
          };
      });
      
      this.setState({ applications: formattedApplications });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onApprove(app) {
    return (event) => {
      event.preventDefault();
      
      try {
        // Update application status in localStorage
        const updatedApplication = updateApplication(app.id, { status: 'Approved' });
        
        if (updatedApplication) {
          // Update the state to reflect the change
          const updatedApplications = this.state.applications.map(application => 
            application.id === app.id ? { ...application, status: 'Approved' } : application
          );
          
          this.setState({ applications: updatedApplications });
          toast.success("Application approved successfully!");
        } else {
          toast.error("Failed to approve application.");
        }
      } catch (err) {
        toast.error("Failed to approve application: " + err.message);
      }
    };
  }

  onReject(app) {
    return (event) => {
      event.preventDefault()
      
      try {
        // Update application status in localStorage
        const updatedApplication = updateApplication(app.id, { status: 'Rejected' });
        
        if (updatedApplication) {
          // Update the state to reflect the change
          const updatedApplications = this.state.applications.map(application => 
            application.id === app.id ? { ...application, status: 'Rejected' } : application
          );
          
          this.setState({ applications: updatedApplications });
          toast.success("Application rejected successfully!");
        } else {
          toast.error("Failed to reject application.");
        }
      } catch (err) {
        toast.error("Failed to reject application: " + err.message);
      }
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
                                <Button size="sm" variant={rowData.status==='Approved' ? "success" : rowData.status==='Pending' ? "warning" : "danger"}>{rowData.status}</Button>
                            )
                        },
                        {
                            title: 'Action',
                            render: rowData => (
                              rowData.user.id != JSON.parse(localStorage.getItem('user')).id ? (
                                rowData.status==="Pending" ? (
                                  <>
                                    <Button onClick={this.onApprove(rowData)} variant="success" size="sm" className="mr-2"><i className="fas fa-edit"></i>Approve</Button>
                                    <Button onClick={this.onReject(rowData)} variant="danger" size="sm" className="ml-2"><i className="fas fa-trash"></i>Reject</Button>
                                  </>
                                ) : null
                              ) : null
                            )
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