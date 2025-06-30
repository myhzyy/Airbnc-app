import { useState } from "react";

export default function Login({ className, onSuccess, setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://airbnc-oxkw.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Thanks for signing up!");
        setShowLogin(() => setShowLogin(true));
      } else {
        setMessage(data.msg || "Signup failed");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <h2>Sign Up!</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign me up!</button>
      {message && <p>{message}</p>}
    </form>
  );
}
