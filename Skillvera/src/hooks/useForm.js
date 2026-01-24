import { useState } from "react";

// small reusable form hook using object state
export default function useForm(initial) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const reset = () => setForm(initial);

  return { form, setField, setForm, errors, setErrors, reset };
}
