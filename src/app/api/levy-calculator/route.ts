import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { unitType, lotSize } = await request.json();
    
    // Simplified levy calculation
    const baseRate = 0.85; // per square meter
    const estimatedLevy = lotSize * baseRate;
    
    const breakdown = {
      administration: estimatedLevy * 0.6,
      capitalWorks: estimatedLevy * 0.3,
      insurance: estimatedLevy * 0.1
    };
    
    return NextResponse.json({
      unitType,
      lotSize,
      totalLevy: estimatedLevy,
      breakdown
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}