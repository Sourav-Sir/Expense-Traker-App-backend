# Expense Tracker App

Expense Tracker is a backend API for an expense-tracking application designed to efficiently manage personal finances. It allows users to log expenses, set monthly budget limits, and analyze overspending effectively.

## Features

- User registration and authentication
- Logging expenses with details like amount, category, and date
- Setting monthly budget limits
- Viewing expense history
- Checking if monthly budget limits are exceeded

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Sourav-Sir/Expense-Traker-App-backend.git
```

2. Install dependencies:
```bash
cd expense-tracker
npm install
```

3. Set up environment variables:
   Create a .env file in the root directory and add the following:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Replace your_mongodb_connection_string with your MongoDB connection string and your_jwt_secret with a secret key for JWT token generation.

## Usage

1. Start the server:
```bash
npm start
node index.js
```

2. Use Postman to test the API endpoints:

## Register a User

- Endpoint: POST `/auth/register`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

## Login

- Endpoint: POST `/auth/login`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

- Response
```json 
{
  "token": "your_access_token",
  "userId": "user_id"
}
```

## Set Monthly Budget Limit

- Endpoint: POST `/budget`
- Request Body:
```json
{
  "month": 3,
  "year": 2024,
  "budgetAmount": 2000
}
```

## Create Expense

- Endpoint: POST `/expenses`
- Request Body:
```json
{
  "amount": 100,
  "category": "Groceries",
  "date": "2024-03-27T12:00:00.000Z"
}
```

##  Get All Expenses

- Endpoint: GET `/expenses`

## Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.

