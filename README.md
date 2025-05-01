# Task Calendar Backend

A lightweight backend for managing tasks in a calendar using **Node.js**, **Express**, and **SQLite**. Supports full **CRUD operations** and serves a RESTful API on **port 3001**.


##  Features

-  Express.js server
-  SQLite for local persistent storage
-  Create, Read, Update, Delete tasks
-  REST API for integration with any frontend (e.g., Volt UI, React, etc.)

##  Tech Stack

- Node.js
- Express.js
- SQLite3
- CORS


##  File Structure
backend/ ├── db.js - Database connection and table setup
         ├── server.js - Express app with API endpoints   
         ├── tasks.db - Auto-generated SQLite database file 
         └── .gitignore
