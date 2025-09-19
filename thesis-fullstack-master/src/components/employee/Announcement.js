import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect, NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { getAnnouncements, getUsers } from '../../utils/localStorage'

export default class Announcement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            announcements: [],
            departments: [],
            title: "",
            description: "",
            userId: null,
            departmentId: null,
            hasError: false,
            errorMsg: '',
            completed: false,
            showEditModel: false,
            showAlertModel: false
        }
    }

    componentDidMount() {
        const announcements = getAnnouncements();
        const users = getUsers();
        
        // Transform announcements to match expected format
        const transformedAnnouncements = announcements.map(announcement => ({
            id: announcement.id,
            announcementTitle: announcement.title,
            announcementDescription: announcement.description,
            user: {
                id: announcement.createdByUserId,
                fullName: users.find(u => u.id === announcement.createdByUserId)?.firstName + ' ' + users.find(u => u.id === announcement.createdByUserId)?.lastName || 'Unknown'
            },
            department: {
                departmentName: announcement.department || 'General'
            }
        }));
        
        this.setState({announcements: transformedAnnouncements});
    }

    
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }


  render() {
    let closeAlertModel = () => this.setState({showAlertModel: false})

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
                    <strong>Announcement List</strong>
                </div>
                </Card.Header>
                <Card.Body>
                    <ThemeProvider theme={theme}>
                    <MaterialTable
                            columns={[
                                {title: 'ID', field: 'id'},
                                {title: 'Title', field: 'announcementTitle'},
                                {title: 'Description', field: 'announcementDescription'},
                                {title: 'Created By', field: 'user.fullName'},
                                {title: 'Department', field: 'department.departmentName'}
                            ]}
                            data={this.state.announcements}
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 8,
                                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100]
                            }}
                            title="Announcements"
                    />
                    </ThemeProvider>
                </Card.Body>
            </Card>
            </div>
        </div>
        {this.state.hasError ? (
            <Alert variant="danger" className="m-3" block>
              {this.state.errMsg}
            </Alert>
          ) : (<></>)}
      </div>
    );
  }
}