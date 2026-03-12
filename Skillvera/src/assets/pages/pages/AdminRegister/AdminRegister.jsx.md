Purpose

Allow new Admins to submit a registration request.

The request will be reviewed by the Super Admin.

Form Fields

The form must include:

Full Name
Email
Password
Phone Number
Employee ID
Department
Document Upload
Submit Button
Document Upload Rules

Allowed formats:

PDF
DOC
DOCX
JPG
PNG

Maximum file size:

5MB
Registration Flow

1️⃣ Admin fills form
2️⃣ Uploads verification document
3️⃣ Clicks Submit

API request:

POST /api/admin/register
Backend Behavior

The backend should save:

status = PENDING

Super Admin must approve it later.

Validation Rules

Before submission check:

Email format
Phone number length
Password strength
File size limit