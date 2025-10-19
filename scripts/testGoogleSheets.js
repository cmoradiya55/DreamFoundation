const GoogleSheetsService = require('../src/utils/googleSheetsService');

async function testGoogleSheetsIntegration() {
  try {
    console.log('🧪 Testing Google Sheets Integration...\n');
    
    const sheetsService = new GoogleSheetsService();
    
    // Test data for event registration
    const testEventData = {
      formType: 'eventRegistration',
      registrationId: 'TEST-EVENT-' + Date.now(),
      fullName: 'Test User',
      email: 'test@example.com',
      mobile: '+91 1234567890',
      dateOfBirth: '1990-01-01',
      address: 'Test Address, Test City',
      aadharNumber: '123456789012',
      children: [
        {
          childName: 'Test Child 1',
          childDateOfBirth: '2010-01-01',
          fatherName: 'Test Father',
          motherName: 'Test Mother',
          educationStandard: '5th',
          childAadhar: '123456789013'
        }
      ],
      eventDetail: {
        eventName: 'Dream Foundation Test Event',
        eventDate: '9th November 2025',
        eventTime: '5 pm to onwards',
        eventLocation: 'Test Location'
      }
    };

    // Test data for admission registration
    const testAdmissionData = {
      formType: 'admissionRegistration',
      registrationId: 'TEST-ADMISSION-' + Date.now(),
      fullName: 'Test Admission User',
      email: 'admission@example.com',
      mobile: '+91 9876543210',
      dateOfBirth: '1985-05-15',
      address: 'Test Admission Address',
      aadharNumber: '987654321098',
      children: [
        {
          childName: 'Admission Child 1',
          childDateOfBirth: '2015-03-10',
          fatherName: 'Admission Father',
          motherName: 'Admission Mother',
          educationStandard: '3rd',
          childAadhar: '987654321099'
        },
        {
          childName: 'Admission Child 2',
          childDateOfBirth: '2018-07-20',
          fatherName: 'Admission Father',
          motherName: 'Admission Mother',
          educationStandard: '1st',
          childAadhar: '987654321100'
        }
      ]
    };

    console.log('📝 Testing Event Registration...');
    const eventResult = await sheetsService.appendRegistrationData(testEventData);
    console.log('✅ Event registration test passed:', eventResult);

    console.log('\n📝 Testing Admission Registration...');
    const admissionResult = await sheetsService.appendRegistrationData(testAdmissionData);
    console.log('✅ Admission registration test passed:', admissionResult);

    console.log('\n📊 Fetching test data...');
    const eventData = await sheetsService.getRegistrationData('eventRegistration', 5);
    const admissionData = await sheetsService.getRegistrationData('admissionRegistration', 5);
    
    console.log('✅ Event registrations fetched:', eventData.length, 'records');
    console.log('✅ Admission registrations fetched:', admissionData.length, 'records');

    console.log('\n🎉 All tests passed! Google Sheets integration is working correctly.');
    console.log('\n📋 Next steps:');
    console.log('1. Check your Google Sheet to see the test data');
    console.log('2. Delete the test records if desired');
    console.log('3. Start using the forms - data will be automatically saved!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure environment variables are set correctly');
    console.log('2. Verify Google Sheets API is enabled');
    console.log('3. Check service account permissions');
    console.log('4. Ensure the Google Sheet exists and is accessible');
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testGoogleSheetsIntegration();
}

module.exports = testGoogleSheetsIntegration;
