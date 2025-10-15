import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock data storage - in a real app, this would be a database
let registrationsData: any[] = [];

export async function GET(req: Request) {
  try {
    // Check authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      registrations: registrationsData
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const registrationData = await req.json();
    
    // Add timestamp and ID
    const newRegistration = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...registrationData,
      submittedAt: new Date().toISOString()
    };

    registrationsData.push(newRegistration);

    return NextResponse.json({
      success: true,
      message: 'Registration stored successfully',
      id: newRegistration.id
    });
  } catch (error) {
    console.error('Error storing registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
