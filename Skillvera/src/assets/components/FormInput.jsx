import React from "react";

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
}) {
  return (
    <div className="form-row">
      <label style={{ fontSize: 13, marginBottom: 6 }}>{label}</label>
      <input
        className="input"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
      {error && <small style={{ color: "#c53030" }}>{error}</small>}
    </div>
  );
}
