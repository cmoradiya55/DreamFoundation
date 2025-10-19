import { NextResponse } from 'next/server';
import GoogleSheetsService from '../../../utils/googleSheetsService';

// Ensure this route runs on the Node.js runtime
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Google Sheets API - Received data:', body);

    // Validate required fields
    if (!body.formType || !body.fullName || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: formType, fullName, email' },
        { status: 400 }
      );
    }

    // Initialize Google Sheets service
    const sheetsService = new GoogleSheetsService();

    // Append data to Google Sheets
    const result = await sheetsService.appendRegistrationData(body);

    return NextResponse.json({
      success: true,
      message: 'Data saved to Google Sheets successfully',
      data: result
    });

  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save data to Google Sheets',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const formType = searchParams.get('formType') || 'eventRegistration';
    const limit = parseInt(searchParams.get('limit')) || 100;

    // Initialize Google Sheets service
    const sheetsService = new GoogleSheetsService();

    // Fetch data from Google Sheets
    const data = await sheetsService.getRegistrationData(formType, limit);

    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    });

  } catch (error) {
    console.error('Google Sheets GET Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from Google Sheets',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
