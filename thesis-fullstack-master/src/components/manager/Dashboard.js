import React, { Component } from "react";

import "../../App.css";
import Infobox from "../infobox";
import Calendar from "../Calendar";
import ExpenseChartsPage from "../manager/ExpenseChartsPage";
import RecentApplications from "../manager/RecentApplications";
import RecentAnnouncements from "../RecentAnnouncements";
import { getUsers, getExpenses } from '../../utils/localStorage';

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
    let departmentId = JSON.parse(localStorage.getItem("user")).departmentId;
    
    // Fetch Employees Total from localStorage
    const allUsers = getUsers();
    const departmentUsers = allUsers.filter(user => user.departmentId == departmentId);
    this.setState({ totalEmployees: departmentUsers.length });

    // Fetch Expenses Total from localStorage
    const allExpenses = getExpenses();
    const departmentExpenses = allExpenses.filter(expense => {
      // We need to find the user's department for each expense
      const user = allUsers.find(u => u.id == expense.userId);
      return user && user.departmentId == departmentId;
    });
    
    if (departmentExpenses.length > 0) {
      const totalExpenses = departmentExpenses.reduce((sum, expense) => sum + parseInt(expense.amount || 0), 0);
      this.setState({ totalExpenses: totalExpenses });
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
              description={this.state.totalExpenses + " TZS"}
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