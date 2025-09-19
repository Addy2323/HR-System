// localStorage utility functions for HRMS data management

// Keys for different data types
const STORAGE_KEYS = {
  USERS: 'hrms_users',
  CURRENT_USER: 'hrms_current_user',
  DEPARTMENTS: 'hrms_departments',
  JOBS: 'hrms_jobs',
  EMPLOYEES: 'hrms_employees',
  APPLICATIONS: 'hrms_applications',
  PAYMENTS: 'hrms_payments',
  EXPENSES: 'hrms_expenses',
  ANNOUNCEMENTS: 'hrms_announcements',
  EVENTS: 'hrms_events',
  SALARY_DETAILS: 'hrms_salary_details'
};

// Generic localStorage functions
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Initialize default data
export const initializeDefaultData = () => {
  // Initialize users if not exists
  if (!getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@hrms.com',
        password: 'admin123', // In real app, this would be hashed
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        department: 'Information Technology',
        departmentId: 2,
        position: 'System Administrator'
      },
      {
        id: 2,
        username: 'manager',
        email: 'manager@hrms.com',
        password: 'manager123',
        role: 'manager',
        firstName: 'John',
        lastName: 'Manager',
        department: 'Human Resources',
        departmentId: 1,
        position: 'HR Manager'
      },
      {
        id: 3,
        username: 'employee',
        email: 'employee@hrms.com',
        password: 'employee123',
        role: 'employee',
        firstName: 'Jane',
        lastName: 'Employee',
        department: 'Sales',
        departmentId: 3,
        position: 'Sales Representative'
      },
      {
        id: 4,
        username: 'john.doe',
        email: 'john.doe@hrms.com',
        password: 'password123',
        role: 'employee',
        firstName: 'John',
        lastName: 'Doe',
        department: 'Information Technology',
        departmentId: 2,
        position: 'Software Developer'
      },
      {
        id: 5,
        username: 'jane.smith',
        email: 'jane.smith@hrms.com',
        password: 'password123',
        role: 'employee',
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
        departmentId: 4,
        position: 'Marketing Specialist'
      }
    ];
    setItem(STORAGE_KEYS.USERS, defaultUsers);
  }

  // Initialize departments
  if (!getItem(STORAGE_KEYS.DEPARTMENTS)) {
    const defaultDepartments = [
      { id: 1, departmentName: 'Human Resources', description: 'HR Department', createdAt: new Date().toISOString() },
      { id: 2, departmentName: 'Information Technology', description: 'IT Department', createdAt: new Date().toISOString() },
      { id: 3, departmentName: 'Sales', description: 'Sales Department', createdAt: new Date().toISOString() },
      { id: 4, departmentName: 'Marketing', description: 'Marketing Department', createdAt: new Date().toISOString() },
      { id: 5, departmentName: 'Finance', description: 'Finance Department', createdAt: new Date().toISOString() }
    ];
    setItem(STORAGE_KEYS.DEPARTMENTS, defaultDepartments);
  }

  // Initialize jobs
  if (!getItem(STORAGE_KEYS.JOBS)) {
    const defaultJobs = [
      { id: 1, title: 'Software Developer', department: 'Information Technology', salary: 'TSh 1,200,000', description: 'Develop and maintain software applications' },
      { id: 2, title: 'HR Manager', department: 'Human Resources', salary: 'TSh 1,500,000', description: 'Manage human resources operations' },
      { id: 3, title: 'Sales Representative', department: 'Sales', salary: 'TSh 800,000', description: 'Handle sales and customer relations' },
      { id: 4, title: 'Marketing Specialist', department: 'Marketing', salary: 'TSh 900,000', description: 'Plan and execute marketing campaigns' },
      { id: 5, title: 'Accountant', department: 'Finance', salary: 'TSh 1,000,000', description: 'Manage financial records and transactions' }
    ];
    setItem(STORAGE_KEYS.JOBS, defaultJobs);
  }

  // Initialize employees
  if (!getItem(STORAGE_KEYS.EMPLOYEES)) {
    const defaultEmployees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@hrms.com',
        phone: '+255 123 456 789',
        department: 'Information Technology',
        position: 'Software Developer',
        salary: 1200000,
        hireDate: '2023-01-15',
        status: 'active'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@hrms.com',
        phone: '+255 987 654 321',
        department: 'Human Resources',
        position: 'HR Manager',
        salary: 1500000,
        hireDate: '2022-06-10',
        status: 'active'
      }
    ];
    setItem(STORAGE_KEYS.EMPLOYEES, defaultEmployees);
  }

  // Initialize applications
  if (!getItem(STORAGE_KEYS.APPLICATIONS)) {
    const defaultApplications = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        type: 'Leave',
        reason: 'Annual Leave',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];
    setItem(STORAGE_KEYS.APPLICATIONS, defaultApplications);
  }

  // Initialize payments
  if (!getItem(STORAGE_KEYS.PAYMENTS)) {
    const defaultPayments = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        amount: 1200000,
        paymentDate: '2024-01-01',
        paymentType: 'Salary',
        status: 'completed'
      }
    ];
    setItem(STORAGE_KEYS.PAYMENTS, defaultPayments);
  }

  // Initialize expenses
  if (!getItem(STORAGE_KEYS.EXPENSES)) {
    const defaultExpenses = [
      {
        id: 1,
        description: 'Office Supplies',
        amount: 150000,
        category: 'Office',
        date: '2024-01-15',
        status: 'approved'
      }
    ];
    setItem(STORAGE_KEYS.EXPENSES, defaultExpenses);
  }

  // Initialize announcements
  if (!getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
    const defaultAnnouncements = [
      {
        id: 1,
        title: 'Welcome to HRMS',
        content: 'Welcome to the Human Resource Management System. This system now uses localStorage for data persistence.',
        author: 'Admin',
        createdAt: new Date().toISOString(),
        priority: 'high'
      }
    ];
    setItem(STORAGE_KEYS.ANNOUNCEMENTS, defaultAnnouncements);
  }

  // Initialize salary details
  if (!getItem(STORAGE_KEYS.SALARY_DETAILS)) {
    const defaultSalaryDetails = [
      {
        id: 1,
        userId: 1,
        employmentType: 'Full Time',
        salaryBasic: 800000,
        allowanceHouseRent: 200000,
        allowanceMedical: 50000,
        allowanceSpecial: 100000,
        allowanceFuel: 75000,
        allowancePhoneBill: 25000,
        allowanceOther: 50000,
        deductionTax: 120000,
        deductionOther: 30000
      },
      {
        id: 2,
        userId: 2,
        employmentType: 'Full Time',
        salaryBasic: 1000000,
        allowanceHouseRent: 250000,
        allowanceMedical: 75000,
        allowanceSpecial: 150000,
        allowanceFuel: 100000,
        allowancePhoneBill: 30000,
        allowanceOther: 75000,
        deductionTax: 180000,
        deductionOther: 50000
      }
    ];
    setItem(STORAGE_KEYS.SALARY_DETAILS, defaultSalaryDetails);
  }
};

