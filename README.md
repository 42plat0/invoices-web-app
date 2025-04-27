# Invoice Management System

This project is a full-stack invoice management system that allows users to create, read, update, and delete invoices. It includes authentication, role-based access control, and various features to manage invoices efficiently.

---

## Usage

1. **Register**:
   - Create a new user account or use existing one
   - Admin account: `admin:admin`
2. **Login**:
   - Log in to access the invoice management system.
3. **Manage Invoices**:
   - Create, edit, delete, and filter invoices based on your role.
4. **Admin Features**:
   - Admins can view and manage all users' invoices.

---

## Features

### **Authentication & Authorization**
1. **User Registration & Login**:
   - Secure authentication system with JWT-based token management.
   - Users can register and log in to access the system.

2. **Role-Based Access Control**:
   - **User**: Can manage only their own invoices.
   - **Admin**: Can view and manage all users' invoices.

3. **Logged-In User Information**:
   - The logged-in user's information is displayed on the left side of the screen.

---

### **Invoice CRUD Functionality**
1. **CRUD Operations**:
   - Users can create, read, update/edit, and delete invoices.
   - Update/edit and delete buttons are available for each invoice.

2. **Invoice Details**:
   - Each invoice includes:
     - **ID**
     - **Client Name**
     - **Amount**
     - **Due Date**
     - **Status** (draft, pending, paid)
     - **Owner** (user ID)

---

### **Validations**
1. **Frontend Validations**:
   - Required fields are validated.
   - Correct formats are enforced (e.g., amount must be numeric).

2. **Backend Validations**:
   - Additional validation is performed on the server to ensure data integrity.

---

### **Invoice Status**
1. **Default Status**:
   - New invoices default to "Draft."

2. **Status Updates**:
   - Users can change the status to "Pending" or "Paid."

3. **Status Indicators**:
   - Colored indicators are displayed for each status:
     - **Draft**: Gray
     - **Pending**: Orange
     - **Paid**: Green

---

### **Filtering & Sorting**
1. **Filtering**:
   - Users can filter invoices by status: draft, pending, or paid.

2. **Sorting** (Optional):
   - Sorting by due date, creation date, or amount can be added as an enhancement.

---

## Tech Stack

### **Frontend**
- **React**: For building the user interface.
- **React Router**: For routing and navigation.
- **React Hook Form**: For form handling and validation.
- **Tailwind CSS**: For styling.

### **Backend**
- **Node.js**: For building the server-side application.
- **Express.js**: For creating RESTful APIs.
- **PostgreSQL**: For database management.
- **JWT**: For authentication and authorization.

### **Other Tools**
- **Axios**: For making HTTP requests.
- **Bcrypt.js**: For password hashing.
- **Express Validator**: For backend validation.

---

## Installation & Setup

### **Backend**
1. Clone the repository and navigate to the `back` directory:
   ```bash
   cd back
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and configure the environment variables.
4. Start the backend server:
   ```bash
   npm start
   ```

### **Frontend**
1. Navigate to the `front` directory:
   ```bash
   cd front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and configure the environment variables.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
---

## Future Enhancements
`fullbacklogoftasks.txt`

---
