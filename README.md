# Online Clinic Management System

A web-based clinic management system for patient tracking, prescription management, and pharmacy operations.

## Features
- Patient registration and tracking
- Doctor prescription management
- Pharmacy prescription access and medicine dispensing

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, PostgreSQL
- **Frontend:** React, TypeScript
- **Authentication:** JWT

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Installation
```bash
# Install all dependencies
npm run install:all

# Setup database
cd backend
cp .env.example .env
# Update .env with your database credentials
npm run migrate
```

### Running the Application
```bash
# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:backend  # Backend runs on http://localhost:5000
npm run dev:frontend # Frontend runs on http://localhost:3000
```

## Default Users
- **Doctor:** username: `doctor1`, password: `doctor123`
- **Pharmacist:** username: `pharmacist1`, password: `pharma123`
