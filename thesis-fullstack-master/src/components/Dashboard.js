import React, { Component } from "react";

import "../App.css";
import Infobox from "./infobox";
import Calendar from "./Calendar";
import ExpenseChartsPage from "./ExpenseChartsPage";
import PaymentChartsPage from "./PaymentChartsPage";
import RecentApplciations from "./RecentApplications";
import RecentAnnouncements from "./RecentAnnouncements";
import { getEmployees, getExpenses, getPayments } from "../utils/localStorage";
import { formatCurrency } from "../utils/currency";

export default class Dashboard extends Component {
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
    // Get data from localStorage
    let employees = getEmployees();
    if (employees.length === 0) {
      // Initialize with default employees if empty
      const defaultEmployees = [
        { id: 1, firstName: 'Admin', lastName: 'User', department: 'IT', salary: 1200000 },
        { id: 2, firstName: 'John', lastName: 'Manager', department: 'HR', salary: 1500000 },
        { id: 3, firstName: 'Jane', lastName: 'Employee', department: 'Sales', salary: 800000 },
        { id: 4, firstName: 'John', lastName: 'Doe', department: 'IT', salary: 1100000 },
        { id: 5, firstName: 'Jane', lastName: 'Smith', department: 'Marketing', salary: 900000 }
      ];
      localStorage.setItem('hrms_employees', JSON.stringify(defaultEmployees));
      employees = defaultEmployees;
    }

    let expenses = getExpenses();
    if (expenses.length === 0) {
      // Initialize with reasonable expense data for 2025
      const defaultExpenses = [
        { id: 1, amount: 250000, description: 'Office Rent', date: '2025-01-15', department: 'Administration' },
        { id: 2, amount: 80000, description: 'Equipment Purchase', date: '2025-02-10', department: 'IT' },
        { id: 3, amount: 120000, description: 'Marketing Campaign', date: '2025-03-05', department: 'Marketing' },
        { id: 4, amount: 60000, description: 'Training Programs', date: '2025-04-20', department: 'HR' },
        { id: 5, amount: 95000, description: 'Utilities', date: '2025-05-12', department: 'Administration' },
        { id: 6, amount: 180000, description: 'Software Licenses', date: '2025-06-08', department: 'IT' },
        { id: 7, amount: 75000, description: 'Travel Expenses', date: '2025-07-15', department: 'Sales' },
        { id: 8, amount: 110000, description: 'Office Supplies', date: '2025-08-22', department: 'Administration' },
        { id: 9, amount: 220000, description: 'Equipment Maintenance', date: '2025-09-10', department: 'IT' }
      ];
      localStorage.setItem('hrms_expenses', JSON.stringify(defaultExpenses));
      expenses = defaultExpenses;
    }

    let payments = getPayments();
    if (payments.length === 0) {
      // Initialize with reasonable payment data for 2025
      const defaultPayments = [
        { id: 1, amount: 15000, description: 'January Salaries', date: '2025-01-31', type: 'Salary' },
        { id: 2, amount: 15500, description: 'February Salaries', date: '2025-02-28', type: 'Salary' },
        { id: 3, amount: 16000, description: 'March Salaries', date: '2025-03-31', type: 'Salary' },
        { id: 4, amount: 15800, description: 'April Salaries', date: '2025-04-30', type: 'Salary' },
        { id: 5, amount: 16200, description: 'May Salaries', date: '2025-05-31', type: 'Salary' },
        { id: 6, amount: 10000, description: 'June Salaries', date: '2025-06-30', type: 'Salary' },
        { id: 7, amount: 10000, description: 'July Salaries', date: '2025-07-31', type: 'Salary' },
        { id: 8, amount: 1610000, description: 'August Salaries', date: '2025-08-31', type: 'Salary' },
        { id: 9, amount: 10000, description: 'September Salaries', date: '2025-09-30', type: 'Salary' }
      ];
      localStorage.setItem('hrms_payments', JSON.stringify(defaultPayments));
      payments = defaultPayments;
    }

    // Calculate totals
    const totalEmployees = employees.length;
    const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

    this.setState({
      totalEmployees,
      totalExpenses,
      totalPayments
    });
  }
  render() {
    return (
      <div>
        {/* First Row with small info-boxes */}
        <div className="row pt-4">
          {/* First info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Employees"
              description={this.state.totalEmployees}
              color="bg-success"
              icon="fa fa-users"
            />
          </div>
          {/* Second info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Expenses"
              description={formatCurrency(this.state.totalExpenses)}
              color="bg-warning"
              icon="fa fa-wallet"
            />
          </div>
          {/* Third info-box */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <Infobox
              title="Total Payments"
              description={formatCurrency(this.state.totalPayments)}
              color="bg-danger"
              icon="fa fa-coins"
            />
          </div>
        </div>
        {/* Second Row with Calendar and Expense Report */}
        <div className="row pt-4">
          {/* Calendar */}
          <div className="col-sm-6">
            <Calendar />
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Recent Applications</h3>
              </div>
              <RecentApplciations />
            </div>
          </div>
          {/* Expense Report & Recent Applications */}
          <div className="col-md-6">
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Expense Report</h3>
              </div>
              <ExpenseChartsPage />
            </div>
            <div className="panel panel-default">
              <div
                className="panel-heading with-border"
                style={{ backgroundColor: "#515e73", color: "white" }}
              >
                <h3 className="panel-title">Payment Report</h3>
              </div>
              <PaymentChartsPage />
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
