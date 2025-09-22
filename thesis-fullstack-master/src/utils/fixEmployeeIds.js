// Utility script to fix existing Employee IDs from timestamp format to sequential format
export const fixExistingEmployeeIds = () => {
  const users = JSON.parse(localStorage.getItem('hrms_users')) || [];
  const employees = JSON.parse(localStorage.getItem('hrms_employees')) || [];
  
  console.log('Before fixing - Users:', users.length, 'Employees:', employees.length);
  
  // Sort users by creation date or ID to maintain some order
  users.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return (a.id || 0) - (b.id || 0);
  });
  
  // Fix users collection
  const fixedUsers = users.map((user, index) => {
    const newId = index + 1;
    const newEmployeeId = `EMP${String(newId).padStart(3, '0')}`;
    
    return {
      ...user,
      id: newId,
      employeeId: newEmployeeId
    };
  });
  
  // Fix employees collection to match users
  const fixedEmployees = employees.map((employee) => {
    // Find corresponding user
    const matchingUser = fixedUsers.find(user => 
      user.firstName === employee.firstName && 
      user.lastName === employee.lastName &&
      user.email === employee.email
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
  
  // Update localStorage
  localStorage.setItem('hrms_users', JSON.stringify(fixedUsers));
  localStorage.setItem('hrms_employees', JSON.stringify(fixedEmployees));
  
  console.log('After fixing - Users:', fixedUsers.length, 'Employees:', fixedEmployees.length);
  console.log('Fixed Employee IDs:', fixedUsers.map(u => ({ name: `${u.firstName} ${u.lastName}`, id: u.employeeId })));
  
  return { users: fixedUsers, employees: fixedEmployees };
};

// Auto-run the fix when this module is imported
if (typeof window !== 'undefined') {
  // Run on next tick to ensure localStorage is available
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('hrms_users')) || [];
    const hasTimestampIds = users.some(user => user.id > 1000000);
    
    if (hasTimestampIds) {
      console.log('Detected timestamp-based Employee IDs, fixing...');
      fixExistingEmployeeIds();
      console.log('Employee IDs have been fixed to sequential format');
    }
  }, 100);
}
