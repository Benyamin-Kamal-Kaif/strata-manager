import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory storage (would be database in production)
let maintenanceRequests: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.unitNumber || !data.contactName || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields: unitNumber, contactName, description' },
        { status: 400 }
      );
    }
    
    // Calculate priority based on description and urgency
    const calculatePriority = (description: string, urgency: string): 'High' | 'Medium' | 'Low' => {
      const urgentKeywords = ['emergency', 'urgent', 'leak', 'electrical', 'fire', 'water', 'gas'];
      
      if (urgency === 'emergency' || urgentKeywords.some(keyword => 
        description.toLowerCase().includes(keyword))) {
        return 'High';
      }
      
      if (urgency === 'urgent') {
        return 'Medium';
      }
      
      return 'Low';
    };
    
    // Create new maintenance request
    const newRequest = {
      id: Date.now().toString(),
      ...data,
      status: 'Pending',
      priority: calculatePriority(data.description, data.urgency || 'normal'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store the request
    maintenanceRequests.push(newRequest);
    
    return NextResponse.json(newRequest, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create maintenance request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    // Filter requests based on query parameters
    let filteredRequests = [...maintenanceRequests];
    
    if (status) {
      filteredRequests = filteredRequests.filter(req => req.status === status);
    }
    
    if (priority) {
      filteredRequests = filteredRequests.filter(req => req.priority === priority);
    }
    
    return NextResponse.json({
      requests: filteredRequests,
      count: filteredRequests.length,
      total: maintenanceRequests.length
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance requests' },
      { status: 500 }
    );
  }
}