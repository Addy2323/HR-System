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
      
      if (!departmentId) {
        console.warn('Manager Dashboard: No department ID found for current user');
        return;
      }
      
      // Fetch Employees Total from both users and employees collections
      const allUsers = getUsers();
      const allEmployees = getEmployees();
      
      // Filter department employees from both collections
      const departmentUsers = allUsers.filter(user => user.departmentId == departmentId);
      const departmentEmployees = allEmployees.filter(emp => emp.departmentId == departmentId);
      
      // Use the larger count (in case data exists in both collections)
      const totalEmployees = Math.max(departmentUsers.length, departmentEmployees.length);
      this.setState({ totalEmployees });

      // Fetch Expenses Total from localStorage
      const allExpenses = getExpenses();
      const departmentExpenses = allExpenses.filter(expense => {
        // Check both users and employees collections for expense owner
        const userInUsers = allUsers.find(u => u.id == expense.userId);
        const userInEmployees = allEmployees.find(e => e.id == expense.userId);
        const user = userInUsers || userInEmployees;
        return user && user.departmentId == departmentId;
      });
      
      if (departmentExpenses.length > 0) {
        const totalExpenses = departmentExpenses.reduce((sum, expense) => {
          const amount = parseFloat(expense.amount) || 0;
          return sum + amount;
        }, 0);
        this.setState({ totalExpenses: Math.round(totalExpenses) });
      }
    } catch (error) {
      console.error('Manager Dashboard: Error loading data:', error);
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