// User management functions
export const authenticateUser = (username, password) => {
  const users = getItem(STORAGE_KEYS.USERS, []);
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const userSession = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      position: user.position,
      loginTime: new Date().toISOString()
    };
    setItem(STORAGE_KEYS.CURRENT_USER, userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    return {
      success: true,
      user: userSession,
      message: 'Login successful'
    };
  }
  return {
    success: false,
    message: 'Invalid username or password'
  };
};

export const getCurrentUser = () => {
  return getItem(STORAGE_KEYS.CURRENT_USER);
};

export const logoutUser = () => {
  removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Data management functions
export const getUsers = () => getItem(STORAGE_KEYS.USERS, []);
export const getDepartments = () => getItem(STORAGE_KEYS.DEPARTMENTS, []);
export const getJobs = () => getItem(STORAGE_KEYS.JOBS, []);
export const getEmployees = () => getItem(STORAGE_KEYS.EMPLOYEES, []);
export const getApplications = () => getItem(STORAGE_KEYS.APPLICATIONS, []);
export const getPayments = () => getItem(STORAGE_KEYS.PAYMENTS, []);
export const getExpenses = () => getItem(STORAGE_KEYS.EXPENSES, []);
export const getAnnouncements = () => getItem(STORAGE_KEYS.ANNOUNCEMENTS, []);
export const getEvents = () => getItem(STORAGE_KEYS.EVENTS, []);
export const getSalaryDetails = () => getItem(STORAGE_KEYS.SALARY_DETAILS, []);

// Add/Update functions
export const updateEmployee = (id, updatedData) => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedData };
    setItem(STORAGE_KEYS.EMPLOYEES, employees);
    return employees[index];
  }
  return null;
};

export const deleteEmployee = (id) => {
  const employees = getEmployees();
  const filteredEmployees = employees.filter(emp => emp.id !== id);
  setItem(STORAGE_KEYS.EMPLOYEES, filteredEmployees);
  return true;
};

export const updateDepartment = (id, updatedData) => {
  const departments = getDepartments();
  const index = departments.findIndex(dept => dept.id === id);
  if (index !== -1) {
    departments[index] = { ...departments[index], ...updatedData };
    setItem(STORAGE_KEYS.DEPARTMENTS, departments);
    return departments[index];
  }
  return null;
};

export const deleteDepartment = (id) => {
  const departments = getDepartments();
  const filteredDepartments = departments.filter(dept => dept.id !== id);
  setItem(STORAGE_KEYS.DEPARTMENTS, filteredDepartments);
  return true;
};

