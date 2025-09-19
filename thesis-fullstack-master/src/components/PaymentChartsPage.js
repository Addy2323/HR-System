import * as React from "react";
import { Bar } from "react-chartjs-2";
import { getPayments } from '../utils/localStorage';

export default class PaymentChartsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [],
        datasets: []
      },
      paymentYear: 2025,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // Generate mock payment data for the selected year
    const mockData = this.generateMockPaymentData(this.state.paymentYear);
    let data = this.transformData(mockData);
    let array = this.makeArrayStructure(data);
    this.setState({ chartData: array });
  };

  generateMockPaymentData = (year) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Generate reasonable payment data based on year (salary payments)
    const basePayments = {
      'January': 1500, 'February': 1550, 'March': 1600, 'April': 1580,
      'May': 1620, 'June': 1590, 'July': 1640, 'August': 1610,
      'September': 1660, 'October': 1630, 'November': 1570, 'December': 1700
    };
    
    return months.map(month => ({
      month: month,
      expenses: basePayments[month] + Math.floor(Math.random() * 1000) // Add some variation
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
    this.setState({ paymentYear: event.target.value }, () => {
      this.fetchData();
    });
  };

  render() {
    return (
      <div className="card">
        <div className="mt-1" style={{ textAlign: "center" }}>
          <span className="ml-4">Select Year: </span>
          <select onChange={this.onChange} value={this.state.paymentYear}>
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
                      stepSize: 2000,
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
