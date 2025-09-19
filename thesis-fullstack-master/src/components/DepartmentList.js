import React, { Component } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Redirect, NavLink } from 'react-router-dom'
import AddDepartment from './DepartmentAdd'
import EditDepartmentModal from './EditDepartmentModal'
import { getDepartments, deleteDepartment, getEmployees } from '../utils/localStorage'
import MaterialTable from 'material-table'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import AlertModal from './AlertModal'

export default class DepartmentList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            departments: [],
            jobs: [],
            selectedDepartment: null,
            hasError: false,
            errorMsg: '',
            completed: false,
            showEditModel: false,
            showAlertModel: false
        }
    }

    componentDidMount() {
        // Force initialization if departments are empty
        let departments = getDepartments();
        if (departments.length === 0) {
            const defaultDepartments = [
                { id: 1, departmentName: 'Human Resources', description: 'HR Department', createdAt: new Date().toISOString() },
                { id: 2, departmentName: 'Information Technology', description: 'IT Department', createdAt: new Date().toISOString() },
                { id: 3, departmentName: 'Sales', description: 'Sales Department', createdAt: new Date().toISOString() },
                { id: 4, departmentName: 'Marketing', description: 'Marketing Department', createdAt: new Date().toISOString() },
                { id: 5, departmentName: 'Finance', description: 'Finance Department', createdAt: new Date().toISOString() }
            ];
            localStorage.setItem('hrms_departments', JSON.stringify(defaultDepartments));
            departments = defaultDepartments;
        }
        
        // Transform data to match expected format - departments already have departmentName
        const transformedDepartments = departments.map(dept => ({
            id: dept.id,
            departmentName: dept.departmentName, // Fixed: use departmentName instead of name
            users: [] // Will be populated if needed
        }));
        console.log('DEBUG: DepartmentList departments:', transformedDepartments);
        this.setState({departments: transformedDepartments});
    }

    onEdit (department) {
        return event=> {
            event.preventDefault()
            
            this.setState({selectedDepartment: department, showEditModel: true})
        }
    }

    onDelete (department) {
        return event => {
            event.preventDefault()

            // Check if any employees are in this department
            const employees = getEmployees();
            const employeesInDept = employees.filter(emp => emp.department === department.departmentName);
            
            if(employeesInDept.length > 0) {
                this.setState({showAlertModel: true})
            } else {
                const success = deleteDepartment(department.id);
                if (success) {
                    // Refresh the department list
                    const departments = getDepartments();
                    const transformedDepartments = departments.map(dept => ({
                        id: dept.id,
                        departmentName: dept.departmentName,
                        users: []
                    }));
                    this.setState({departments: transformedDepartments});
                    toast.success("Department deleted successfully!");
                } else {
                    toast.error("Failed to delete department");
                }
            }
        }
    }
    
  render() {
    let closeEditModel = () => this.setState({showEditModel: false})
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
                <AddDepartment />
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
            <Card className="main-card">
                <Card.Header>
                <div className="panel-title">
                    <strong>Department List</strong>
                </div>
                </Card.Header>
                <Card.Body>
                    <ThemeProvider theme={theme}>
                    <MaterialTable
                            columns={[
                                {title: 'DEPT ID', field: 'id'},
                                {title: 'Department Name', field: 'departmentName'},
                                {
                                    title: 'Jobs', 
                                    render: dept => (
                                        <NavLink to={{ pathname: '/job-list', state: {selectedDepartment: dept.id}}}>Go to Job List</NavLink>
                                    )
                                },
                                {
                                    title: 'Action',
                                    render: rowData => (
                                        <Form className="row">
                                            <div className="col pl-5">
                                                <Button size="sm" variant="info" onClick={this.onEdit(rowData)}><i className="fas fa-edit"></i>Edit</Button>
                                            </div>
                                            <div className="col pr-5">
                                                <Button onClick={this.onDelete(rowData)} size="sm" variant="danger"><i className="fas fa-trash"></i>Delete</Button>
                                            </div>
                                        </Form>
                                    )
                                }
                            ]}
                            data={this.state.departments}
                            
                            options={{
                                rowStyle: (rowData, index) => {
                                    if(index%2) {
                                        return {backgroundColor: '#f2f2f2'}
                                    }
                                },
                                pageSize: 8,
                                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100]
                            }}
                            title="Departments"
                    />
                    </ThemeProvider>
                </Card.Body>
            </Card>
            {this.state.showEditModel ? (
                <EditDepartmentModal show={true} onHide={closeEditModel} data={this.state.selectedDepartment} />
            ) : this.state.showAlertModel ? (
                <AlertModal show={true} onHide={closeAlertModel} />
            ) : (<></>)}
            </div>
        </div>
      </div>
    );
  }
}