import * as React from "react";
import { Bar } from "react-chartjs-2";
import { getExpenses, getUsers } from '../../utils/localStorage';

export default class ExpenseChartsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      expenseYear: 2024,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || '{}');
      const deptId = currentUser.departmentId;
      
      console.log('DEBUG: ExpenseChart - Department ID:', deptId);
      
      // Use localStorage instead of axios
      const allExpenses = getExpenses();
      const allUsers = getUsers();
      
      console.log('DEBUG: ExpenseChart - All expenses:', allExpenses);
      
      // Filter expenses by department - use departmentId directly from expense
      let deptExpenses = [];
      if (deptId) {
        deptExpenses = allExpenses.filter(expense => expense.departmentId == deptId);
      } else {
        // Show all expenses if no department
        deptExpenses = allExpenses;
      }
      
      console.log('DEBUG: ExpenseChart - Department expenses:', deptExpenses);
      
      // Filter expenses by year
      const yearExpenses = deptExpenses.filter(expense => 
          new Date(expense.date).getFullYear() == this.state.expenseYear
      );
      
      console.log('DEBUG: ExpenseChart - Year expenses:', yearExpenses);
      
      // Group expenses by month
      const monthlyExpenses = {};
      yearExpenses.forEach(expense => {
          const month = new Date(expense.date).getMonth();
          if (!monthlyExpenses[month]) {
              monthlyExpenses[month] = 0;
          }
          monthlyExpenses[month] += parseInt(expense.amount || 0);
      });
      
      console.log('DEBUG: ExpenseChart - Monthly expenses:', monthlyExpenses);
      
      // Transform data to chart format
      const data = Object.keys(monthlyExpenses).map(month => ({
          month: this.getMonthName(parseInt(month)),
          expenses: monthlyExpenses[month]
      }));
      
      console.log('DEBUG: ExpenseChart - Chart data:', data);
      
      let array = this.makeArrayStructure(data);
      this.setState({ chartData: array });
    } catch (error) {
      console.error('ExpenseChart: Error loading data:', error);
      this.setState({ chartData: { labels: [], datasets: [] } });
    }
  };

  getMonthName = (monthIndex) => {
    const months = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
  };

  transformData = (data) => {
    data.forEach((obj) => {
      obj.expenses = parseInt(obj.expenses);
    });
    return data;
  };

  makeArrayStructure = (data) => {
    let array = {
      labels: data.map((d) => d.month),
      datasets: [
        {
          data: [...data.map((d) => d.expenses)],
          backgroundColor: "#007fad",
        },
      ],
    };
    return array;
  };

  onChange = (event) => {
    this.setState({ expenseYear: event.target.value }, () => {
      this.fetchData();
    });
  };

  render() {
    return (
      <div className="card">
        <div className="mt-1" style={{ textAlign: "center" }}>
          <span className="ml-4">Select Year: </span>
          <select onChange={this.onChange} value={this.state.expenseYear}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div>
          <Bar
            data={this.state.chartData}
            height={300}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      stepSize: 300,
                    },
                  },
                ],
              },
            }}
            redraw
          />
        </div>
      </div>
    );
  }
}