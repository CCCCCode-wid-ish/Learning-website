Purpose

Reusable component to display data in tabular format.

It will be used for:

Admin requests
Student requests
Teacher requests
Functional Requirements

The table must display dynamic data.

Columns example:

Name
Email
Phone
Role
Department
Document
Status
Actions
Document Column

Document should have a view/download button.

Example:

View Document
Status Column

Possible values:

PENDING
APPROVED
REJECTED

Color codes:

Pending → Orange
Approved → Green
Rejected → Red
Actions Column

Include two buttons:

Approve
Reject

These buttons should call functions passed as props.

Props Required

The table should accept:

data
columns
onApprove
onReject
Component Structure
Create Table component

Receive props

Render table
    Table header
    Table body
        Loop through rows

Show buttons in action column

Export component