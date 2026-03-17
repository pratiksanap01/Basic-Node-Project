# Basic-Node-Project
# 📦 User Management REST API

A simple REST API built using **Node.js** and **Express.js** to perform CRUD operations on user data stored in a JSON file.

---

## 🚀 Features

* Get all users
* Get user by ID
* Create new user
* Update existing user
* Delete user
* Data stored in `MOCK_DATA.json`

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* File System (`fs` module)

---

## 📂 Project Structure

```
Node Project 1/
│
├── MOCK_DATA.json   # Stores user data
├── index.js         # Main server file
├── package.json
```

---

## ⚙️ Installation

1. Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
```

2. Navigate to project folder

```
cd your-repo-name
```

3. Install dependencies

```
npm install
```

4. Start the server

```
npm run start
```

---

## 🌐 Server

```
http://localhost:3000
```

---

## 📌 API Endpoints

### 1️⃣ Get All Users

```
GET /api/users
```

---

### 2️⃣ Get User by ID

```
GET /api/users/:id
```

Example:

```
GET /api/users/1
```

---

### 3️⃣ Create User

```
POST /api/users
```

Body (JSON):

```json
{
  "first_name": "Pratik",
  "last_name": "Sanap",
  "email": "pratik@gmail.com",
  "gender": "Male"
}
```

---

### 4️⃣ Update User

```
PUT /api/users/:id
```

Example:

```
PUT /api/users/1
```

Body:

```json
{
  "first_name": "Updated Name"
}
```

---

### 5️⃣ Delete User

```
DELETE /api/users/:id
```

Example:

```
DELETE /api/users/1
```

---

## ⚠️ Important Notes

* Data is stored in a JSON file (not a database)
* Server restart may reset in-memory changes
* IDs are auto-generated

---

## 👨‍💻 Author

**Pratik Sanap**

---
