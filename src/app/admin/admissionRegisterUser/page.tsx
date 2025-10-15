'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Calendar,
  GraduationCap,
  Users
} from 'lucide-react';
import { exportToExcel, exportChildrenToExcel, RegistrationData } from '../../../Utils/excelExport';

type AdmissionRegistration = RegistrationData;

const AdmissionRegisterUser: React.FC = () => {
  const [registrations, setRegistrations] = useState<AdmissionRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAdmissionRegistrations();
  }, []);

  const fetchAdmissionRegistrations = async () => {
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
        const admissionRegistrations = data.registrations.filter((reg: any) => reg.type === 'admission');
        setRegistrations(admissionRegistrations);
      }
    } catch (error) {
      console.error('Error fetching admission registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportToExcel = () => {
    exportToExcel(registrations, 'admission_registrations.xlsx');
  };

  const handleExportChildrenToExcel = () => {
    exportChildrenToExcel(registrations, 'admission_children.xlsx');
  };

  const sendEmail = (registration: AdmissionRegistration) => {
    // Implementation for sending email
    console.log('Sending email to:', registration.email);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin')}
                className="mr-4 p-2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admission Registrations</h1>
                  <p className="text-sm text-gray-600">Dream Foundation</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleExportToExcel}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Registrations
              </button>
              <button
                onClick={handleExportChildrenToExcel}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Children
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Admission Registrations
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {registrations.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Registrations List */}
        <div className="space-y-6">
          {registrations.map((registration) => (
            <div key={registration.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {registration.fullName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Registration ID: {registration.id}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => sendEmail(registration)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Personal Information</h4>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{registration.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{registration.mobile}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{registration.address}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Aadhar: {registration.aadharNumber}</span>
                      </div>
                    </dl>
                  </div>

                  {/* Children Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Children Information</h4>
                    {registration.children.length > 0 ? (
                      <div className="space-y-2">
                        {registration.children.map((child, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">{child.childName}</div>
                              <div className="text-gray-600">
                                Father: {child.fatherName} | Mother: {child.motherName}
                              </div>
                              <div className="text-gray-600">Standard: {child.educationStandard}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No children registered</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Submitted on: {new Date(registration.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {registrations.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No admission registrations</h3>
              <p className="mt-1 text-sm text-gray-500">
                No admission registrations have been submitted yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionRegisterUser;
