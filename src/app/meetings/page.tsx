'use client';

import { useState, useEffect } from 'react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  participants: string[];
  createdAt: string;
}

interface NewMeeting {
  title: string;
  date: string;
  time: string;
  type: string;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState<NewMeeting>({
    title: '',
    date: '',
    time: '',
    type: 'Committee'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{upcoming: boolean; type: string}>({
    upcoming: false,
    type: ''
  });

  // Fetch meetings from serverless function
  const fetchMeetings = async () => {
    try {
      let url = '/api/meetings';
      const params = new URLSearchParams();
      
      if (filter.upcoming) params.append('upcoming', 'true');
      if (filter.type) params.append('type', filter.type);
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setMeetings(data.meetings || []);
      } else {
        setError('Failed to fetch meetings');
      }
    } catch (error) {
      setError('Error loading meetings');
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    fetchMeetings();
  }, [filter]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeeting)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMeetings([data, ...meetings]);
        setNewMeeting({ title: '', date: '', time: '', type: 'Committee' });
        setShowForm(false);
        alert('Meeting scheduled successfully!');
      } else {
        setError(data.error || 'Failed to schedule meeting');
      }
    } catch (error) {
      setError('Error scheduling meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: any) => {
    setFilter({...filter, [field]: value});
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-6">Committee Meetings</h1>
        
        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.upcoming}
                onChange={(e) => handleFilterChange('upcoming', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Show upcoming only</span>
            </label>
            
            <select
              value={filter.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Types</option>
              <option value="AGM">Annual General Meeting</option>
              <option value="Committee">Committee Meeting</option>
              <option value="Special">Special Meeting</option>
            </select>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm ml-auto"
            >
              {showForm ? 'Cancel' : 'Schedule New Meeting'}
            </button>
          </div>
        </div>
        
        {/* Add Meeting Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Schedule New Meeting</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Title *
                </label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Type
                </label>
                <select
                  value={newMeeting.type}
                  onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Committee">Committee Meeting</option>
                  <option value="AGM">Annual General Meeting</option>
                  <option value="Special">Special Meeting</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              {error && (
                <div className="md:col-span-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {loading ? 'Scheduling...' : 'Schedule Meeting'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Meetings List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Meetings Schedule ({meetings.length} {filter.upcoming ? 'upcoming' : 'total'})
          </h2>
          
          <div className="space-y-4">
            {meetings.length > 0 ? (
              meetings.map((meeting) => {
                const isUpcoming = new Date(meeting.date) >= new Date();
                const isPast = !isUpcoming;
                
                return (
                  <div key={meeting.id} className={`border rounded-lg p-4 ${
                    isPast ? 'opacity-75' : ''
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">{meeting.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded ${
                            meeting.type === 'AGM' ? 'bg-purple-100 text-purple-800' :
                            meeting.type === 'Committee' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {meeting.type}
                          </span>
                          {isUpcoming && (
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                              Upcoming
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>📅 {new Date(meeting.date).toLocaleDateString('en-AU', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                          <span>🕐 {meeting.time}</span>
                        </div>
                        
                        {meeting.participants && meeting.participants.length > 0 && (
                          <div className="mt-2 text-sm text-gray-600">
                            Participants: {meeting.participants.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-center py-8">
                No meetings found. {filter.upcoming || filter.type ? 'Try adjusting your filters.' : 'Schedule your first meeting!'}
              </div>
            )}
          </div>
        </div>
        
        {/* API Information */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Meeting API Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">API Features:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>GET:</strong> Fetch meetings with filtering options</li>
                <li>• <strong>POST:</strong> Create new meetings with conflict detection</li>
                <li>• <strong>Query Parameters:</strong> ?upcoming=true&type=AGM</li>
                <li>• <strong>Conflict Detection:</strong> Prevents double-booking</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">HTTP Status Codes:</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-green-50 rounded text-sm">
                  <strong>201:</strong> Meeting successfully created
                </div>
                <div className="p-2 bg-yellow-50 rounded text-sm">
                  <strong>409:</strong> Time slot conflict detected
                </div>
                <div className="p-2 bg-red-50 rounded text-sm">
                  <strong>400:</strong> Missing required fields
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <h4 className="font-medium text-blue-900 mb-1">API Endpoint:</h4>
                <code className="text-sm text-blue-800">/api/meetings</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}