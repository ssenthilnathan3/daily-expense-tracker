# Daily Expenses Sharing Application Backend

## Overview

This backend service handles user and expense management for a daily expenses sharing application. The application allows users to add expenses and split them based on three different methods: exact amounts, percentages, and equal splits. Additionally, the application manages user details, validates inputs, and generates downloadable balance sheets.

## Features

- **User Management**
  - Create user
  - Retrieve user details

- **Expense Management**
  - Add expense
  - Retrieve individual user expenses
  - Retrieve overall expenses
  - Download balance sheet

## Requirements

- Node.js
- MongoDB

## Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/daily-expenses-sharing-app.git
cd daily-expenses-sharing-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expenses_db
JWT_SECRET=your_jwt_secret
```

4. **Start the server**

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### User Endpoints

- **Create User**

  - **Endpoint:** `/api/users`
  - **Method:** `POST`
  - **Request Body:**

    ```json
    {
      "name": "Test User",
      "email": "test@example.com",
      "mobile": "1234567890",
      "password": "password"
    }
    ```

  - **Response:**

    ```json
    {
      "_id": "60c72b2f9b1d8c1f8c4d8e0f",
      "name": "Test User",
      "email": "test@example.com",
      "mobile": "1234567890",
      "password": "$2b$10$..."
    }
    ```

- **Retrieve User Details**

  - **Endpoint:** `/api/users/:id`
  - **Method:** `GET`
  - **Headers:**
    ```http
    Authorization: Bearer <your_jwt_token>
    ```

  - **Response:**

    ```json
    {
      "_id": "60c72b2f9b1d8c1f8c4d8e0f",
      "name": "Test User",
      "email": "test@example.com",
      "mobile": "1234567890"
    }
    ```

### Expense Endpoints

- **Add Expense**

  - **Endpoint:** `/api/expenses`
  - **Method:** `POST`
  - **Headers:**
    ```http
    Authorization: Bearer <your_jwt_token>
    ```
  - **Request Body:**

    ```json
    {
      "description": "Lunch",
      "amount": 1000,
      "paidBy": "user1@example.com",
      "splitMethod": "equal",
      "splits": [
        { "user": "user1@example.com", "amount": 1000 },
        { "user": "user2@example.com", "amount": 1000 },
        { "user": "user3@example.com", "amount": 1000 }
      ]
    }
    ```

  - **Response:**

    ```json
    {
      "_id": "60c72b2f9b1d8c1f8c4d8e0f",
      "description": "Lunch",
      "amount": 1000,
      "paidBy": "user1@example.com",
      "splitMethod": "equal",
      "splits": [
        { "user": "user1@example.com", "amount": 1000 },
        { "user": "user2@example.com", "amount": 1000 },
        { "user": "user3@example.com", "amount": 1000 }
      ]
    }
    ```

- **Retrieve Individual User Expenses**

  - **Endpoint:** `/api/expenses/user/:userId`
  - **Method:** `GET`
  - **Headers:**
    ```http
    Authorization: Bearer <your_jwt_token>
    ```

  - **Response:**

    ```json
    [
      {
        "_id": "60c72b2f9b1d8c1f8c4d8e0f",
        "description": "Lunch",
        "amount": 1000,
        "paidBy": "user1@example.com",
        "splitMethod": "equal",
        "splits": [
          { "user": "user1@example.com", "amount": 1000 },
          { "user": "user2@example.com", "amount": 1000 },
          { "user": "user3@example.com", "amount": 1000 }
        ]
      }
    ]
    ```

- **Retrieve Overall Expenses**

  - **Endpoint:** `/api/expenses`
  - **Method:** `GET`
  - **Headers:**
    ```http
    Authorization: Bearer <your_jwt_token>
    ```

  - **Response:**

    ```json
    [
      {
        "_id": "60c72b2f9b1d8c1f8c4d8e0f",
        "description": "Lunch",
        "amount": 1000,
        "paidBy": "user1@example.com",
        "splitMethod": "equal",
        "splits": [
          { "user": "user1@example.com", "amount": 1000 },
          { "user": "user2@example.com", "amount": 1000 },
          { "user": "user3@example.com", "amount": 1000 }
        ]
      }
    ]
    ```

- **Download Balance Sheet**

  - **Endpoint:** `/api/expenses/balance-sheet`
  - **Method:** `GET`
  - **Headers:**
    ```http
    Authorization: Bearer <your_jwt_token>
    ```

  - **Response:** A downloadable file containing the balance sheet details.
