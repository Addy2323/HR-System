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
      { 
        id: 1, 
        title: 'Software Developer', 
        jobTitle: 'Software Developer',
        department: 'Information Technology', 
        departmentId: 2,
        employeeId: 4,
        salary: 'TSh 1,200,000', 
        description: 'Develop and maintain software applications',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        employeeName: 'John Doe'
      },
      { 
        id: 2, 
        title: 'HR Manager', 
        jobTitle: 'HR Manager',
        department: 'Human Resources', 
        departmentId: 1,
        employeeId: 2,
        salary: 'TSh 1,500,000', 
        description: 'Manage human resources operations',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        employeeName: 'Jane Smith'
      },
      { 
        id: 3, 
        title: 'Sales Representative', 
        jobTitle: 'Sales Representative',
        department: 'Sales', 
        departmentId: 3,
        employeeId: null,
        salary: 'TSh 800,000', 
        description: 'Handle sales and customer relations',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        employeeName: 'Unassigned'
      },
      { 
        id: 4, 
        title: 'Marketing Specialist', 
        jobTitle: 'Marketing Specialist',
        department: 'Marketing', 
        departmentId: 4,
        employeeId: 5,
        salary: 'TSh 900,000', 
        description: 'Plan and execute marketing campaigns',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        employeeName: 'Jane Smith'
      },
      { 
        id: 5, 
        title: 'Accountant', 
        jobTitle: 'Accountant',
        department: 'Finance', 
        departmentId: 5,
        employeeId: null,
        salary: 'TSh 1,000,000', 
        description: 'Manage financial records and transactions',
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        employeeName: 'Unassigned'
      }
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
        employeeId: 2,
        employeeName: 'John Doe',
        type: 'Leave',
        reason: 'Annual Leave',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 175853100236,
        employeeId: 5,
        employeeName: 'Jane Smith',
        type: 'student',
        reason: 'sijui',
        startDate: '2025-09-24',
        endDate: '2026-01-24',
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
        id: 175853061951,
        expenseItemName: 'wall',
        expenseItemStore: 'fifi',
        amount: 100000,
        date: '2025-09-25',
        departmentId: 1,
        department: {
          departmentName: 'Information Technology'
        },
        userId: 2,
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
export const authenticateUser = (usernameOrId, password) => {
  const users = getItem(STORAGE_KEYS.USERS, []);
  
  // Check if login is by username or employee ID
  const user = users.find(u => 
    (u.username === usernameOrId || u.id.toString() === usernameOrId) && 
    u.password === password
  );
  
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
    message: 'Invalid employee ID/username or password'
  };
};

export const getCurrentUser = () => {
  return getItem(STORAGE_KEYS.CURRENT_USER);
};

export const logoutUser = () => {
  removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Data management functions
export const getUsers = () => {
  const users = getItem(STORAGE_KEYS.USERS, []);
  // Ensure all users have proper sequential employeeId
  const fixedUsers = users.map((user, index) => {
    // If user has timestamp-based ID or no proper employeeId, fix it
    if (!user.employeeId || user.id > 1000000) {
      const sequentialId = index + 1;
      return {
        ...user,
        id: sequentialId,
        employeeId: `EMP${String(sequentialId).padStart(3, '0')}`
      };
    }
    return user;
  });
  
  // Save the fixed data back to localStorage
  if (fixedUsers.some((user, index) => user.id !== users[index]?.id)) {
    setItem(STORAGE_KEYS.USERS, fixedUsers);
  }
  
  return fixedUsers;
};

export const getDepartments = () => getItem(STORAGE_KEYS.DEPARTMENTS, []);
export const getJobs = () => getItem(STORAGE_KEYS.JOBS, []);

export const getEmployees = () => {
  const employees = getItem(STORAGE_KEYS.EMPLOYEES, []);
  // Ensure all employees have proper sequential employeeId
  const fixedEmployees = employees.map((employee, index) => {
    // If employee has timestamp-based ID or no proper employeeId, fix it
    if (!employee.employeeId || employee.id > 1000000) {
      const sequentialId = index + 1;
      return {
        ...employee,
        id: sequentialId,
        employeeId: `EMP${String(sequentialId).padStart(3, '0')}`
      };
    }
    return employee;
  });
  
  // Save the fixed data back to localStorage
  if (fixedEmployees.some((emp, index) => emp.id !== employees[index]?.id)) {
    setItem(STORAGE_KEYS.EMPLOYEES, fixedEmployees);
  }
  
  return fixedEmployees;
};

export const getApplications = () => getItem(STORAGE_KEYS.APPLICATIONS, []);
export const getPayments = () => getItem(STORAGE_KEYS.PAYMENTS, []);
export const getExpenses = () => getItem(STORAGE_KEYS.EXPENSES, []);
export const getAnnouncements = () => getItem(STORAGE_KEYS.ANNOUNCEMENTS, []);
export const getEvents = () => getItem(STORAGE_KEYS.EVENTS, []);
export const getSalaryDetails = () => {
  const salaryDetails = getItem(STORAGE_KEYS.SALARY_DETAILS) || [];
  
  // Initialize with default salary details if empty
  if (salaryDetails.length === 0) {
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
        allowanceTotal: 500000,
        deductionTax: 120000,
        deductionOther: 30000,
        deductionTotal: 150000,
        salaryGross: 1300000,
        salaryNet: 1150000
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
        allowanceTotal: 680000,
        deductionTax: 180000,
        deductionOther: 50000,
        deductionTotal: 230000,
        salaryGross: 1680000,
        salaryNet: 1450000
      },
      {
        id: 3,
        userId: 3,
        employmentType: 'Full Time',
        salaryBasic: 600000,
        allowanceHouseRent: 150000,
        allowanceMedical: 40000,
        allowanceSpecial: 75000,
        allowanceFuel: 50000,
        allowancePhoneBill: 20000,
        allowanceOther: 35000,
        allowanceTotal: 370000,
        deductionTax: 90000,
        deductionOther: 20000,
        deductionTotal: 110000,
        salaryGross: 970000,
        salaryNet: 860000
      }
    ];
    setItem(STORAGE_KEYS.SALARY_DETAILS, defaultSalaryDetails);
    return defaultSalaryDetails;
  }
  
  return salaryDetails;
};

