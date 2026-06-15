# SIM-PROJECT

## Starshiya Inventory Management System (SIM)

A role-based, multi-tenant inventory management system built using Node.js, Express.js, MongoDB, and Vanilla JavaScript. The system allows multiple customers to manage their own inventory independently while enforcing strict access control.

---

## Features

### Authentication

* User Signup
* OTP Verification via Email
* Password Creation
* JWT-based Login Authentication

### User Roles

* Super Admin
* Customer Admin
* Customer User

### User Management

Super Admin can:

* Create Users
* View Users
* Update Users
* Delete Users

### Product Management

Customer Admin can:

* Add Products
* View Products
* Update Products
* Soft Delete Products
* Search Products

Customer User can:

* View Products Only

### Multi-Tenant Architecture

* Each customer's data is isolated using `customerId`.
* Users can access only their own customer's products.

### Dashboard

* Total Products
* Total Stock
* Low Stock Count
* Stats visible only to Customer Admin.

### Additional Features

* SKU Validation
* Low Stock Alerts
* Audit Trail
* Soft Delete
* GitHub Version Control

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt
* OTP Generator
* Nodemailer

---

## Project Structure

SIM-PROJECT

├── backend

│   ├── controllers

│   ├── middleware

│   ├── models

│   ├── routes

│   └── utils

│

└── frontend

```
├── dashboard.html

├── login.html

├── products.html

├── users.html

├── script.js

└── style.css
```

---

## Installation

### Clone Repository

git clone <repository-url>

cd SIM-PROJECT

---

### Backend Setup

cd backend

npm install

npm run dev

---

### Frontend

Open the frontend files using Live Server or any local server.

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

PORT=5000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

---

## User Roles Summary

### Super Admin

* Manage Users
* No Product Access

### Customer Admin

* Manage Products
* View Dashboard Statistics

### Customer User

* View Products Only

---

## Future Enhancements

* Stock In / Stock Out History
* PDF Reports
* Excel Export
* Activity Logs
* Restore Deleted Products
* Notifications
* Advanced Analytics

---

## Version

Phase 2 Completed

Multi-Tenant Inventory Management System with RBAC, Audit Trail, and Soft Delete.
