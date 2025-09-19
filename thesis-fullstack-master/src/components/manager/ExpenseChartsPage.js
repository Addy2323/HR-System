import * as React from "react";
import { Bar } from "react-chartjs-2";
import { getExpenses, getUsers } from '../../utils/localStorage';

export default class ExpenseChartsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      expenseYear: 2021,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let deptId = JSON.parse(localStorage.getItem("user")).departmentId;
    
    // Use localStorage instead of axios
    const allExpenses = getExpenses();
    const allUsers = getUsers();
    
    // Filter expenses by department
    const deptExpenses = allExpenses.filter(expense => {
        const user = allUsers.find(u => u.id == expense.userId);
        return user && user.departmentId == deptId;
    });
    
    // Filter expenses by year
    const yearExpenses = deptExpenses.filter(expense => 
        new Date(expense.date).getFullYear() == this.state.expenseYear
    );
    
    // Group expenses by month
    const monthlyExpenses = {};
    yearExpenses.forEach(expense => {
        const month = new Date(expense.date).getMonth();
        if (!monthlyExpenses[month]) {
            monthlyExpenses[month] = 0;
        }
        monthlyExpenses[month] += parseInt(expense.amount || 0);
    });
    
    // Transform data to chart format
    const data = Object.keys(monthlyExpenses).map(month => ({
        month: this.getMonthName(parseInt(month)),
        expenses: monthlyExpenses[month]
    }));
    
    let array = this.makeArrayStructure(data);
    this.setState({ chartData: array });
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
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
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