import { NextRequest, NextResponse } from 'next/server';

// Define proper type for maintenance request
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

// Temporary in-memory storage with proper typing - MUST BE const
const maintenanceRequests: MaintenanceRequest[] = [];

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
    const newRequest: MaintenanceRequest = {
      id: Date.now().toString(),
      unitNumber: data.unitNumber,
      contactName: data.contactName,
      contactPhone: data.contactPhone || '',
      description: data.description,
      urgency: data.urgency || 'normal',
      status: 'Pending',
      priority: calculatePriority(data.description, data.urgency || 'normal'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store the request
    maintenanceRequests.push(newRequest);
    
    return NextResponse.json(newRequest, { status: 201 });
    
  } catch {
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
    
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance requests' },
      { status: 500 }
    );
  }
}