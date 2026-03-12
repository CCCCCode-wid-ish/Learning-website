Purpose

Handle Student and Teacher request management.

These APIs are used by:

AdminDashboard
Functions to Implement
1️⃣ getUserRequests()

Purpose:
Fetch all pending student/teacher requests.

API:

GET /api/users

Returns:

[
 {
  id,
  name,
  email,
  phone,
  role,
  document,
  status
 }
]

Roles include:

STUDENT
TEACHER
2️⃣ approveUser(userId)

Purpose:
Approve student/teacher request.

API:

PUT /api/users/approve/:id

Behavior:

status → APPROVED
3️⃣ rejectUser(userId)

Purpose:
Reject student/teacher request.

API:

PUT /api/users/reject/:id

Behavior:

status → REJECTED
🧠 API Communication Flow
Frontend Page
      ↓
Service Function
      ↓
Backend API
      ↓
Database
      ↓
Response returned to Page

Example:

SuperAdminDashboard
        ↓
adminService.getAdminRequests()
        ↓
GET /api/admin/requests
        ↓
Backend returns admin data
        ↓
Table displays admin requests