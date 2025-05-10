import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// In-memory storage (would use a database in production)
let meetings: any[] = [];

export async function GET() {
  return NextResponse.json({ meetings });
}

export async function POST(request: NextRequest) {
  try {
    const meeting = await request.json();
    
    // Add meeting with unique ID
    const newMeeting = {
      id: Date.now(),
      ...meeting,
      createdAt: new Date().toISOString()
    };
    
    meetings.push(newMeeting);
    
    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid meeting data' }, { status: 400 });
  }
}