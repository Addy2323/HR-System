import React, { Component } from "react";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import JobEditModal from '../JobEditModal'
import moment from 'moment'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { getUsers, getDepartments } from '../../utils/localStorage'

export default class JobList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            department: null,
            selectedJob: null,
            jobs: [],
            showEditModel: false,
            showAddModel: false,
            showDeleteModel: false
        }
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({selectedDepartment: this.props.location.state.selectedDepartment})
        }
        let deptId = JSON.parse(localStorage.getItem('user')).departmentId
        
        // Use localStorage instead of axios
        const allUsers = getUsers();
        const departments = getDepartments();
        
        // Filter users by department
        const deptUsers = allUsers.filter(user => user.departmentId == deptId);
        
        // Extract jobs from users
        let jobs = []
        deptUsers.forEach(user => {
            if (user.jobs) {
                user.jobs.forEach((job, index) => {
                    // Format job data to match expected structure
                    const formattedJob = {
                        ...job,
                        startDate: moment(job.startDate).format('YYYY-MM-DD'),
                        endDate: moment(job.endDate).format('YYYY-MM-DD'),
                        user: {
                            fullName: user.fullName || `${user.firstName} ${user.lastName}`
                        }
                    };
                    jobs.push(formattedJob);
                });
            }
        });
        
        this.setState({jobs: jobs});
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
      <div className="container-fluid pt-2">
        <div className="row">
            <div className="col-sm-12">
            <Card className="main-card">
                <Card.Header>
                <div className="panel-title">
                    <strong>Job List</strong>
                </div>
                </Card.Header>
                <Card.Body>
                    <ThemeProvider theme={theme}>
                    <MaterialTable
                            columns={[
                                {title: 'JOB ID', field: 'id'},
                                {title: 'Job Title', field: 'jobTitle'},
                                {title: 'Employee', field: 'user.fullName'},
                                {title: 'Start Date', field: 'startDate'},
                                {title: 'End Date', field: 'endDate'},
                                {
                                    title: 'State', 
                                    field: 'endDate',
                                    render: job => (
                                    //We have to set startDate hours to 0 and endDate hours to 24 so that the state of the job remains the same the whole day
                                    new Date(job.startDate).setHours(0) > new Date() ? (<Badge variant="warning">Future Job</Badge>) : (
                                        new Date(job.endDate).setHours(24) >= new Date() ? (<Badge variant="success">Current Job</Badge>) : (
                                            <Badge variant="danger">Old Job</Badge>
                                        )
                                    )
                                    ),
                                    cellStyle: {
                                        paddingLeft: 30,
                                        paddingRight: 50
                                    },
                                    headerStyle: {
                                        paddingLeft: 30,
                                        paddingRight: 30
                                    }
                                }
                            ]}
                            data={this.state.jobs}
                            
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 8,
                                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100]
                            }}
                            title= {this.selectedUser ? this.selectedUser.fullName : ''}
                    />
                    </ThemeProvider>
                </Card.Body>
            </Card>
            </div>
        </div>
        {/* {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : this.state.completed ? (
            <Redirect to="/departments" />
          ) : (<></>)} */}
      </div>
    );
  }
}