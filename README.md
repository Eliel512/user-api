# User API

This API allows users to register, login, and authenticate using JWTs.

## Requirements

* Node.js v14.20.1 or later
* MongoDB Atlas
* Mongoose

## Installation

1. Clone this repository
2. Install the dependencies

```
npm install
```

## Configuration

1. Create a .env file and add the following environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>
```

2. Start the API

```
npm start
```

## API Documentation

The API is documented using OpenAPI. To view the documentation, open the following URL in your browser:

```
http://localhost:3000/api/docs
```

## Usage

### Registration

To register a new user, send a POST request to the `/api/users/signup` endpoint with the following JSON body:

```
{
  "firstName": "John",
  "lastName": "Doe"
  "email": "johndoe@example.com",
  "password": "password"
}
```

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `firstName`: The user firstname
* `lastName`: The user lastname
* `email`: The user email
* `token`: The JWT token

### Login

To login, send a POST request to the `/api/users/signin` endpoint with the following JSON body:

```
{
  "email": "johndoe@example.com",
  "password": "password"
}
```

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `firstName`: The user firstname
* `lastName`: The user lastname
* `email`: The user email
* `token`: The JWT token

### Authentication

To authenticate a user, send a GET request to the `/api/users` endpoint with the following headers:

* Authorization: Bearer <token>

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `firstName`: The user firstname
* `lastName`: The user lastname
* `email`: The user email
* `token`: The JWT token

### Check

To check if a email exists or a token is still valid, send a POST request to the `/api/users` endpoint with the following body:

* `type`: The type of check. Takes as value either `email` or `token`
* `token!`: If `type == token`, put a `token` key containing the token
* `email!`: If `type == email`, put a `email` key containing the email

The response will be a JSON object with the following properties:

* `found`: A boolean indicating whether the property was found or not

## Example

The following code shows how to register a new user, login, and authenticate a user:

```
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const router = express.Router();

// Register a new user
router.post("/api/users", (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  // Hash the password
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  // Save the user to the database
  const userModel = require("./models/user");
  const newUser = await userModel.create({
    name: user.name,
    email: user.email,
    password: hashedPassword,
  });

  // Create a JWT token
  const token = jwt.sign({
    id: newUser.id,
  }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Return the user and the token
  res.status(201).json({
    user: newUser,
    token: token,
  });
});

// Login a user
router.post("/api/signin", (req, res) => {
  // Find the user by email
  const userModel = require("./models/user");
  const user = await userModel.findOne({
    email: req.body.email,
  });

  // Check the password
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    res.status(401).json({
      error: "Invalid credentials",
    });
    return;
  }

  // Create a JWT token
  const token = jwt.sign({
    id: user.id,
  }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Return the token
