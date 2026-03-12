Purpose

Handle Admin-related operations such as registration and approval.

These APIs are mainly used by:

AdminRegister Page
SuperAdminDashboard
Functions to Implement
1️⃣ registerAdmin()

Purpose:
Submit new admin registration request.

API:

POST /api/admin/register

Request Body:

{
 name,
 email,
 password,
 phone,
 employeeId,
 department,
 document
}

Important:

document = uploaded file
status = PENDING
2️⃣ getAdminRequests()

Purpose:
Fetch all admin registration requests.

API:

GET /api/admin/requests

Returns:

[
 {
  id,
  name,
  email,
  phone,
  employeeId,
  department,
  document,
  status
 }
]

Used in:

SuperAdminDashboard
3️⃣ approveAdmin(adminId)

Purpose:
Approve admin registration request.

API:

PUT /api/admin/approve/:id

Behavior:

status → APPROVED
4️⃣ rejectAdmin(adminId)

Purpose:
Reject admin registration request.

API:

PUT /api/admin/reject/:id

Behavior:

status → REJECTED