import * as React from "react";
import { Bar } from "react-chartjs-2";
import { getExpenses } from '../utils/localStorage';

export default class ExpenseChartsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [],
        datasets: []
      },
      expenseYear: 2025,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // Generate mock expense data for the selected year
    const mockData = this.generateMockExpenseData(this.state.expenseYear);
    let data = this.transformData(mockData);
    let array = this.makeArrayStructure(data);
    this.setState({ chartData: array });
  };

  generateMockExpenseData = (year) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Generate reasonable expense data based on year
    const baseExpenses = {
      'January': 250, 'February': 180, 'March': 320, 'April': 210,
      'May': 280, 'June': 350, 'July': 290, 'August': 310,
      'September': 270, 'October': 340, 'November': 260, 'December': 300
    };
    
    return months.map(month => ({
      month: month,
      expenses: baseExpenses[month] + Math.floor(Math.random() * 800) // Add some variation
    }));
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
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
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
