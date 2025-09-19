import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Redirect, NavLink } from 'react-router-dom'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from '../AlertModal'
import { getAnnouncements, addAnnouncementToStorage, getUsers } from '../../utils/localStorage'

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
        this.loadAnnouncements();
    }

    loadAnnouncements = () => {
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

    onDelete = (announcement) => {
        return event => {
            event.preventDefault()

            try {
                // Remove from localStorage
                const announcements = getAnnouncements();
                const filteredAnnouncements = announcements.filter(ann => ann.id !== announcement.id);
                localStorage.setItem('hrms_announcements', JSON.stringify(filteredAnnouncements));
                
                // Refresh the list
                this.loadAnnouncements();
                this.setState({
                    hasError: false,
                    errorMsg: ''
                });
            } catch (error) {
                this.setState({
                    hasError: true,
                    errorMsg: 'Failed to delete announcement. Please try again.'
                });
            }
        }
    }
    
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        const currentUser = JSON.parse(localStorage.getItem('user'));

        const announcementData = {
            title: this.state.title,
            description: this.state.description,
            createdByUserId: currentUser.id,
            department: currentUser.department || 'General',
            status: 'active'
        };

        try {
            addAnnouncementToStorage(announcementData);
            this.setState({
                title: '',
                description: '',
                hasError: false
            });
            // Refresh the announcements list
            this.loadAnnouncements();
        } catch (error) {
            this.setState({
                hasError: true,
                errorMsg: 'Failed to publish announcement. Please try again.'
            });
        }
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
                    <Card.Header><strong>Add Announcement</strong></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        name="title"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        type="textarea"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        name="description"
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" size="sm" className="mt-1">Publish</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
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
                                {title: 'Department', field: 'department.departmentName'},
                                {
                                    title: 'Action',
                                    render: rowData => (
                                        rowData.user.id==JSON.parse(localStorage.getItem('user')).id ? (
                                            <Form className="row">
                                                <Button onClick={this.onDelete(rowData)} size="sm" variant="danger"><i className="fas fa-trash"></i>Delete</Button>
                                            </Form>
                                        ) : null
                                    )
                                }
                            ]}
                            data={this.state.announcements}
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 7,
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
            <Alert variant="danger" className="m-3">
              {this.state.errorMsg}
            </Alert>
          ) : (<></>)}
      </div>
    );
  }
}