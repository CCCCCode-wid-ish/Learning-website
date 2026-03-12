Purpose

Allow Super Admin to manage Admin registration requests.

Page Layout
Navbar
Sidebar
Main Dashboard Area
Main Feature

Display a table of Admin registration requests.

Use the reusable Table component.

Table Columns
Name
Email
Phone
Employee ID
Department
Document
Status
Actions
Document Column

Must include a View Document button.

Example:

View / Download
Status Values
PENDING
APPROVED
REJECTED
Actions

For each row:

Approve button
Reject button

When clicked:

PUT /api/admin/approve/:id
PUT /api/admin/reject/:id
Functional Behavior

When page loads:

Fetch all admin requests

API:

GET /api/admin/requests
Display Rules

If status is:

APPROVED → disable buttons
REJECTED → disable buttons