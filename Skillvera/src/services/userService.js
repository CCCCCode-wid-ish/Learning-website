import { getToken } from "./authService";

export const getUserRequests = async () => {
  const token = getToken();
  const response = await fetch("http://localhost:5000/api/users/requests", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to fetch user requests");
  return response.json();
};

export const approveUser = async (id) => {
  const token = getToken();
  const response = await fetch(`http://localhost:5000/api/users/approve/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to approve user request");
  return response.json();
};

export const rejectUser = async (id) => {
  const token = getToken();
  const response = await fetch(`http://localhost:5000/api/users/reject/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to reject user request");
  return response.json();
};
