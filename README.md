# zuber



## Features

- **User Registration**: Register a new user with email, password, and full name.
- **User Login**: Authenticate an existing user and generate a JWT token.
- **User Profile**: Fetch the authenticated user's profile.
- **User Logout**: Log out a user and blacklist their token.
- **Validation**: Input validation using `express-validator`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_uri
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### 1. **Register a User**
   - **Endpoint**: `POST /register`
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "fullname": {
         "firstname": "John",
         "lastname": "Doe"
       },
       "password": "password123"
     }
     ```
   - **Response**:
     - `201 Created`: Returns the created user and token.
     - `400 Bad Request`: Validation errors or duplicate email.

### 2. **Login a User**
   - **Endpoint**: `POST /login`
   - **Description**: Logs in an existing user.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     - `200 OK`: Returns the user and token.
     - `401 Unauthorized`: Invalid email or password.

### 3. **Get User Profile**
   - **Endpoint**: `GET /profile`
   - **Description**: Fetches the authenticated user's profile.
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer <your-token>"
     }
     ```
   - **Response**:
     - `200 OK`: Returns the user profile.
     - `401 Unauthorized`: Token missing, blacklisted, or invalid.

### 4. **Logout a User**
   - **Endpoint**: `GET /logout`
   - **Description**: Logs out the user by blacklisting their token.
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer <your-token>"
     }
     ```
   - **Response**:
     - `200 OK`: Confirmation of logout.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: Database
- **JWT**: Authentication tokens
- **express-validator**: Input validation
- **bcrypt**: Password hashing

## Running Tests

1. Install `jest` and `supertest` for testing:
   ```bash
   npm install --save-dev jest supertest
   ```

2. Run the tests:
   ```bash
   npm test
   ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

---

For any questions or issues, feel free to open an issue on GitHub or contact the repository owner.

