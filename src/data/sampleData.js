const staff = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@taskflow.com', role: 'Senior Manager', phone: '9876543210', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@taskflow.com', role: 'Team Lead', phone: '9876543211', status: 'Active' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan@taskflow.com', role: 'Associate', phone: '9876543212', status: 'Active' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@taskflow.com', role: 'Associate', phone: '9876543213', status: 'Active' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@taskflow.com', role: 'Junior Associate', phone: '9876543214', status: 'Inactive' },
  { id: 6, name: 'Anita Desai', email: 'anita@taskflow.com', role: 'Senior Associate', phone: '9876543215', status: 'Active' },
];

const clients = [
  { id: 1, name: 'Reliance Industries Ltd', pan: 'AABCR1234A', gstin: '27AABCR1234A1Z5', contact: '9800000001', email: 'contact@reliance.com', status: 'Active' },
  { id: 2, name: 'TCS Consulting Pvt Ltd', pan: 'AABCT5678B', gstin: '27AABCT5678B1Z3', contact: '9800000002', email: 'admin@tcs.com', status: 'Active' },
  { id: 3, name: 'Infosys Solutions', pan: 'AABCI9012C', gstin: '29AABCI9012C1Z1', contact: '9800000003', email: 'info@infosys.com', status: 'Active' },
  { id: 4, name: 'Wipro Technologies', pan: 'AABCW3456D', gstin: '29AABCW3456D1Z9', contact: '9800000004', email: 'hello@wipro.com', status: 'Active' },
  { id: 5, name: 'Mahindra & Associates', pan: 'AABCM7890E', gstin: '27AABCM7890E1Z7', contact: '9800000005', email: 'contact@mahindra.com', status: 'Inactive' },
  { id: 6, name: 'Tata Steel Corp', pan: 'AABCT2345F', gstin: '20AABCT2345F1Z4', contact: '9800000006', email: 'steel@tata.com', status: 'Active' },
  { id: 7, name: 'Bajaj Finance Ltd', pan: 'AABCB6789G', gstin: '27AABCB6789G1Z2', contact: '9800000007', email: 'finance@bajaj.com', status: 'Active' },
  { id: 8, name: 'HCL Enterprises', pan: 'AABCH1234H', gstin: '09AABCH1234H1Z8', contact: '9800000008', email: 'admin@hcl.com', status: 'Active' },
  { id: 9, name: 'Adani Group Holdings', pan: 'AABCA5678I', gstin: '24AABCA5678I1Z6', contact: '9800000009', email: 'info@adani.com', status: 'Active' },
  { id: 10, name: 'Sun Pharma Industries', pan: 'AABCS9012J', gstin: '24AABCS9012J1Z4', contact: '9800000010', email: 'pharma@sun.com', status: 'Inactive' },
];

const services = [
  { id: 1, name: 'Income Tax Return Filing', category: 'Taxation', priority: 'High', frequency: 'Yearly' },
  { id: 2, name: 'GST Return Filing', category: 'Taxation', priority: 'High', frequency: 'Monthly' },
  { id: 3, name: 'Audit & Assurance', category: 'Audit', priority: 'High', frequency: 'Yearly' },
  { id: 4, name: 'Company Registration', category: 'Registration', priority: 'Medium', frequency: 'One-time' },
  { id: 5, name: 'Bookkeeping', category: 'Accounting', priority: 'Medium', frequency: 'Monthly' },
  { id: 6, name: 'TDS Return Filing', category: 'Taxation', priority: 'High', frequency: 'Quarterly' },
];

const groups = [
  { id: 1, name: 'Taxation Team', description: 'Handles all tax-related tasks and filings' },
  { id: 2, name: 'Audit Team', description: 'Responsible for audit and compliance work' },
  { id: 3, name: 'Registration Team', description: 'Handles company and trademark registrations' },
  { id: 4, name: 'Accounting Team', description: 'Manages bookkeeping and financial records' },
  { id: 5, name: 'Advisory Team', description: 'Provides financial and strategic advisory services' },
];

