'use client';

import { useState, useEffect, useCallback } from 'react';

interface MaintenanceRequest {
  id: string;
  unitNumber: string;
  contactName: string;
  contactPhone: string;
  description: string;
  urgency: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  unitNumber: string;
  contactName: string;
  contactPhone: string;
  description: string;
  urgency: string;
}

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [formData, setFormData] = useState<FormData>({
    unitNumber: '',
    contactName: '',
    contactPhone: '',
    description: '',
    urgency: 'normal'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{status: string; priority: string}>({
    status: '',
    priority: ''
  });

  // Fetch maintenance requests using useCallback to fix dependency warning
  const fetchRequests = useCallback(async () => {
    try {
      let url = '/api/maintenance';
      const params = new URLSearchParams();
      
      if (filter.status) params.append('status', filter.status);
      if (filter.priority) params.append('priority', filter.priority);
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setRequests(data.requests || []);
      } else {
        setError('Failed to fetch maintenance requests');
      }
    } catch {
      setError('Error loading maintenance requests');
    }
  }, [filter.status, filter.priority]);

  // Initial load and when filters change
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setRequests([data, ...requests]);
        
        // Reset form
        setFormData({
          unitNumber: '',
          contactName: '',
          contactPhone: '',
          description: '',
          urgency: 'normal'
        });
        
        // Show success message
        alert('Maintenance request submitted successfully!');
      } else {
        setError(data.error || 'Failed to submit maintenance request');
      }
    } catch {
      setError('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    setFilter({...filter, [field]: value});
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-6">Maintenance Requests</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submit New Request Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Submit New Request</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Number *
                </label>
                <input
                  type="text"
                  id="unitNumber"
                  value={formData.unitNumber}
                  onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
          
          {/* Requests List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={filter.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              
              <select
                value={filter.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">
              Maintenance Requests ({requests.length})
            </h2>
            
            <div className="space-y-4">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-medium">Unit {request.unitNumber}</h3>
                          <span className={`px-2 py-1 text-xs rounded ${
                            request.priority === 'High' ? 'bg-red-100 text-red-800' :
                            request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.priority} Priority
                          </span>
                          <span className={`px-2 py-1 text-xs rounded ${
                            request.status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                            request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">
                          {request.description}
                        </p>
                        
                        <div className="text-xs text-gray-500 flex flex-wrap gap-4">
                          <span>Contact: {request.contactName} - {request.contactPhone}</span>
                          <span>Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No maintenance requests found. {filter.status || filter.priority ? 'Try adjusting your filters.' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* HTTP and API Information */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">API Integration Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">HTTP Methods Used:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>GET:</strong> Fetch existing maintenance requests</li>
                <li>• <strong>POST:</strong> Submit new maintenance requests</li>
              </ul>
              
              <h3 className="font-medium mb-2 mt-4">Query Parameters:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <code>?status=Pending</code> - Filter by status</li>
                <li>• <code>?priority=High</code> - Filter by priority</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Serverless Function Features:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Automatic Priority Calculation:</strong> Based on keywords and urgency</li>
                <li>• <strong>Input Validation:</strong> Ensures required fields are provided</li>
                <li>• <strong>Conflict Detection:</strong> Checks for valid data</li>
                <li>• <strong>RESTful Responses:</strong> Proper HTTP status codes</li>
              </ul>
              
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <h4 className="font-medium text-blue-900 mb-1">API Endpoint:</h4>
                <code className="text-sm text-blue-800">/api/maintenance</code>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 rounded">
              <h4 className="font-medium text-green-900">201 Created</h4>
              <p className="text-sm text-green-800">Request successfully created</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <h4 className="font-medium text-yellow-900">400 Bad Request</h4>
              <p className="text-sm text-yellow-800">Missing required fields</p>
            </div>
            <div className="p-3 bg-red-50 rounded">
              <h4 className="font-medium text-red-900">500 Server Error</h4>
              <p className="text-sm text-red-800">Internal server error</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}