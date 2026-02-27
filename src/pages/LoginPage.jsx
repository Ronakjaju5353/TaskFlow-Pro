import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    }, 600);
  };

  const fillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@taskflow.com');
      setPassword('admin123');
    } else {
      setEmail('staff@taskflow.com');
      setPassword('staff123');
    }
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">TaskFlow Pro</h1>
          <p className="mt-2 text-blue-200">Professional Task Management System</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h2 className="mb-1 text-xl font-bold text-gray-800">Welcome back</h2>
          <p className="mb-6 text-sm text-gray-500">Sign in to your account to continue</p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm text-gray-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="mb-3 text-center text-xs font-medium text-gray-500">DEMO CREDENTIALS</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => fillDemo('admin')}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                Admin Login
              </button>
              <button
                onClick={() => fillDemo('staff')}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                Staff Login
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-blue-200">
          TaskFlow Pro &copy; 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
}
