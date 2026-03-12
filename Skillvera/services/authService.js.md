Purpose

Handle all authentication-related API calls such as login, logout, and user session handling.

Functions to Implement
1️⃣ loginUser()

Purpose:
Send login credentials to backend and receive authentication token.

API:

POST /api/auth/login

Request Body:

{
  email: string,
  password: string
}

Expected Response:

{
  token,
  user: {
    name,
    email,
    role
  }
}

After success:

Save token in localStorage

Save role and user info

Return user data to the frontend

2️⃣ logoutUser()

Purpose:
Log the user out.

Behavior:

Remove token from localStorage
Remove user info
Redirect to /login
3️⃣ getCurrentUser()

Purpose:
Retrieve user information from localStorage.

Returns:

{
 name,
 email,
 role
}

Used by:

Navbar
Sidebar
Protected Routes
4️⃣ getToken()

Purpose:
Retrieve stored authentication token.

Used for authenticated API requests.

Returns:

JWT token
Technical Requirements

Developer should use:

fetch OR axios

Every request must include headers:

Authorization: Bearer TOKEN