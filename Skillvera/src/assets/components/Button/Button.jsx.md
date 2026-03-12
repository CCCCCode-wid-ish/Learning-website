Purpose

Reusable button component for the entire application.

Used for:

Approve
Reject
Submit
Upload
Logout
Functional Requirements

The button should support different types.

Types include:

primary
approve
reject
secondary
Props

The component must accept:

label
type
onClick
disabled

Example:

<Button
label="Approve"
type="approve"
onClick={handleApprove}
/>
Behavior

Buttons should trigger the function passed in onClick.

Example:

Approve → approve request
Reject → reject request
Submit → submit form
Component Structure
Import React
Import CSS

Create Button component

Receive props

Render button element

Apply class based on type

Export component