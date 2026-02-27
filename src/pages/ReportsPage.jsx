import { useState, useEffect } from 'react';
import { getData } from '../data/sampleData';
import { Download, Filter, Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function ReportsPage() {
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterStaff, setFilterStaff] = useState('All');

  useEffect(() => {
    setTasks(getData('tasks'));
    setStaff(getData('staff'));
  }, []);

  const filteredTasks = tasks.filter((t) => {
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    const matchStaff = filterStaff === 'All' || t.assignedTo === filterStaff;
    return matchStatus && matchStaff;
  });

  const completedCount = filteredTasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = filteredTasks.filter((t) => t.status === 'In Progress').length;
  const overdueCount = filteredTasks.filter((t) => t.status === 'Overdue').length;
  const pendingCount = filteredTasks.filter((t) => t.status === 'Pending').length;

  // Staff performance data
  const staffPerformance = staff.map((s) => {
    const staffTasks = tasks.filter((t) => t.assignedTo === s.name);
    return {
      name: s.name.split(' ')[0],
      total: staffTasks.length,
      completed: staffTasks.filter((t) => t.status === 'Completed').length,
      inProgress: staffTasks.filter((t) => t.status === 'In Progress').length,
      overdue: staffTasks.filter((t) => t.status === 'Overdue').length,
    };
  });

  // Task completion by service
  const services = [...new Set(tasks.map((t) => t.service).filter(Boolean))];
  const serviceData = services.map((svc) => {
    const svcTasks = tasks.filter((t) => t.service === svc);
    const shortName = svc.length > 15 ? svc.slice(0, 15) + '...' : svc;
    return {
      name: shortName,
      total: svcTasks.length,
      completed: svcTasks.filter((t) => t.status === 'Completed').length,
    };
  });

  const handleExport = () => {
    alert('Export functionality will be available in the next release.');
  };

  const statusBadge = (status) => {
    const map = {
      Completed: 'bg-green-100 text-green-700',
      'In Progress': 'bg-amber-100 text-amber-700',
      Overdue: 'bg-red-100 text-red-700',
      Pending: 'bg-gray-100 text-gray-600',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select
            value={filterStaff}
            onChange={(e) => setFilterStaff(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Staff</option>
            {staff.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-lg border-l-4 border-l-blue-600 bg-white p-4 shadow-md">
          <div className="rounded-lg bg-blue-50 p-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{filteredTasks.length}</p>
            <p className="text-xs font-medium text-gray-500">Total Tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border-l-4 border-l-green-500 bg-white p-4 shadow-md">
          <div className="rounded-lg bg-green-50 p-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
            <p className="text-xs font-medium text-gray-500">Completed</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border-l-4 border-l-amber-500 bg-white p-4 shadow-md">
          <div className="rounded-lg bg-amber-50 p-2">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{inProgressCount + pendingCount}</p>
            <p className="text-xs font-medium text-gray-500">In Progress</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border-l-4 border-l-red-500 bg-white p-4 shadow-md">
          <div className="rounded-lg bg-red-50 p-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{overdueCount}</p>
            <p className="text-xs font-medium text-gray-500">Overdue</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Staff Performance */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Staff Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={staffPerformance} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '13px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" radius={[4, 4, 0, 0]} />
              <Bar dataKey="overdue" fill="#ef4444" name="Overdue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Service */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Tasks by Service</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData} layout="vertical" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '13px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="total" fill="#2563eb" name="Total" radius={[0, 4, 4, 0]} />
              <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task Completion Report Table */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Task Completion Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">#</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Task Name</th>
                <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Client</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Assigned To</th>
                <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Due Date</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((task, idx) => (
                <tr key={task.id} className={`transition-colors hover:bg-blue-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{task.name}</td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 md:table-cell">{task.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{task.assignedTo}</td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell">{task.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
