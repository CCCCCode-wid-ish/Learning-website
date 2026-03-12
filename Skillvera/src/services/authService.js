export const loginUser = async (credentials) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // We pass credentials.email as teachername if needed due to backend model
    body: JSON.stringify({ teachername: credentials.email, password: credentials.password }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  
  // Save to localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("username", data.username);
  if (data.userId) localStorage.setItem("userId", data.userId);

  return {
    token: data.token,
    user: {
      name: data.username,
      email: data.username,
      role: data.role
    }
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return {
    name: localStorage.getItem("username"),
    email: localStorage.getItem("username"), // mapped for consistency
    role: localStorage.getItem("role")
  };
};

export const getToken = () => {
  return localStorage.getItem("token");
};
