import React, { Component } from "react";

import "../../App.css";
import Infobox from "../infobox";
import Calendar from "../Calendar";
import ExpenseChartsPage from "../manager/ExpenseChartsPage";
import RecentApplications from "../manager/RecentApplications";
import RecentAnnouncements from "../RecentAnnouncements";
import { getUsers, getEmployees, getExpenses } from '../../utils/localStorage';

export default class DashboardManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalEmployees: 0,
      totalExpenses: 0,
      totalPayments: 0,
      recentApplications: [],
    };
  }

  componentDidMount() {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || '{}');
      const departmentId = currentUser.departmentId;
      
      console.log('DEBUG: Manager Dashboard - Current user:', currentUser);
      console.log('DEBUG: Manager Dashboard - Department ID:', departmentId);
      
      // Fetch Employees Total from both users and employees collections
      const allUsers = getUsers();
      const allEmployees = getEmployees();
      
      console.log('DEBUG: All users:', allUsers);
      console.log('DEBUG: All employees:', allEmployees);
      
      let totalEmployees = 0;
      
      if (departmentId) {
        // Filter by department if manager has department
        const departmentUsers = allUsers.filter(user => user.departmentId == departmentId);
        const departmentEmployees = allEmployees.filter(emp => emp.departmentId == departmentId);
        totalEmployees = Math.max(departmentUsers.length, departmentEmployees.length);
        console.log('DEBUG: Department employees count:', totalEmployees);
      } else {
        // Show all employees if no department (fallback for admin/manager)
        totalEmployees = Math.max(allUsers.length, allEmployees.length);
        console.log('DEBUG: Total employees count (no dept filter):', totalEmployees);
      }
      
      this.setState({ totalEmployees });

      // Fetch Expenses Total from localStorage
      const allExpenses = getExpenses();
      console.log('DEBUG: All expenses:', allExpenses);
      
      let departmentExpenses = [];
      
      if (departmentId) {
        // Filter expenses by department
        departmentExpenses = allExpenses.filter(expense => {
          return expense.departmentId == departmentId;
        });
      } else {
        // Show all expenses if no department
        departmentExpenses = allExpenses;
      }
      
      console.log('DEBUG: Department expenses:', departmentExpenses);
      
      if (departmentExpenses.length > 0) {
        const totalExpenses = departmentExpenses.reduce((sum, expense) => {
          const amount = parseFloat(expense.amount) || 0;
          return sum + amount;
        }, 0);
        console.log('DEBUG: Total expenses amount:', totalExpenses);
        this.setState({ totalExpenses: Math.round(totalExpenses) });
      } else {
        this.setState({ totalExpenses: 0 });
      }
    } catch (error) {
      console.error('Manager Dashboard: Error loading data:', error);
      // Set default values on error
      this.setState({ totalEmployees: 0, totalExpenses: 0 });
    }
  }
  
  render() {
    return (
      <div>
        {/* First Row with small info-boxes */}
        <div className="row pt-4">
          {/* First info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Department Employees"
              description={this.state.totalEmployees}
              color="bg-success"
              icon="fa fa-users"
            />
          </div>
          {/* Second info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Department Expenses"
              description={this.state.totalExpenses.toLocaleString() + " TZS"}
              color="bg-warning"
              icon="fa fa-wallet"
            />
          </div>
        </div>
        {/* Second Row with Calendar and Expense Report */}
        <div className="row pt-4">
          {/* Calendar */}
          <div className="col-sm-6">
            <Calendar />
          </div>
          {/* Expense Report & Recent Applications */}
          <div className="col-md-6">
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Department Expense Report</h3>
              </div>
              <ExpenseChartsPage />
            </div>
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Recent Applications</h3>
              </div>
              <RecentApplications />
            </div>
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Recent Announcements</h3>
              </div>
              <RecentAnnouncements />
            </div>
          </div>
        </div>
      </div>
    );
  }
}