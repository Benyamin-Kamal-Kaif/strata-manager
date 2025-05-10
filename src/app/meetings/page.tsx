'use client';

import { useState, useEffect } from 'react';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: ''
  });

  // Load meetings from localStorage
  useEffect(() => {
    const savedMeetings = localStorage.getItem('committeeMeetings');
    if (savedMeetings) {
      setMeetings(JSON.parse(savedMeetings));
    } else {
      // Default meetings if none exist
      const defaultMeetings = [
        { id: 1, title: 'Annual General Meeting', date: '2025-05-15', time: '7:00 PM' },
        { id: 2, title: 'Committee Meeting', date: '2025-04-20', time: '6:30 PM' },
      ];
      setMeetings(defaultMeetings);
    }
  }, []);

  // Save meetings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('committeeMeetings', JSON.stringify(meetings));
  }, [meetings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const meeting: Meeting = {
      id: Date.now(),
      ...newMeeting
    };
    
    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', date: '', time: '' });
    setShowForm(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Committee Meetings</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Meeting
            </button>
          </div>
          
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Meeting
              </button>
            </form>
          )}
          
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="border-b pb-4">
                <h3 className="font-medium">{meeting.title}</h3>
                <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}