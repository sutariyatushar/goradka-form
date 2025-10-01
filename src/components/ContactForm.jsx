import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://goradka-backend.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned non-JSON response");
      }

      if (!res.ok) throw new Error(data?.error || "Server error");

      alert("Data submitted successfully ✅");
      setForm({ firstName: "", middleName: "", surname: "", phone: "" });

    } catch (err) {
      alert("Error: " + err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Goradka</p>
      <p className="message">
        Submit Your Details <br />
        Please fill out this form to add your contact information to the Goradka Village website.
      </p>

      <div className="flex">
        <label>
          <input
            className="input"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <span>First Name</span>
        </label>

        <label>
          <input
            className="input"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
            placeholder=" "
          />
          <span>Middle Name</span>
        </label>
      </div>

      <label>
        <input
          className="input"
          name="surname"
          value={form.surname}
          onChange={handleChange}
          placeholder=" "
          required
        />
        <span>Surname</span>
      </label>

      <label>
        <input
          className="input"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder=" "
          required
          pattern="^[0-9]{10,15}$"
        />
        <span>Mobile Number</span>
      </label>

      <button className="submit" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
