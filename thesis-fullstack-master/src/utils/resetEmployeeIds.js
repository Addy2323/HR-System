// One-time script to reset all Employee IDs to proper sequential format
export const resetAllEmployeeIds = () => {
  console.log('Starting Employee ID reset...');
  
  // Get current data
  const users = JSON.parse(localStorage.getItem('hrms_users')) || [];
  const employees = JSON.parse(localStorage.getItem('hrms_employees')) || [];
  const salaryDetails = JSON.parse(localStorage.getItem('hrms_salary_details')) || [];
  
  console.log('Before reset:', {
    users: users.length,
    employees: employees.length,
    salaryDetails: salaryDetails.length
  });
  
  // Sort users by creation date to maintain order
  users.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });
  
  // Create mapping of old IDs to new IDs
  const idMapping = {};
  
  // Reset user IDs to sequential format
  const resetUsers = users.map((user, index) => {
    const oldId = user.id;
    const newId = index + 1;
    const newEmployeeId = `EMP${String(newId).padStart(3, '0')}`;
    
    idMapping[oldId] = newId;
    
    return {
      ...user,
      id: newId,
      employeeId: newEmployeeId
    };
  });
  
  // Reset employee IDs to match users
  const resetEmployees = employees.map((employee) => {
    const matchingUser = resetUsers.find(user => 
      user.firstName === employee.firstName && 
      user.lastName === employee.lastName
    );
    
    if (matchingUser) {
      return {
        ...employee,
        id: matchingUser.id,
        employeeId: matchingUser.employeeId
      };
    }
    
    return employee;
  });
  
  // Update salary details to use new user IDs
  const resetSalaryDetails = salaryDetails.map((salary) => {
    const newUserId = idMapping[salary.userId] || salary.userId;
    return {
      ...salary,
      userId: newUserId
    };
  });
  
  // Save updated data
  localStorage.setItem('hrms_users', JSON.stringify(resetUsers));
  localStorage.setItem('hrms_employees', JSON.stringify(resetEmployees));
  localStorage.setItem('hrms_salary_details', JSON.stringify(resetSalaryDetails));
  
  console.log('After reset:', {
    users: resetUsers.length,
    employees: resetEmployees.length,
    salaryDetails: resetSalaryDetails.length
  });
  
  console.log('New Employee IDs:', resetUsers.map(u => ({
    name: `${u.firstName} ${u.lastName}`,
    id: u.employeeId,
    numericId: u.id
  })));
  
  return {
    users: resetUsers,
    employees: resetEmployees,
    salaryDetails: resetSalaryDetails,
    idMapping
  };
};

// Run immediately when imported
if (typeof window !== 'undefined') {
  setTimeout(() => {
    resetAllEmployeeIds();
    console.log('✅ Employee IDs have been reset to sequential format (EMP001, EMP002, etc.)');
    alert('Employee IDs have been updated to sequential format. Please refresh the page to see changes.');
  }, 500);
}