export const addUser = (user) => {
  const users = getUsers();
  const employees = getEmployees();
  const newUser = { ...user, id: Date.now(), createdAt: new Date().toISOString() };
  users.push(newUser);
  
  // Also add to employees list for admin visibility
  const newEmployee = {
    id: newUser.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    department: user.department,
    position: user.position,
    hireDate: user.hireDate,
    salary: user.salary,
    status: user.status || 'inactive'
  };
  employees.push(newEmployee);
  
  setItem(STORAGE_KEYS.USERS, users);
  setItem(STORAGE_KEYS.EMPLOYEES, employees);
  return newUser;
};

export const addDepartment = (department) => {
  const departments = getDepartments();
  const newDepartment = { ...department, id: Date.now(), createdAt: new Date().toISOString() };
  departments.push(newDepartment);
  setItem(STORAGE_KEYS.DEPARTMENTS, departments);
  return newDepartment;
};

export const addJob = (job) => {
  const jobs = getJobs();
  const newJob = { ...job, id: Date.now() };
  jobs.push(newJob);
  setItem(STORAGE_KEYS.JOBS, jobs);
  return newJob;
};

export const addJobToStorage = (job) => {
  const jobs = getJobs();
  const newJob = { ...job, id: Date.now(), createdAt: new Date().toISOString() };
  jobs.push(newJob);
  setItem(STORAGE_KEYS.JOBS, jobs);
  return newJob;
};

export const addEmployee = (employee) => {
  const employees = getEmployees();
  const newEmployee = { ...employee, id: Date.now() };
  employees.push(newEmployee);
  setItem(STORAGE_KEYS.EMPLOYEES, employees);
  return newEmployee;
};

export const addApplicationToStorage = (application) => {
  const applications = getApplications();
  const newApplication = { ...application, id: Date.now(), createdAt: new Date().toISOString() };
  applications.push(newApplication);
  setItem(STORAGE_KEYS.APPLICATIONS, applications);
  return newApplication;
};

export const addPaymentToStorage = (payment) => {
  const payments = getPayments();
  const newPayment = { ...payment, id: Date.now() };
  payments.push(newPayment);
  setItem(STORAGE_KEYS.PAYMENTS, payments);
  return newPayment;
};

export const addExpenseToStorage = (expense) => {
  const expenses = getExpenses();
  const newExpense = { ...expense, id: Date.now(), createdAt: new Date().toISOString() };
  expenses.push(newExpense);
  setItem(STORAGE_KEYS.EXPENSES, expenses);
  return newExpense;
};

export const addAnnouncementToStorage = (announcement) => {
  const announcements = getAnnouncements();
  const newAnnouncement = { ...announcement, id: Date.now(), createdAt: new Date().toISOString() };
  announcements.push(newAnnouncement);
  setItem(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  return newAnnouncement;
};

export const updateEvent = (id, updatedData) => {
  const events = getEvents();
  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedData };
    setItem(STORAGE_KEYS.EVENTS, events);
    return events[index];
  }
  return null;
};

export const deleteEvent = (id) => {
  const events = getEvents();
  const filteredEvents = events.filter(event => event.id !== id);
  setItem(STORAGE_KEYS.EVENTS, filteredEvents);
  return true;
};

export const deleteJob = (id) => {
  const jobs = getJobs();
  const filteredJobs = jobs.filter(job => job.id !== id);
  setItem(STORAGE_KEYS.JOBS, filteredJobs);
  return true;
};

export const updateSalaryDetails = (id, updatedData) => {
  const salaryDetails = getSalaryDetails();
  const index = salaryDetails.findIndex(salary => salary.id === id);
  if (index !== -1) {
    salaryDetails[index] = { ...salaryDetails[index], ...updatedData };
    setItem(STORAGE_KEYS.SALARY_DETAILS, salaryDetails);
    return salaryDetails[index];
  } else {
    // If salary details don't exist, create new one
    const newSalary = { ...updatedData, id: id || Date.now() };
    salaryDetails.push(newSalary);
    setItem(STORAGE_KEYS.SALARY_DETAILS, salaryDetails);
    return newSalary;
  }
};

export const updateJob = (id, updatedData) => {
  const jobs = getJobs();
  const index = jobs.findIndex(job => job.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedData };
    setItem(STORAGE_KEYS.JOBS, jobs);
    return jobs[index];
  }
  return null;
};

export const addEventToStorage = (event) => {
  const events = getItem(STORAGE_KEYS.EVENTS, []);
  const newEvent = { ...event, id: Date.now(), createdAt: new Date().toISOString() };
  events.push(newEvent);
  setItem(STORAGE_KEYS.EVENTS, events);
  return newEvent;
};

// Add missing utility functions

export const updateApplication = (id, updatedData) => {
  const applications = getApplications();
  const index = applications.findIndex(app => app.id === id);
  if (index !== -1) {
    applications[index] = { ...applications[index], ...updatedData };
    setItem(STORAGE_KEYS.APPLICATIONS, applications);
    return applications[index];
  }
  return null;
};

export const updateUserInStorage = (updatedUser) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id == updatedUser.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    setItem(STORAGE_KEYS.USERS, users);
    return users[index];
  }
  return null;
};

// Export storage keys for direct access if needed
export { STORAGE_KEYS };
