# Dream Foundation Admin Panel

This admin panel provides a comprehensive interface for managing admission and event registrations for Dream Foundation.

## Features

### 🔐 Authentication
- Secure admin login with JWT tokens
- Static credentials (configurable via environment variables)
- Session management with localStorage

### 📊 Dashboard
- Overview of all registrations
- Statistics cards showing counts
- Navigation to specific registration types
- Real-time data refresh

### 📋 Registration Management
- **Admission Registrations**: View and manage student admission applications
- **Event Registrations**: View and manage event participation registrations
- Detailed registration information including children data
- Email contact functionality

### 📈 Data Export
- Export registration data to Excel format
- Separate exports for registration details and children information
- Filtered exports by registration type

## Admin Credentials

**Default Login:**
- Email: `admin@dreamfoundation.org`
- Password: `admin123`

*Note: Change these credentials in production by setting environment variables.*

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# JWT Secret for admin authentication
JWT_SECRET=your-super-secure-jwt-secret-key

# Admin Credentials
ADMIN_EMAIL=admin@dreamfoundation.org
ADMIN_PASSWORD=admin123

# Email Configuration (for sending emails)
SEND_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/registrations` - Fetch all registrations (requires auth)

### Data Storage
- `POST /api/admin/registrations` - Store new registration data

## Pages

1. **`/admin/login`** - Admin login page
2. **`/admin`** - Main dashboard with overview
3. **`/admin/admissionRegisterUser`** - Admission registrations management
4. **`/admin/eventRegisterUser`** - Event registrations management

## Data Flow

1. Users submit forms on admission/event registration pages
2. Data is sent to `/api/sendEmail` which:
   - Sends email notifications to admin
   - Stores registration data in admin system
   - Sends confirmation emails to users
3. Admin can view, manage, and export data through the admin panel

## Excel Export Features

- **Registration Export**: Complete registration details in Excel format
- **Children Export**: Detailed children information with parent data
- **Filtered Exports**: Export specific registration types (admission/event/all)

## Security Notes

- JWT tokens expire after 24 hours
- Admin routes are protected with authentication middleware
- Static credentials should be changed in production
- Consider implementing proper password hashing for production use

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see above)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access admin panel at: `http://localhost:3000/admin/login`

## Dependencies Added

- `xlsx` - Excel file generation and export
- `jsonwebtoken` - JWT token management
- `bcryptjs` - Password hashing (for future use)
