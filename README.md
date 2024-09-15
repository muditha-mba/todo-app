# User Manual

## Overview

This application is a to-do list manager that supports multiple users. Each user can create an account, log in, and manage their own tasks. The application ensures that all tasks are saved and accessible only to the respective user.

## Features

- **Multi-User Support:** Each user can create a unique account and manage their own tasks.
- **Account Creation:** Users can sign up with their email address and password.
- **User Authentication:** Secure login with encrypted passwords ensures that each user's data is protected.
- **To-Do Management:** Add, edit, and delete to-do items. Tasks are saved and accessible only to the logged-in user.
- **Task Status:** Mark tasks as complete or incomplete.
- **Separate Views:** Toggle between incomplete and completed tasks.

## Getting Started

### 1. Account Creation

- Navigate to the registration page.
- Enter your name, email address and choose a secure password.
- Click the "Register" button to create your account.
- Verify your email address if required to activate your account.

### 2. Logging In

- Go to the login page.
- Enter your registered email address and password.
- Click the "Login" button to access your account.
- Upon successful login, you will be directed to your personalized task management page.

### 3. Adding To-Do Items

- On your task management page, enter a title and description for your new task in the provided input fields.
- Click the "Add" button to create the task.
- Your new task will be saved and displayed in your task list.

### 4. Editing To-Do Items

- Click the "Edit" button next to the task you wish to modify.
- Update the title and description as needed in the edit window.
- Click the "Update" button to save the changes.
- To cancel editing, click the "Close" button to return to the task list without saving changes.

### 5. Deleting To-Do Items

- Click the "Delete" button next to the task you want to remove from your list.
- Confirm the deletion if prompted to permanently remove the task.

### 6. Marking Tasks as Complete/Incomplete

- Click the "Complete" button next to a task to mark it as completed.
- To revert a task to incomplete, click the "Incomplete" button while viewing completed tasks.

### 7. Viewing Tasks

- Use the "Todo" and "Completed" buttons at the top of the page to switch between viewing your incomplete and completed tasks.

## Technologies Used

### Frontend

- **React:** Used for building the user interface.
- **React Router DOM:** Used for handling navigation within the application.
- **Redux Toolkit & React Redux:** Used for managing the application state and handling actions.
- **Framer Motion:** Used for animations and transitions.
- **Node Sass:** Used for styling with SCSS.
- **Vite:** Used as the build tool for development and production.

### Utilities

- **Crypto-JS:** Used for encrypting passwords and securing user data.

## Contact Support

For assistance with any issues or questions, please contact me at [mba.muditha26@gmail.com](mba.muditha26@gmail.com)
