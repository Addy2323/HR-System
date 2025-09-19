<h1 align="center">
  Human Resource Management System - Frontend Only
  <br>
</h1>

<h4 align="center">A powerful HRMS frontend built with React and modern UI components</h4>

<p align="center">
<img src="https://github.com/vasilismantz/testgif2/blob/master/thesis-large.gif?raw=true">
  <!-- <img src="https://user-images.githubusercontent.com/56836643/105662731-c36f6c80-5ed0-11eb-8a96-4ec846675756.gif"> -->
</p>

## Description

This is a frontend-only Human Resource Management System built with [React](https://github.com/facebook/react#react-----) and [Bootstrap](https://getbootstrap.com/) along with modern UI components. The backend has been removed, and the system now works with mock data and client-side authentication for demonstration purposes.

### Features

- Mock authentication system (accepts any login credentials)
- Responsive design using [Bootstrap](https://getbootstrap.com/) and [Material-UI](https://mui.com/)
- Complete HRMS interface with:
  - User management (Admin, Manager, Employee roles)
  - Department management
  - Job position management
  - Leave applications management
  - Payroll management with Tanzanian Shilling (TSh) currency
  - Expense management and reporting
  - Interactive charts and dashboards
  - Calendar integration for events and holidays
- Modern React components with hooks and functional programming
- Client-side routing with React Router

## Disclaimer

This project has a [70 page documentation](http://estia.hua.gr/browse/23478) (view [here](https://drive.google.com/file/d/1143CfOo8dPUhNYUT7a2deB-Vbi3Yr5ac/view?usp=sharing)), where I analyze the process of information gathering, showcase the Analysis and Design of the api and database and provide a useful User Manual.

Unfortunately this document is in the Greek language. I am working on an Englsih summary. If you are interested in my work, please do contact me so we can arrange a meeting for a live demo and analysis.

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Usage

The system now uses mock authentication - you can log in with any username and password combination. The system will automatically grant admin access for full feature exploration.

**Suggested test credentials:**
```
Username: admin
Password: admin123
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Known issues

- [here](https://github.com/vasilismantz/thesis-fullstack/issues) along with some other improvements planned.
