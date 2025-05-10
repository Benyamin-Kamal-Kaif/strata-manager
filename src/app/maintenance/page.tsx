'use client';

import { useState, useEffect } from 'react';

interface MaintenanceRequest {
  id: number;
  unitNumber: string;
  contactName: string;
  contactPhone: string;
  description: string;
  urgency: string;
  status: string;
  createdAt: string;
  priority: 'High' | 'Medium' | 'Low';
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

  // Load requests from localStorage on component mount
  useEffect(() => {
    const savedRequests = localStorage.getItem('maintenanceRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save requests to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem('maintenanceRequests', JSON.stringify(requests));
  }, [requests]);

  // Handle form submission (client-side logic)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new request with client-side logic
    const newRequest: MaintenanceRequest = {
      id: Date.now(),
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      priority: calculatePriority(formData)
    };
    
    setRequests([...requests, newRequest]);
    setFormData({
      unitNumber: '',
      contactName: '',
      contactPhone: '',
      description: '',
      urgency: 'normal'
    });
    alert('Maintenance request submitted successfully!');
  };

  // Client-side priority calculation
  function calculatePriority(request: FormData): 'High' | 'Medium' | 'Low' {
    const urgentKeywords = ['emergency', 'urgent', 'leak', 'electrical'];
    
    if (request.urgency === 'emergency' || 
        urgentKeywords.some(keyword => 
          request.description?.toLowerCase().includes(keyword))) {
      return 'High';
    }
    
    return request.urgency === 'urgent' ? 'Medium' : 'Low';
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Maintenance Requests</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Submit New Request */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Submit New Request</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="unitNumber" className="block text-sm font-medium mb-1">
                  Unit Number
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
                <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                  Contact Name
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
                <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                  Contact Phone
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
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description of Issue
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
              
              <div className="mb-6">
                <label htmlFor="urgency" className="block text-sm font-medium mb-1">
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
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Submit Request
              </button>
            </form>
          </div>
          
          {/* View Existing Requests */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
            
            <div className="space-y-4">
              {requests.length > 0 ? (
                requests.map((request: MaintenanceRequest) => (
                  <div key={request.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Unit {request.unitNumber}</h3>
                        <p className="text-sm text-gray-600">{request.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Contact: {request.contactName} - {request.contactPhone}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        request.priority === 'High' ? 'bg-red-100 text-red-800' :
                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Submitted: {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No maintenance requests yet.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Information about client-side storage */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How This Works</h2>
          <p className="text-sm text-gray-700">
            Due to Vercel free tier limitations, this application uses client-side storage (localStorage) 
            to manage maintenance requests. In a production environment with a paid plan, this would 
            be replaced with a proper database and serverless functions.
          </p>
        </div>
      </div>
    </main>
  );
}