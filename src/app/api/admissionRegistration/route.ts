/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      dateOfBirth, 
      mobile, 
      mobileCountryCode, 
      email, 
      address, 
      aadharNumber, 
      registrationId,
      children = [],
      formattedData
    } = body;

    // Validate required fields
    if (!fullName || !dateOfBirth || !mobile || !email || !address || !aadharNumber || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert admission user data
    const { data: admissionUser, error: userError } = await supabase
      .from('admission_users')
      .insert({
        full_name: fullName,
        date_of_birth: dateOfBirth,
        mobile: mobile,
        mobile_country_code: mobileCountryCode || '+91',
        email: email,
        address: address,
        aadhar_number: aadharNumber,
        registration_id: registrationId
      })
      .select()
      .single();

    if (userError) {
      console.error('Error inserting admission user:', userError);
      return NextResponse.json(
        { error: 'Failed to save user data', details: userError.message },
        { status: 500 }
      );
    }

    // Insert children data if any
    if (children && children.length > 0) {
      const childrenData = children.map((child: any) => ({
        admission_user_id: admissionUser.id,
        child_name: child.childName,
        father_name: child.fatherName,
        mother_name: child.motherName,
        child_aadhar: child.childAadhar,
        child_date_of_birth: child.childDateOfBirth,
        education_standard: child.educationStandard
      }));

      const { error: childrenError } = await supabase
        .from('admission_children')
        .insert(childrenData);

      if (childrenError) {
        console.error('Error inserting admission children:', childrenError);
        // Note: We don't return error here as the user data is already saved
        // You might want to implement a rollback mechanism if needed
      }
    }

    // STEP 2: After successful database storage, send emails using existing sendEmail API
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sendEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'admissionRegistration',
          registrationId,
          fullName,
          dateOfBirth,
          email,
          mobile,
          mobileCountryCode,
          address,
          aadharNumber,
          children: children || [],
        }),
      });

      if (emailResponse.ok) {
        console.log('Admission registration emails sent successfully');
      } else {
        console.error('Error sending admission registration emails');
      }
    } catch (emailError) {
      console.error('Error calling sendEmail API:', emailError);
      // Don't fail the request if email sending fails - data is already saved
    }

    return NextResponse.json({
      success: true,
      message: 'Admission registration saved successfully and confirmation email sent',
      registrationId: registrationId,
      userId: admissionUser.id
    });

  } catch (error) {
    console.error('Error in admission registration API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get('registrationId');
    const email = searchParams.get('email');

    let query = supabase
      .from('admission_users')
      .select(`
        *,
        admission_children (*)
      `);

    if (registrationId) {
      query = query.eq('registration_id', registrationId);
    } else if (email) {
      query = query.eq('email', email);
    } else {
      return NextResponse.json(
        { error: 'Either registrationId or email parameter is required' },
        { status: 400 }
      );
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching admission registration:', error);
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('Error in admission registration GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
