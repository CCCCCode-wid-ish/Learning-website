AdminDashboard.jsx
Purpose

Allow Admins to manage Student and Teacher requests.

Admins can:

Approve
Reject

user access requests.

Page Layout
Navbar
Sidebar
Dashboard Content
Main Content

Display user requests table.

Table Columns
Name
Email
Phone
Role (Student / Teacher)
Document
Status
Actions
Document

Provide:

View Document button
Status

Possible values:

PENDING
APPROVED
REJECTED
Actions

Buttons:

Approve
Reject

API calls:

PUT /api/users/approve/:id
PUT /api/users/reject/:id
Data Fetch

When page loads:

GET /api/users
Logic Rules
If Approved → disable actions
If Rejected → disable actions