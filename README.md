# CRM-Based Job Portal Management System

A full-stack Recruitment CRM and Job Portal Management System developed using the MERN stack and Tailwind CSS. The platform allows job seekers to apply for jobs, upload resumes, and track application statuses, while recruiters can manage job postings and applicants through a centralized dashboard. An admin panel is also included for overall platform management.

---

## Features

### Job Seeker
- User authentication
- Browse job listings
- Filter jobs by role and location
- Apply for jobs
- Upload resumes
- Save/bookmark jobs
- Track application status
- View applied companies

---

### Organizer / Recruiter
- Recruiter authentication
- Create and manage company profile
- Post new jobs
- Update and delete job postings
- View applicants
- Download resumes
- Update applicant status
  - Pending
  - Selected
  - Rejected

---

### Admin
- Dashboard overview
- Manage job seekers
- Manage organizers/recruiters
- Manage job listings

---

### Demo Video

https://github.com/user-attachments/assets/37d53d3f-15b3-4b6d-90b0-ea3339affb04

---

## Live Demo

Experience the Live Application

**Frontend (Vercel):**  
https://crm-based-job-portal-management-sys.vercel.app/

**Backend (Render API):**  
https://crm-based-job-portal-management-system.onrender.com

> Note: Backend may take a few seconds to respond initially because it is hosted on Render free tier.

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Sessions
- Cookies

---

## Backend Functionalities

- RESTful API development using Express.js
- Session and cookie-based authentication
- Role-based authorization for Admin, Recruiters, and Job Seekers
- CRUD operations for job postings
- Resume upload and management
- Applicant status management
- MongoDB database integration using Mongoose
- Middleware for authentication and protected routes
- Server-side validation and error handling
- Recruiter applicant management system
- Admin dashboard data management
- API integration between frontend and backend

---

## Installation

### Clone Repository

```bash
git clone https://github.com/SujiPrasanth/CRM-Based-Job-Portal-Management-System.git
```

---

### Install Frontend Dependencies

```bash
cd client
npm install
```

---

### Install Backend Dependencies

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

---

## Run the Project

### Start Backend

```bash
npm run server
```

### Start Frontend

```bash
npm run dev
```

---


## Future Enhancements

- Email notifications
- Real-time chat system
- Interview scheduling
- Advanced analytics dashboard

---

## Author

Suji Prasanth
