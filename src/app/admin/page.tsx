'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Calendar, 
  GraduationCap, 
  Download, 
  LogOut, 
  BarChart3,
  Mail,
  Eye,
  RefreshCw,
  ArrowRight,
  Shield
} from 'lucide-react';
import { exportToExcel, exportChildrenToExcel, RegistrationData } from '../../Utils/excelExport';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [activeTab, setActiveTab] = useState<'admission' | 'event' | 'all'>('all');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchRegistrations();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/registrations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations || []);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleExportToExcel = (data: RegistrationData[], filename: string) => {
    exportToExcel(data, filename);
  };

  const handleExportChildrenToExcel = (data: RegistrationData[], filename: string) => {
    exportChildrenToExcel(data, filename);
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (activeTab === 'all') return true;
    return reg.type === activeTab;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-sm text-gray-600">Dream Foundation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchRegistrations}
                className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            onClick={() => router.push('/admin/admissionRegisterUser')}
            className="bg-white overflow-hidden shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 border border-green-100 hover:border-green-200"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Admission Registrations
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      View and manage admission registrations
                    </dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => router.push('/admin/eventRegisterUser')}
            className="bg-white overflow-hidden shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 border border-emerald-100 hover:border-emerald-200"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Event Registrations
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      View and manage event registrations
                    </dd>
                  </dl>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-green-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Admission Registrations
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {registrations.filter(r => r.type === 'admission').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-emerald-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Event Registrations
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {registrations.filter(r => r.type === 'event').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-teal-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Registrations
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {registrations.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-lg rounded-xl mb-6 border border-green-100">
          <div className="border-b border-green-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Registrations ({registrations.length})
              </button>
              <button
                onClick={() => setActiveTab('admission')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'admission'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Admission ({registrations.filter(r => r.type === 'admission').length})
              </button>
              <button
                onClick={() => setActiveTab('event')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'event'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Event ({registrations.filter(r => r.type === 'event').length})
              </button>
            </nav>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mb-6 flex justify-end space-x-3">
          <button
            onClick={() => handleExportToExcel(filteredRegistrations, `${activeTab}_registrations.xlsx`)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Registrations
          </button>
          <button
            onClick={() => handleExportChildrenToExcel(filteredRegistrations, `${activeTab}_children.xlsx`)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Children Details
          </button>
        </div>

        {/* Registrations Table */}
        <div className="bg-white shadow-lg overflow-hidden rounded-xl border border-green-100">
          <div className="px-6 py-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Registration Details
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Children
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          registration.type === 'admission' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {registration.type === 'admission' ? 'Admission' : 'Event'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {registration.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.children.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(registration.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-900">
                          <Mail className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;