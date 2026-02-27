import { useAuth } from '../context/AuthContext';
import { getData } from '../data/sampleData';
import {
  CheckSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  FileText,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const tasks = getData('tasks');

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const overdue = tasks.filter((t) => t.status === 'Overdue').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;

  const weeklyData = [
    { name: 'Mon', tasks: 5, completed: 3 },
    { name: 'Tue', tasks: 8, completed: 6 },
    { name: 'Wed', tasks: 6, completed: 4 },
    { name: 'Thu', tasks: 9, completed: 7 },
    { name: 'Fri', tasks: 7, completed: 5 },
    { name: 'Sat', tasks: 3, completed: 2 },
    { name: 'Sun', tasks: 1, completed: 1 },
  ];

  const pieData = [
    { name: 'Completed', value: completed, color: '#22c55e' },
    { name: 'In Progress', value: inProgress, color: '#f59e0b' },
    { name: 'Pending', value: pending, color: '#94a3b8' },
    { name: 'Overdue', value: overdue, color: '#ef4444' },
  ];

  const recentTasks = tasks.slice(0, 6);

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: CheckSquare,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-l-blue-600',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-l-amber-500',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-l-green-500',
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-l-red-500',
    },
  ];

  const statusBadge = (status) => {
    const map = {
      Completed: 'bg-green-100 text-green-700',
      'In Progress': 'bg-amber-100 text-amber-700',
      Overdue: 'bg-red-100 text-red-700',
      Pending: 'bg-gray-100 text-gray-600',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  };

  const priorityBadge = (priority) => {
    const map = {
      High: 'bg-red-100 text-red-700',
      Medium: 'bg-amber-100 text-amber-700',
      Low: 'bg-green-100 text-green-700',
    };
    return map[priority] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg lg:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold lg:text-3xl">
                Welcome back, {user?.name}!
              </h2>
              <p className="mt-1 text-blue-200">{formattedDate}</p>
              <p className="mt-2 text-sm text-blue-100">
                You have <span className="font-semibold text-white">{inProgress} tasks in progress</span> and{' '}
                <span className="font-semibold text-yellow-300">{overdue} overdue tasks</span> to attend to.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/tasks')}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 shadow transition-colors hover:bg-blue-50"
              >
                <Plus className="h-4 w-4" />
                New Task
              </button>
              <button
                onClick={() => navigate('/reports')}
                className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <FileText className="h-4 w-4" />
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg border-l-4 ${stat.borderColor} bg-white p-5 shadow-md transition-shadow hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`rounded-xl ${stat.bgColor} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Weekly Task Overview</h3>
              <p className="text-sm text-gray-500">Tasks created vs completed this week</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">+12%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData} barGap={8}>
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
              <Bar dataKey="tasks" fill="#2563eb" radius={[6, 6, 0, 0]} name="Created" />
              <Bar dataKey="completed" fill="#22c55e" radius={[6, 6, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-1 text-lg font-semibold text-gray-800">Task Distribution</h3>
          <p className="mb-4 text-sm text-gray-500">Current status breakdown</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '13px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Recent Tasks</h3>
            <p className="text-sm text-gray-500">Latest tasks across all projects</p>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Task</th>
                <th className="hidden pb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Assigned To</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Priority</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="hidden pb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTasks.map((task) => (
                <tr key={task.id} className="transition-colors hover:bg-gray-50">
                  <td className="py-3 pr-4">
                    <p className="text-sm font-medium text-gray-800">{task.name}</p>
                    <p className="text-xs text-gray-500">{task.client}</p>
                  </td>
                  <td className="hidden py-3 pr-4 text-sm text-gray-600 md:table-cell">{task.assignedTo}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${priorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="hidden py-3 text-sm text-gray-600 sm:table-cell">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
