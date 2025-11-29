# ⭐ PROU_ASSIGNMEBT – Full Stack Task Manager System

A complete task management system featuring:  
👤 User login & signup  
👑 Admin mode with extra privileges  
📝 Task creation, editing & deleting  
📊 Dashboard with completion statistics  
📂 Admin panel to view/delete users  
🔐 Secure JWT + Refresh Token authentication  
🌙 Modern dark-theme UI (React + ShadCN)

---

## 📹 Project Demo (Screenshots / Video)

🎬 _Add video link here_

https://drive.google.com/file/d/1S4oueIa6EWsqEv5FJeYl-Ng6B_9EHayd/view?usp=sharing

##ADMIN PANNEL
<img width="1919" height="758" alt="image" src="https://github.com/user-attachments/assets/b84b7b63-6d74-4f38-bcb8-d0d4dd7ea53c" />
<img width="1919" height="720" alt="image" src="https://github.com/user-attachments/assets/b0ab038d-5b77-403b-8ecc-d5de4b0dc219" />

##USER_PANNEL
<img width="1918" height="729" alt="image" src="https://github.com/user-attachments/assets/23f1f914-8a51-4d8d-b352-7f875b607d83" />
<img width="1918" height="654" alt="image" src="https://github.com/user-attachments/assets/05f7209b-78dd-4007-ad2d-c21036744bae" />

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite)  
- ShadCN UI  
- Tailwind CSS  
- Lucide Icons  
- JWT authentication  
- REST API

### **Backend**
- Spring Boot 3  
- Spring MVC  
- Spring Data JPA  
- MySQL  
- JWT (Access + Refresh)  
- Lombok  
- Maven

### **Database**
- MySQL (Tables: `user`, `task`)

---

## 🏗️ System Architecture

```
PROU_ASSIGNMEBT
│
├── FRONTEND (React + Vite)
│   ├── Login / Signup
│   ├── Dashboard
│   ├── Task CRUD
│   ├── Admin Panel
│   └── Token Refresh Logic
│
└── BACKEND (Spring Boot)
    ├── Controllers
    │   ├── /oauth        → Login & Signup
    │   ├── /api/v1/users → User management
    │   ├── /api/v1/task  → Task CRUD
    │   └── /api/v1/work  → Fetch tasks
    ├── Services
    ├── Repositories
    ├── JWT Token Manager
    └── MySQL Database
```

---

## 📦 Project Structure

```
PROU_ASSIGNMEBT
├── BACKEND/
│   ├── src/main/java
│   ├── pom.xml
│   └── application.properties
│
└── FRONTEND/
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 🔧 Setup & Run Instructions

### ⚙️ Backend Setup (Spring Boot)

**1. Create database**
```
CREATE DATABASE prou_assignment;
```

**2. Configure application.properties**
```
spring.datasource.url=jdbc:mysql://localhost:3306/prou_assignment
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**3. Run backend**
```
mvn spring-boot:run
```

Backend runs at → **http://localhost:8083**

---

### 🎨 Frontend Setup (React)

**1. Install dependencies**
```
npm install
```

**2. Configure API URL**  
File: `src/UTILS/config.js`
```
const BASE_URL = "http://localhost:8083";
export default BASE_URL;
```

**3. Run frontend**
```
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

## 📡 API Documentation

### 🔐 Authentication API

#### **POST /oauth/register**
```json
{ "username": "user1", "email": "abc@gmail.com", "password": "123", "admin": true }
```

#### **POST /oauth/login**
_returns access + refresh token_
```json
{ "token": "...", "refreshtoken": "...", "username": "user1", "admin": true }
```

---

### 👥 Users API

#### **GET /oauth/users/allusers**
Returns:
- id  
- username  
- email  
- date  
- times  
- admin (true/false)

#### **DELETE /oauth/users/delete/{id}**
Deletes:
- user  
- all tasks assigned to that user  

---

### 📝 Task API

#### **GET /api/v1/work/totaltasks**
Returns all tasks.

#### **POST /api/v1/task/addtask**
```json
{ "title": "read docs", "user": "user3", "status": "TO_DO" }
```

#### **PUT /api/v1/task/updatetask/{id}**
```json
{ "title": "updated task", "user": "user1", "status": "COMPLETED" }
```

#### **DELETE /api/v1/task/deletetask/{id}**
Deletes a specific task.

_Task format:_  
`id`, `title`, `user`, `status (TO_DO | IN_PROGRESS | COMPLETED)`, `date`

---

## 🎯 Features

### **ADMIN**
✔ View all users  
✔ Delete users  
✔ Add tasks for any user  
✔ Edit/delete any task  
✔ Access admin panel  

### **USER**
✔ Add tasks for themselves  
✔ Edit only their tasks  
✔ Dark UI mode  
✔ Filter tasks by user/status  

---

## 📉 Dashboard Metrics
- Total tasks  
- Completed tasks  
- Completion rate (%)  
- Filters for status + user  

---

## 📂 Admin Panel
Displays:  
- Username  
- Email  
- Date  
- Times  
- Admin (true/false)  
- Delete button  

---

## ⚠️ Assumptions
- Only admin can delete users  
- Users cannot modify others’ tasks  
- JWT stored in localStorage  
- Auto token refresh implemented  

---

## 🚫 Limitations
- No pagination  
- No user update API  
- No global logout  
- No email verification  

---

## 📍 Future Enhancements
- Change password  
- Promote user to admin  
- Task search  
- Pagination  
- Improved UI for errors  

---

## 🏁 Conclusion
A complete full-stack task manager system featuring:  
✔ Secure login/signup  
✔ Task operations (CRUD)  
✔ Admin-level user management  
✔ Analytics dashboard  
✔ Clean UI with dark mode



