# Somoy Express Courier - Frontend

A modern, responsive and feature-rich courier service frontend application built with Next.js, Redux Toolkit and Tailwind CSS.

## Project Overview
Somoy Express is a comprehensive parcel delivery management system designed to streamline the entire courier service workflow. Inspired by popular delivery platforms like Pathao Courier and Sundarban this API provides a robust foundation for building modern courier and logistics applications.
The system implements a three-tier role-based architecture where Senders can create and manage parcel delivery requests, Receivers can track incoming packages and confirm deliveries, and Admins oversee the entire operation with complete system control. Each parcel is assigned a unique tracking ID and follows a complete lifecycle from request to delivery with real-time status updates.
Built with security-first principles, the API features JWT-based authentication, bcrypt password hashing, and comprehensive input validation. The modular architecture ensures scalability and maintainability, while MongoDB's flexible document structure efficiently handles complex parcel data and embedded status logs.
Whether you're building a small-scale local delivery service or a large enterprise logistics platform, Somoy Express  provides the essential building blocks with production-ready features including automated fee calculation, delivery confirmation workflows, and comprehensive admin controls for user and parcel management.

## Features

### Core Functionality
- **Role-based Authentication** - Separate dashboards for Senders, Receivers, and Admins
- **Real-time Package Tracking** - Track packages with detailed status updates
- **Responsive Design** - Mobile-first approach with seamless tablet and desktop experience
- **Modern UI/UX** - Clean, professional interface with smooth animations

### For Senders
- Create parcel delivery requests
- View all sent packages with status tracking
- Cancel packages (before dispatch)
- Real-time fee calculation
- Comprehensive delivery history

### For Receivers
- View incoming packages
- Confirm package delivery
- Track delivery status in real-time
- Complete delivery history

### For Admins
- Comprehensive dashboard with analytics
- Manage all users (activate/deactivate accounts)
- Update package status and location
- View system-wide statistics
- User and parcel management tools

## Tech Stack

- **Framework**: Next.js v15
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Motion Div
- **Forms**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Language**: TypeScript

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rrishiddh/Somoy-Express.git
   cd somoy-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp  .env
   ```
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

##  Project Structure

```
src/
├── app/                    
│   ├── auth/              
│   ├── dashboard/         
│   ├── faq/          
│   ├── track/              
│   ├── about/            
│   ├── contact/          
│   ├── globals.css       
│   ├── layout.tsx        
│   └── page.tsx          
├── components/           
│   ├── ui/               
│   ├── layout/           
│   ├── dashboard/        
│   └── common/           
├── lib/                  
│   ├── redux/            
│   │   ├── api/          
│   │   ├── slices/       
│   │   └── store.ts      
│   └── utils.ts          
└── types/                
    └── index.ts
```


## Authentication & Authorization

- **JWT-based authentication** with persistent sessions
- **Role-based access control** (Sender, Receiver, Admin)
- **Protected routes** with automatic redirects
- **Form validation** with comprehensive error handling

## Key Features Implementation

### Dashboard Analytics
- Real-time statistics and charts
- Status distribution visualization
- User activity metrics
- Performance indicators

### Package Tracking
- Unique tracking ID generation
- Real-time status updates
- Location tracking
- Delivery timeline visualization

### State Management
- Centralized Redux store
- RTK Query for API caching
- Optimistic updates
- Error handling and retry logic

## Dependencies:

* **@headlessui/react**: ^2.2.7
* **@hookform/resolvers**: ^5.2.1
* **@radix-ui/react-alert-dialog**: ^1.1.15
* **@radix-ui/react-avatar**: ^1.1.10
* **@radix-ui/react-dialog**: ^1.1.15
* **@radix-ui/react-dropdown-menu**: ^2.1.16
* **@radix-ui/react-label**: ^2.1.7
* **@radix-ui/react-select**: ^2.2.6
* **@radix-ui/react-slot**: ^1.2.3
* **@radix-ui/react-tabs**: ^1.1.13
* **@reduxjs/toolkit**: ^2.8.2
* **class-variance-authority**: ^0.7.1
* **clsx**: ^2.1.1
* **lucide-react**: ^0.541.0
* **motion**: ^12.23.12
* **next**: 15.5.0
* **react**: 19.1.0
* **react-dom**: 19.1.0
* **react-hook-form**: ^7.62.0
* **react-hot-toast**: ^2.6.0
* **react-redux**: ^9.2.0
* **tailwind-merge**: ^3.3.1
* **zod**: ^4.1.0

## Dev Dependencies:

* **@eslint/eslintrc**: ^3
* **@tailwindcss/postcss**: ^4
* **@types/node**: ^20
* **@types/react**: ^19
* **@types/react-dom**: ^19
* **eslint**: ^9
* **eslint-config-next**: 15.5.0
* **tailwindcss**: ^4
* **tw-animate-css**: ^1.3.7
* **typescript**: ^5


## API Integration (API Endpoints)

The frontend integrates with the somoy-express-api backend:

### Authentication
- **Register User** ~ `POST /api/auth/register`
- **Login User** ~ `POST /api/auth/login`

### User Management
- **Get User Profile** ~ `GET /api/users/profile`
- **Get All Users** (Admin) ~ `GET /api/users`
- **Toggle User Status** (Admin) ~ `PATCH /api/users/toggle-status/:userId`

### Parcel Management
- **Create Parcel** (Sender) ~ `POST /api/parcels`
- **Get Sender's Parcels** ~ `GET /api/parcels/my-sent`
- **Get Receiver's Parcels** ~ `GET /api/parcels/my-received`
- **Get Parcel by ID** ~ `GET /api/parcels/:id`
- **Track Parcel** ~ `GET /api/parcels/track/:trackingId`
- **Cancel Parcel** (Sender) ~ `PATCH /api/parcels/cancel/:id`
- **Confirm Delivery** (Receiver) ~ `PATCH /api/parcels/confirm-delivery/:id`

### Admin Operations
- **Get All Parcels** ~ `GET /api/parcels/admin/all`
- **Update Parcel Status** ~ `PATCH /api/parcels/admin/update-status/:id`


## Deployment

### Live Demo (Frontend): [https://somoy-express-rrishiddh.vercel.app/](https://somoy-express-rrishiddh.vercel.app/)

### GitHub-Repo-Backend-API: [https://github.com/rrishiddh/Somoy-Express-API](https://github.com/rrishiddh/Somoy-Express-API)

### Live Demo (API): [https://somoy-express-api-rrishiddh.vercel.app/](https://somoy-express-api-rrishiddh.vercel.app/)

