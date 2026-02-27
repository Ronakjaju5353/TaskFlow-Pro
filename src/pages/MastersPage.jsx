import { useState, useEffect } from 'react';
import { getData, setData } from '../data/sampleData';
import { Plus, Edit2, Trash2, X, Users, Briefcase, UserCheck, FolderOpen } from 'lucide-react';

const tabs = [
  { key: 'clients', label: 'Clients', icon: Briefcase },
  { key: 'services', label: 'Services', icon: FolderOpen },
  { key: 'staff', label: 'Staff', icon: UserCheck },
  { key: 'groups', label: 'Groups', icon: Users },
];

const fieldsConfig = {
  clients: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'pan', label: 'PAN', type: 'text', required: true },
    { key: 'gstin', label: 'GSTIN', type: 'text', required: false },
    { key: 'contact', label: 'Contact', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], required: true },
  ],
  services: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'select', options: ['Taxation', 'Audit', 'Registration', 'Accounting', 'Advisory'], required: true },
    { key: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'], required: true },
    { key: 'frequency', label: 'Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Yearly', 'One-time'], required: true },
  ],
  staff: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'role', label: 'Role', type: 'select', options: ['Senior Manager', 'Team Lead', 'Senior Associate', 'Associate', 'Junior Associate'], required: true },
    { key: 'phone', label: 'Phone', type: 'text', required: true },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], required: true },
  ],
  groups: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'text', required: false },
  ],
};

const tableColumns = {
  clients: ['name', 'pan', 'gstin', 'contact', 'email', 'status'],
  services: ['name', 'category', 'priority', 'frequency'],
  staff: ['name', 'email', 'role', 'phone', 'status'],
  groups: ['name', 'description'],
};

export default function MastersPage() {
  const [activeTab, setActiveTab] = useState('clients');
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    setItems(getData(activeTab));
  }, [activeTab]);

  const columns = tableColumns[activeTab];
  const fields = fieldsConfig[activeTab];

  const openAdd = () => {
    setEditingItem(null);
    const empty = {};
    fields.forEach((f) => {
      empty[f.key] = f.type === 'select' ? f.options[0] : '';
    });
    setForm(empty);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updated;
    if (editingItem) {
      updated = items.map((i) => (i.id === editingItem.id ? { ...form, id: editingItem.id } : i));
    } else {
      const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      updated = [...items, { ...form, id: newId }];
    }
    setItems(updated);
    setData(activeTab, updated);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    setData(activeTab, updated);
  };

  const statusBadge = (value) => {
    if (value === 'Active') return 'bg-green-100 text-green-700';
    if (value === 'Inactive') return 'bg-red-100 text-red-700';
    if (value === 'High') return 'bg-red-100 text-red-700';
    if (value === 'Medium') return 'bg-amber-100 text-amber-700';
    if (value === 'Low') return 'bg-green-100 text-green-700';
    return '';
  };

  const isStatusField = (col) => ['status', 'priority'].includes(col);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-lg bg-white p-2 shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800 capitalize">{activeTab}</h2>
          <p className="text-sm text-gray-500">Manage your {activeTab} records</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">#</th>
                {columns.map((col, colIdx) => (
                  <th
                    key={col}
                    className={`px-3 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 ${colIdx > 1 && colIdx < columns.length - 1 ? 'hidden md:table-cell' : ''}`}
                  >
                    {col}
                  </th>
                ))}
                <th className="px-3 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, idx) => (
                <tr key={item.id} className={`transition-colors hover:bg-blue-50/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-3 sm:px-6 py-3 text-sm text-gray-500 hidden sm:table-cell">{idx + 1}</td>
                  {columns.map((col, colIdx) => (
                    <td key={col} className={`px-3 sm:px-6 py-3 text-sm text-gray-700 ${colIdx > 1 && colIdx < columns.length - 1 ? 'hidden md:table-cell' : ''}`}>
                      {isStatusField(col) ? (
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadge(item[col])}`}>
                          {item[col]}
                        </span>
                      ) : (
                        <span className="max-w-xs truncate block">{item[col]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-3 sm:px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} className="py-12 text-center text-sm text-gray-500">
                    No {activeTab} found. Click &quot;Add&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
          <p className="text-sm text-gray-500">
            Total: <span className="font-medium text-gray-700">{items.length}</span> {activeTab}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                {editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={form[field.key] || ''}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
                      required={field.required}
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={form[field.key] || ''}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
