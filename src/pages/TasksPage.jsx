import { useState, useEffect } from 'react';
import { getData, setData } from '../data/sampleData';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Filter,
} from 'lucide-react';

const emptyTask = {
  name: '',
  client: '',
  assignedTo: '',
  priority: 'Medium',
  dueDate: '',
  status: 'Pending',
  service: '',
  description: '',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyTask);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  useEffect(() => {
    setTasks(getData('tasks'));
    setClients(getData('clients'));
    setStaff(getData('staff'));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.name.toLowerCase().includes(search.toLowerCase()) ||
      task.client.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const openAdd = () => {
    setEditingTask(null);
    setForm(emptyTask);
    setShowModal(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setForm({ ...task });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updated;
    if (editingTask) {
      updated = tasks.map((t) => (t.id === editingTask.id ? { ...form, id: editingTask.id } : t));
    } else {
      const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      updated = [...tasks, { ...form, id: newId }];
    }
    setTasks(updated);
    setData('tasks', updated);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    setData('tasks', updated);
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
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
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
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Task Name</th>
                <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Client</th>
                <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Assigned To</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Priority</th>
                <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Due Date</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((task, idx) => (
                <tr key={task.id} className={`transition-colors hover:bg-blue-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-800">{task.name}</p>
                    <p className="text-xs text-gray-500 md:hidden">{task.client}</p>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">{task.client}</td>
                  <td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">{task.assignedTo}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${priorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-gray-600 sm:table-cell">{task.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(task)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500">
                    No tasks found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{filteredTasks.length}</span> of{' '}
            <span className="font-medium text-gray-700">{tasks.length}</span> tasks
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Client</label>
                  <select
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Client</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Assigned To</label>
                  <select
                    value={form.assignedTo}
                    onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Staff</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
