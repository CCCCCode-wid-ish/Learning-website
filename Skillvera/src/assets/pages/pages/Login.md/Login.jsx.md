Login.jsx
Purpose

Provide a login page for all roles:

Super Admin

Admin

The system should redirect users to their respective dashboard based on role.

UI Elements

The login page must contain:

Email input
Password input
Login button

Optional:

Forgot Password link
Admin Register link
Layout
---------------------------
|        LOGIN            |
|                         |
| Email                   |
| [__________]            |
|                         |
| Password                |
| [__________]            |
|                         |
|     Login Button        |
---------------------------
Functional Logic

When user clicks Login:

Validate email and password

Send request to backend

Example API:

POST /api/auth/login
Backend Response

The response should return:

token
user role
user name
After Login

Redirect based on role:

SUPER_ADMIN → /superadmin-dashboard
ADMIN → /admin-dashboard

Store in localStorage:

token
role
user info
Technical Requirements

Developer must use:

React useState
React Router
AuthContext
authService.js