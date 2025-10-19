# Google Sheets Integration Setup Guide

## Overview
This guide will help you set up Google Sheets integration to automatically store user registration data from your Dream Foundation forms.

## Prerequisites
- Google Account
- Google Cloud Console access
- Node.js project with the googleapis package installed

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Dream Foundation Sheets API"
4. Click "Create"

### 1.2 Enable Google Sheets API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 1.3 Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the details:
   - Service account name: "dream-foundation-sheets"
   - Service account ID: "dream-foundation-sheets"
   - Description: "Service account for Dream Foundation Google Sheets integration"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 1.4 Generate Service Account Key
1. Click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file

## Step 2: Google Sheet Setup

### 2.1 Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it: "Dream Foundation Registrations"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)

### 2.2 Share Sheet with Service Account
1. In your Google Sheet, click "Share" button
2. Add the service account email (found in the JSON file as "client_email")
3. Give it "Editor" permissions
4. Click "Send"

## Step 3: Environment Variables Setup

### 3.1 Add to .env.local file
Add these variables to your `.env.local` file:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

### 3.2 Replace the values:
- `GOOGLE_SHEET_ID`: The Sheet ID from step 2.1
- `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`: The entire JSON content from the downloaded file (as a single line)

## Step 4: Initialize Sheets

### 4.1 Run Setup Script
```bash
node scripts/setupGoogleSheets.js
```

This will create the proper headers in your Google Sheets.

## Step 5: Test Integration

### 5.1 Test with Event Registration
1. Fill out the event registration form
2. Submit the form
3. Check your Google Sheet - you should see the data appear

### 5.2 Test with Admission Registration
1. Fill out the admission registration form
2. Submit the form
3. Check your Google Sheet - you should see the data appear

## Data Structure

### Event Registration Sheet Columns:
- Registration ID
- Submission Date
- Form Type
- Full Name
- Email
- Mobile
- Date of Birth
- Address
- Aadhar Number
- Event Name
- Event Date
- Event Time
- Event Location
- Number of Children
- Child 1-5 details (Name, DOB, Father, Mother, Standard, Aadhar)

### Admission Registration Sheet Columns:
- Same as Event Registration but without event-specific fields

## Troubleshooting

### Common Issues:

1. **"Failed to initialize Google Sheets service"**
   - Check if GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is properly formatted
   - Ensure the JSON is valid and complete

2. **"Permission denied"**
   - Verify the service account email has access to the Google Sheet
   - Check if the Google Sheets API is enabled

3. **"Sheet not found"**
   - Verify the GOOGLE_SHEETS_SPREADSHEET_ID is correct
   - Ensure the sheet exists and is accessible

4. **"Invalid range"**
   - Run the setup script to create proper headers
   - Check if the sheet tabs are named correctly

### Testing API Endpoints:

```bash
# Test Google Sheets API directly
curl -X POST http://localhost:3000/api/googleSheets \
  -H "Content-Type: application/json" \
  -d '{"formType":"eventRegistration","fullName":"Test User","email":"test@example.com","mobile":"+91 1234567890"}'

# Fetch data from sheets
curl http://localhost:3000/api/googleSheets?formType=eventRegistration&limit=10
```

## Security Notes

- Never commit the service account JSON file to version control
- Keep your .env.local file secure and never share it
- Regularly rotate your service account keys
- Use environment variables for all sensitive data

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the Google Cloud project has proper permissions
4. Test with a simple API call first

## Benefits

✅ **Automatic Data Storage**: All form submissions are automatically saved to Google Sheets
✅ **Easy Data Management**: View, sort, and filter registration data in a familiar interface
✅ **Real-time Updates**: Data appears immediately after form submission
✅ **Backup & Export**: Google Sheets provides automatic backup and easy export options
✅ **Collaboration**: Multiple team members can access and manage the data
✅ **Analytics**: Use Google Sheets' built-in analytics and charts
✅ **Integration**: Connect with other Google Workspace tools
