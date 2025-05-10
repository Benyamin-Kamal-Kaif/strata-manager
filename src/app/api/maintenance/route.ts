import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

let maintenanceRequests: any[] = [];

export async function GET() {
  return NextResponse.json({ requests: maintenanceRequests });
}

export async function POST(request: NextRequest) {
  try {
    const maintenanceRequest = await request.json();
    
    // Create a new request with status
    const newRequest = {
      id: Date.now(),
      ...maintenanceRequest,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      priority: calculatePriority(maintenanceRequest)
    };
    
    maintenanceRequests.push(newRequest);
    
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

function calculatePriority(request: any): 'High' | 'Medium' | 'Low' {
  const urgentKeywords = ['emergency', 'urgent', 'leak', 'electrical'];
  
  if (urgentKeywords.some(keyword => 
    request.description?.toLowerCase().includes(keyword))) {
    return 'High';
  }
  
  return 'Medium';
}