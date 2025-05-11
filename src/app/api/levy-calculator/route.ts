import { NextRequest, NextResponse } from 'next/server';

// No 'export const runtime = "edge"' - this keeps it as a standard serverless function

export async function POST(request: NextRequest) {
  try {
    const { unitType, lotSize } = await request.json();
    
    // Validate input
    if (!unitType || !lotSize || lotSize <= 0) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide unit type and lot size.' },
        { status: 400 }
      );
    }
    
    // Calculate levy based on lot size and unit type
    let baseRate = 0.85; // Default rate per square meter
    
    // Adjust rate based on unit type
    switch (unitType) {
      case 'apartment':
        baseRate = 0.85;
        break;
      case 'townhouse':
        baseRate = 1.10;
        break;
      case 'commercial':
        baseRate = 1.50;
        break;
      default:
        baseRate = 0.85;
    }
    
    const totalLevy = lotSize * baseRate;
    
    // Calculate breakdown
    const breakdown = {
      administration: totalLevy * 0.6,
      capitalWorks: totalLevy * 0.3,
      insurance: totalLevy * 0.1
    };
    
    return NextResponse.json({
      unitType,
      lotSize,
      totalLevy: Math.round(totalLevy * 100) / 100,
      breakdown: {
        administration: Math.round(breakdown.administration * 100) / 100,
        capitalWorks: Math.round(breakdown.capitalWorks * 100) / 100,
        insurance: Math.round(breakdown.insurance * 100) / 100
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process levy calculation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return information about levy calculation
  return NextResponse.json({
    info: 'Submit a POST request with unitType and lotSize to calculate levies',
    rateInfo: {
      apartment: 0.85,
      townhouse: 1.10,
      commercial: 1.50
    }
  });
}