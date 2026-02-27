import { useState } from 'react';
import { Building2, Save, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    orgName: 'TaskFlow Pro Organization',
    email: 'admin@taskflow.com',
    phone: '9876543200',
    website: 'https://taskflowpro.com',
    address: '123 Business Park, Suite 456, Mumbai, Maharashtra 400001',
    gst: '27AABCT1234A1Z5',
    pan: 'AABCT1234A',
    financialYear: '2025-2026',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
  });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('tf_settings', JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Organization Settings</h2>
          <p className="text-sm text-gray-500">Manage your organization profile and preferences</p>
        </div>
      </div>

      {saved && (
        <div className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Profile */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Organization Profile</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Organization Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.orgName}
                  onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">PAN</label>
              <input
                type="text"
                value={form.pan}
                onChange={(e) => setForm({ ...form, pan: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Preferences</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Financial Year</label>
              <select
                value={form.financialYear}
                onChange={(e) => setForm({ ...form, financialYear: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500"
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Date Format</label>
              <select
                value={form.dateFormat}
                onChange={(e) => setForm({ ...form, dateFormat: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500"
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
