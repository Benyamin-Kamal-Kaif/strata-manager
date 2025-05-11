import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory storage
let meetings: any[] = [
  { id: '1', title: 'Annual General Meeting', date: '2025-05-15', time: '7:00 PM', type: 'AGM' },
  { id: '2', title: 'Committee Meeting', date: '2025-04-20', time: '6:30 PM', type: 'Committee' }
];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.date || !data.time) {
      return NextResponse.json(
        { error: 'Missing required fields: title, date, time' },
        { status: 400 }
      );
    }
    
    // Check for scheduling conflicts
    const conflictingMeeting = meetings.find(meeting => {
      if (meeting.date !== data.date) return false;
      
      // Parse times and check if they're within 1 hour of each other
      const [hour1, minute1] = meeting.time.split(':').map(Number);
      const [hour2, minute2] = data.time.split(':').map(Number);
      
      const time1 = hour1 * 60 + minute1;
      const time2 = hour2 * 60 + minute2;
      
      return Math.abs(time1 - time2) < 60; // Within 1 hour
    });
    
    if (conflictingMeeting) {
      return NextResponse.json(
        { error: 'Time slot conflicts with existing meeting', conflictWith: conflictingMeeting },
        { status: 409 }
      );
    }
    
    // Create new meeting
    const newMeeting = {
      id: Date.now().toString(),
      ...data,
      type: data.type || 'Committee',
      participants: data.participants || [],
      createdAt: new Date().toISOString()
    };
    
    meetings.push(newMeeting);
    
    return NextResponse.json(newMeeting, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get('upcoming');
    const type = searchParams.get('type');
    
    let filteredMeetings = [...meetings];
    
    // Filter upcoming meetings
    if (upcoming === 'true') {
      const today = new Date();
      filteredMeetings = filteredMeetings.filter(meeting => 
        new Date(meeting.date) >= today
      );
    }
    
    // Filter by meeting type
    if (type) {
      filteredMeetings = filteredMeetings.filter(meeting => 
        meeting.type === type
      );
    }
    
    // Sort by date
    filteredMeetings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return NextResponse.json({
      meetings: filteredMeetings,
      count: filteredMeetings.length
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}