// Add/Update functions
export const updateEmployee = (id, updatedData) => {
  const employees = getEmployees();
  const users = getUsers();
  
  const employeeIndex = employees.findIndex(emp => emp.id === id);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...updatedData };
    setItem(STORAGE_KEYS.EMPLOYEES, employees);
    
    // Also update in users collection
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      setItem(STORAGE_KEYS.USERS, users);
    }
    
    return employees[employeeIndex];
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

// Generate incremental Employee ID
export const generateEmployeeId = () => {
  const users = JSON.parse(localStorage.getItem('hrms_users')) || [];
  const employees = JSON.parse(localStorage.getItem('hrms_employees')) || [];
  
  // Get all existing sequential IDs, ignoring timestamp-based IDs
  const userIds = users.map(u => u.id || 0).filter(id => id < 1000000); // Filter out timestamp IDs
  const employeeIds = employees.map(e => e.id || 0).filter(id => id < 1000000); // Filter out timestamp IDs
  const allIds = [...userIds, ...employeeIds];
  
  // Find the maximum sequential ID and increment, start from 1 if no valid IDs
  const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
  return maxId + 1;
};

export const addUser = (user) => {
  const users = getUsers();
  const employees = getEmployees();

  // Generate incremental Employee ID
  const newEmployeeId = generateEmployeeId();

  // Create Employee ID in format EMP001, EMP002, etc.
  const formattedEmployeeId = `EMP${String(newEmployeeId).padStart(3, '0')}`;

  // Ensure user object has an incremental ID and Employee ID
  const newUserForUsersList = { 
    ...user, 
    id: newEmployeeId,
    employeeId: formattedEmployeeId,
    createdAt: new Date().toISOString() 
  };
  users.push(newUserForUsersList);

  // Create a separate, clean employee object for the employees list
  const newEmployee = {
    id: newEmployeeId,
    employeeId: formattedEmployeeId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.mobile, // Map mobile to phone for consistency
    department: user.department,
    position: user.position,
    salary: user.salary || 0,
    hireDate: user.hireDate,
    status: user.status || 'active'
  };
  employees.push(newEmployee);

  setItem(STORAGE_KEYS.USERS, users);
  setItem(STORAGE_KEYS.EMPLOYEES, employees);
  return newUserForUsersList;
};

export const addDepartment = (department) => {
  const departments = getDepartments();
  const maxId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) : 0;
  const newDepartment = { 
    ...department, 
    id: maxId + 1, 
    departmentName: department.name || department.departmentName,
    createdAt: new Date().toISOString() 
  };
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
  const index = salaryDetails.findIndex(detail => detail.id == id);
  
  if (index !== -1) {
    salaryDetails[index] = { ...salaryDetails[index], ...updatedData };
    setItem(STORAGE_KEYS.SALARY_DETAILS, salaryDetails);
    return salaryDetails[index];
  } else {
    // Create new salary detail if not found
    const newSalaryDetail = {
      id: id || Date.now(),
      userId: updatedData.userId,
      ...updatedData
    };
    salaryDetails.push(newSalaryDetail);
    setItem(STORAGE_KEYS.SALARY_DETAILS, salaryDetails);
    return newSalaryDetail;
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
  const employees = getEmployees();
  
  // Update in users collection
  const userIndex = users.findIndex(user => user.id == updatedUser.id);
  if (userIndex !== -1) {
    // Parse fullName to firstName and lastName
    const nameParts = updatedUser.fullName ? updatedUser.fullName.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Find department name from departmentId
    const departments = getDepartments();
    const selectedDepartment = departments.find(dept => dept.id == updatedUser.departmentId);
    const departmentName = selectedDepartment ? selectedDepartment.departmentName : 'Unknown';
    
    const updatedUserData = {
      ...users[userIndex],
      ...updatedUser,
      firstName: firstName,
      lastName: lastName,
      fullname: updatedUser.fullName,
      department: departmentName,
      email: updatedUser.emailAddress || updatedUser.email,
      status: updatedUser.active ? 'active' : 'inactive'
    };
    
    users[userIndex] = updatedUserData;
    setItem(STORAGE_KEYS.USERS, users);
    
    // Update in employees collection
    const employeeIndex = employees.findIndex(emp => emp.id == updatedUser.id);
    if (employeeIndex !== -1) {
      const updatedEmployeeData = {
        ...employees[employeeIndex],
        firstName: firstName,
        lastName: lastName,
        email: updatedUser.emailAddress || updatedUser.email,
        phone: updatedUser.mobile,
        department: departmentName,
        position: updatedUserData.position || employees[employeeIndex].position,
        status: updatedUser.active ? 'active' : 'inactive'
      };
      
      employees[employeeIndex] = updatedEmployeeData;
      setItem(STORAGE_KEYS.EMPLOYEES, employees);
    }
    
    return updatedUserData;
  }
  return null;
};

// Export storage keys for direct access if needed
export { STORAGE_KEYS };