const tasks = [
  { id: 1, name: 'ITR Filing - Reliance Industries', client: 'Reliance Industries Ltd', assignedTo: 'Aarav Sharma', priority: 'High', dueDate: '2026-03-15', status: 'In Progress', service: 'Income Tax Return Filing', description: 'Annual ITR filing for FY 2025-26' },
  { id: 2, name: 'GST Return - TCS Consulting', client: 'TCS Consulting Pvt Ltd', assignedTo: 'Priya Patel', priority: 'High', dueDate: '2026-02-20', status: 'Overdue', service: 'GST Return Filing', description: 'Monthly GST return for January 2026' },
  { id: 3, name: 'Annual Audit - Infosys', client: 'Infosys Solutions', assignedTo: 'Rohan Mehta', priority: 'High', dueDate: '2026-04-30', status: 'Pending', service: 'Audit & Assurance', description: 'Statutory audit for FY 2025-26' },
  { id: 4, name: 'Company Registration - New Startup', client: 'Wipro Technologies', assignedTo: 'Sneha Gupta', priority: 'Medium', dueDate: '2026-03-01', status: 'In Progress', service: 'Company Registration', description: 'New subsidiary registration' },
  { id: 5, name: 'Bookkeeping - Mahindra Q4', client: 'Mahindra & Associates', assignedTo: 'Vikram Singh', priority: 'Medium', dueDate: '2026-03-31', status: 'Pending', service: 'Bookkeeping', description: 'Q4 bookkeeping and reconciliation' },
  { id: 6, name: 'TDS Filing - Tata Steel', client: 'Tata Steel Corp', assignedTo: 'Anita Desai', priority: 'High', dueDate: '2026-02-15', status: 'Completed', service: 'TDS Return Filing', description: 'Quarterly TDS return Q3' },
  { id: 7, name: 'GST Return - Bajaj Finance', client: 'Bajaj Finance Ltd', assignedTo: 'Aarav Sharma', priority: 'High', dueDate: '2026-02-20', status: 'Completed', service: 'GST Return Filing', description: 'Monthly GST return for January 2026' },
  { id: 8, name: 'ITR Filing - HCL Enterprises', client: 'HCL Enterprises', assignedTo: 'Priya Patel', priority: 'Medium', dueDate: '2026-03-31', status: 'Pending', service: 'Income Tax Return Filing', description: 'Annual ITR filing for FY 2025-26' },
  { id: 9, name: 'Audit - Adani Group', client: 'Adani Group Holdings', assignedTo: 'Rohan Mehta', priority: 'High', dueDate: '2026-02-28', status: 'In Progress', service: 'Audit & Assurance', description: 'Internal audit review' },
  { id: 10, name: 'GST Registration - Sun Pharma', client: 'Sun Pharma Industries', assignedTo: 'Sneha Gupta', priority: 'Low', dueDate: '2026-04-15', status: 'Pending', service: 'Company Registration', description: 'New state GST registration' },
  { id: 11, name: 'TDS Filing - Reliance Q4', client: 'Reliance Industries Ltd', assignedTo: 'Anita Desai', priority: 'High', dueDate: '2026-02-10', status: 'Completed', service: 'TDS Return Filing', description: 'Quarterly TDS return Q4' },
  { id: 12, name: 'Bookkeeping - TCS Monthly', client: 'TCS Consulting Pvt Ltd', assignedTo: 'Vikram Singh', priority: 'Medium', dueDate: '2026-03-05', status: 'In Progress', service: 'Bookkeeping', description: 'Monthly bookkeeping for February 2026' },
  { id: 13, name: 'ITR Filing - Wipro', client: 'Wipro Technologies', assignedTo: 'Aarav Sharma', priority: 'Medium', dueDate: '2026-03-31', status: 'Pending', service: 'Income Tax Return Filing', description: 'Annual ITR filing for FY 2025-26' },
  { id: 14, name: 'GST Return - Tata Steel', client: 'Tata Steel Corp', assignedTo: 'Priya Patel', priority: 'High', dueDate: '2026-02-25', status: 'In Progress', service: 'GST Return Filing', description: 'Monthly GST return for January 2026' },
  { id: 15, name: 'Audit - Bajaj Finance', client: 'Bajaj Finance Ltd', assignedTo: 'Rohan Mehta', priority: 'High', dueDate: '2026-01-31', status: 'Overdue', service: 'Audit & Assurance', description: 'Tax audit for FY 2025-26' },
  { id: 16, name: 'Bookkeeping - Infosys Q4', client: 'Infosys Solutions', assignedTo: 'Sneha Gupta', priority: 'Low', dueDate: '2026-04-10', status: 'Pending', service: 'Bookkeeping', description: 'Q4 bookkeeping and reconciliation' },
  { id: 17, name: 'TDS Filing - HCL Q3', client: 'HCL Enterprises', assignedTo: 'Anita Desai', priority: 'High', dueDate: '2026-02-18', status: 'Completed', service: 'TDS Return Filing', description: 'Quarterly TDS return Q3' },
  { id: 18, name: 'GST Return - Adani Monthly', client: 'Adani Group Holdings', assignedTo: 'Aarav Sharma', priority: 'High', dueDate: '2026-02-22', status: 'Overdue', service: 'GST Return Filing', description: 'Monthly GST return for January 2026' },
];

export function initializeSampleData() {
  if (!localStorage.getItem('tf_initialized')) {
    localStorage.setItem('tf_tasks', JSON.stringify(tasks));
    localStorage.setItem('tf_clients', JSON.stringify(clients));
    localStorage.setItem('tf_staff', JSON.stringify(staff));
    localStorage.setItem('tf_services', JSON.stringify(services));
    localStorage.setItem('tf_groups', JSON.stringify(groups));
    localStorage.setItem('tf_initialized', 'true');
  }
}

export function getData(key) {
  const data = localStorage.getItem(`tf_${key}`);
  return data ? JSON.parse(data) : [];
}

export function setData(key, data) {
  localStorage.setItem(`tf_${key}`, JSON.stringify(data));
}
