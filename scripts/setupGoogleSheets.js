const GoogleSheetsService = require('../src/utils/googleSheetsService');

async function setupGoogleSheets() {
  try {
    console.log('Setting up Google Sheets...');
    
    const sheetsService = new GoogleSheetsService();
    
    // Create headers for both sheets
    await sheetsService.createSheetHeaders();
    
    console.log('✅ Google Sheets setup completed successfully!');
    console.log('📊 Your sheets are now ready to receive registration data.');
    console.log('📋 Two sheets have been created:');
    console.log('   - Event Registrations');
    console.log('   - Admission Registrations');
    
  } catch (error) {
    console.error('❌ Error setting up Google Sheets:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Make sure GOOGLE_SHEETS_SPREADSHEET_ID is set in your .env file');
    console.log('2. Make sure GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is set in your .env file');
    console.log('3. Ensure the service account has access to the Google Sheet');
    console.log('4. Verify the Google Sheets API is enabled in your Google Cloud Console');
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupGoogleSheets();
}

module.exports = setupGoogleSheets;
