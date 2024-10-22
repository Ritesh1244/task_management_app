# Task Management Application

## Live Demo
You can access the live application at: [Task Management App Live]([https://task-management-app-4wkt.vercel.app/login](https://task-management-app-ui.vercel.app/login))

### Test Login
If you want to see how my Task Management application works, you can use the following credentials:

- **Email:** `rite2379@gmail.com`
- **Password:** `12345`

---

## Features
- User Authentication (Login/Signup)
- Create, Read, Update, and Delete (CRUD) tasks
- View tasks in a user-friendly interface
- Responsive design for both mobile and desktop devices

---

## Technologies Used

### Frontend:
- React
- Axios (for API calls)
- CSS/SCSS

### Backend:
- Node.js
- Express
- MongoDB (or any database of your choice)
- JWT (for authentication)

---

## Installation Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (or your preferred database)

---

### Setup Steps

### Backend Setup

#### 1. Navigate to the Backend Directory
```bash
cd backend
#### 2. Install Dependencies
-Run the following command to install all necessary dependencies:
npm install
#### 3. Create a .env File
Create a .env file in the backend directory and add the following environment variables:

# .env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000

#### 4. Start the Backend Server
Now, start the backend server by running:
npm start

---

### Setup Steps
### Fromtend

#### 1. Navigate to the Frontend Directory
In another terminal window, navigate to the frontend directory:
cd frontend

#### 2. Install Dependencies
Install the necessary frontend dependencies by running:

bash
Copy code
npm install
#### 3. Start the Frontend Application
Finally, start the frontend by running:
npm run dev 
