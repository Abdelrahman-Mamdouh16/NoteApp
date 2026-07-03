📝 Note App API

A RESTful API for managing personal notes with secure user authentication using JWT. Users can register, log in, and perform CRUD operations on their own notes.

🚀 Features
User Registration
User Login with JWT Authentication
Protected Routes
Create Note
Get All Notes
Get Note By ID
Update Note
Delete Note
Get Logged-in User Notes
MongoDB Database Integration
Error Handling Middleware
Authentication Middleware
Password Hashing
Mongoose Population
🛠️ Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT (jsonwebtoken)
bcrypt
dotenv
CORS
📁 Project Structure
├── DB
│   ├── connection.js
│   └── modules
│       ├── user.module.js
│       └── note.module.js
│
├── src
│   ├── middlewares
│   │   └── auth.middleware.js
│   │
│   ├── modules
│   │   ├── auth
│   │   └── note
│   │
│   └── utils
│       └── asyncHandler.js
│
├── .env
├── index.js
├── package.json
└── README.md
