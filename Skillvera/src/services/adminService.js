import { getToken } from "./authService";

export const registerAdmin = async (adminData) => {
  // adminData contains { fullName, email, password, phone, employeeId, department, document }
  const payload = new FormData();
  Object.keys(adminData).forEach(key => {
    payload.append(key, adminData[key]);
  });

  const response = await fetch("http://localhost:5000/api/admin/register", {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to register admin");
  }

  return response.json();
};

export const getAdminRequests = async () => {
  const token = getToken();
  const response = await fetch("http://localhost:5000/api/admin/requests", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to fetch admin requests");
  
  return response.json();
};

export const approveAdmin = async (id) => {
  const token = getToken();
  const response = await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to approve admin request");
  return response.json();
};

export const rejectAdmin = async (id) => {
  const token = getToken();
  const response = await fetch(`http://localhost:5000/api/admin/reject/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to reject admin request");
  return response.json();
};
