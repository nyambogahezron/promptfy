# Promptfy API

A RESTful API for Promptfy application with comprehensive user authentication including register, login, email verification, forgot password, and reset password functionality.

## Features

- User registration with email verification
- User login with JWT authentication
- Password reset functionality
- Role-based access control (User/Admin)
- MongoDB database integration
- AI-powered prompt generation using Gemini AI
- Customizable prompt templates
- Prompt enhancement and analysis

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   bun install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/promptfy
   JWT_SECRET=your_jwt_secret_key
   JWT_LIFETIME=1d
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_password
   EMAIL_FROM=noreply@promptfy.com
   FRONTEND_URL=http://localhost:3000
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Seed an admin user:

   ```bash
   npm run seed:admin
   ```

   or

   ```bash
   bun run seed:admin
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   bun run dev
   ```

### API Endpoints

#### Authentication

- **POST /api/v1/auth/register** - Register a new user
- **POST /api/v1/auth/verify-email** - Verify user email
- **POST /api/v1/auth/login** - Login with email and password
- **POST /api/v1/auth/forgot-password** - Request password reset
- **POST /api/v1/auth/reset-password** - Reset password with token
- **GET /api/v1/auth/me** - Get current user details (requires authentication)

#### Prompt Generation

- **GET /api/v1/prompts/templates** - Get all prompt templates
- **GET /api/v1/prompts/templates/:id** - Get prompt template by ID
- **POST /api/v1/prompts/templates** - Create a new prompt template
- **PATCH /api/v1/prompts/templates/:id** - Update a prompt template
- **DELETE /api/v1/prompts/templates/:id** - Delete a prompt template
- **POST /api/v1/prompts/generate** - Generate a prompt based on template and user instructions
- **GET /api/v1/prompts/user** - Get all prompts created by the user
- **GET /api/v1/prompts/:id** - Get a specific prompt by ID
- **PATCH /api/v1/prompts/:id** - Update a prompt
- **POST /api/v1/prompts/:id/enhance** - Enhance an existing prompt
- **GET /api/v1/prompts/:id/analyze** - Analyze a prompt for effectiveness
- **DELETE /api/v1/prompts/:id** - Delete a prompt

## License

ISC
