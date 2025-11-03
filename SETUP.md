# 🏥 Clinic Management System - Setup Guide

## Project Structure Created ✅

```
clinic-system/
├── backend/              # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Auth & role checking
│   │   ├── models/       # TypeScript interfaces
│   │   ├── routes/       # API routes
│   │   ├── scripts/      # Database initialization
│   │   └── server.ts     # Main server file
│   └── package.json
├── frontend/             # React + TypeScript
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Main pages
│   │   ├── services/     # API client
│   │   └── App.tsx
│   └── package.json
└── README.md

```

## Quick Start Guide

### Step 1: Install PostgreSQL (if not installed)

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Create the database:**
```bash
createdb clinic_db
```

### Step 2: Navigate to Project Directory

```bash
cd /tmp/clinic-system
```

### Step 3: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Configure Database

```bash
cd ../backend
cp .env.example .env
```

Edit `.env` file and update the database connection:
```
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/clinic_db
```

### Step 5: Initialize Database

```bash
# Run from the backend directory
npx ts-node src/scripts/initDb.ts
```

This will create:
- Users table (doctors, pharmacists)
- Patients table
- Prescriptions table
- Default users (doctor1/doctor123, pharmacist1/pharma123)
- Sample patients

### Step 6: Start the Application

**Option 1: Run both frontend and backend together (from root):**
```bash
cd /tmp/clinic-system
npm run dev
```

**Option 2: Run separately:**

Terminal 1 (Backend):
```bash
cd /tmp/clinic-system/backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd /tmp/clinic-system/frontend
npm run dev
```

### Step 7: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Default Login Credentials

**Doctor Account:**
- Username: `doctor1`
- Password: `doctor123`

**Pharmacist Account:**
- Username: `pharmacist1`
- Password: `pharma123`

## Features Overview

### Doctor Dashboard
- View all patients
- Select patient to create prescription
- Fill prescription details (medicine, dosage, duration)
- Submit prescriptions

### Pharmacy Dashboard
- View all prescriptions (Pending, Dispensed, All)
- Filter prescriptions by status
- Dispense pending prescriptions
- Mark prescriptions as complete

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient (Doctor only)
- `PUT /api/patients/:id` - Update patient (Doctor only)

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `GET /api/prescriptions/patient/:patientId` - Get patient prescriptions
- `POST /api/prescriptions` - Create prescription (Doctor only)
- `PATCH /api/prescriptions/:id/dispense` - Dispense prescription (Pharmacist only)

## Technology Stack

- **Backend:** Node.js, Express.js, TypeScript, PostgreSQL
- **Frontend:** React, TypeScript, Vite
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL with pg driver

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is in use:
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change `port` in `frontend/vite.config.ts`

### Database Connection Issues
- Ensure PostgreSQL is running: `brew services list`
- Check database exists: `psql -l`
- Verify credentials in `backend/.env`

### Module Not Found Errors
- Run `npm install` in root, backend, and frontend directories
- Delete `node_modules` and reinstall if issues persist

## Next Steps

1. Test login with default credentials
2. Doctor: Create prescriptions for sample patients
3. Pharmacist: View and dispense prescriptions
4. Customize UI styling in `frontend/src/index.css`
5. Add more features as needed

## Need Help?

Check the error logs in terminal for detailed error messages. Most issues are related to:
- Database connection (check .env file)
- Missing dependencies (run npm install)
- Port conflicts (change ports in config)

Happy coding! 🚀
