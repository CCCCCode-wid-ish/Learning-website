import React, { useState } from "react";
import useForm from "../hooks/useForm";
import FormInput from "../components/FormInput";

export default function Login() {
  const { form, setField, errors, setErrors } = useForm({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setField(e.target.name, e.target.value);

  const validate = () => {
    const err = {};
    if (!form.email) err.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      err.email = "Invalid email";
    if (!form.password) err.password = "Password required";
    else if (form.password.length < 4) err.password = "Password too short";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.email.includes("admin")) setMessage("Logged in as Admin (demo)");
    else setMessage("Logged in as Student (demo)");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <FormInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@domain.com"
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setMessage("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
