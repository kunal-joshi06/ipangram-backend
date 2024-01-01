## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Frontend](#frontend)
- [Backend](#backend)

## About
This is a test assigment for IPangram for the role of MERN developer by Kunal Joshi (kunaljoshi0603@gmail.com)

## Features
- Signup-Login Functionality.
- Login state persisted.
- Pagination managed from backend via API`s.
- Sorting also managed from backend via API`s.
- Component based architecture

## Tech Stack
List the technologies you used in your project.
- Frontend: React+Vite, Redux Toolkit for State Management, Axios for API calls.
- Backend: Node.js, Express.js.
- Database: MongoDB, Mongoose



## Installation
**I have also provided .env files in the repo for easier cloning and running of assignment. **
Clone the repo from the links provided in the assignment. 
-install node modules using npm i command in the vscode terminal.
-run the backend using npm run dev, then run frontend using npm run dev.

## Usage
Sample Admin Id(Manager, has admin rights) : {email: admin@gmail.com, password: Hello12345}
Sample Employee Id(doesn't have admin rights) : {email: testuser@gmail.com, password: Hello12345}


## Frontend
Frontend of the app mainly uses Tailwind CSS for UI development, All the UI has been made using tailwind css. 
For state management Redux Toolkit has been used. Global State Management has been performed.
API calling has been achieved via axios and AsyncThunk.


## Backend
Backend is mainly written in Node.js and Express.js.
For Login-Signup functionality: jwt(JSONWebToken) and bcryptjs has been used for login token management.
Pagination and filtering has been achieved by node.js and mongoose functions.