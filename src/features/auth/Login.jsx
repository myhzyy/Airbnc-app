import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ className, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${data.user.email}`);
        setUser(data.user);
        navigate("/");
      } else {
        setMessage(data.msg || "Login failed");
      }
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="login-loading">
        <div className="spinner"></div>
        <p>Signing you in...</p>
      </div>
    );
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

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
      <button type="submit">Log in</button>
      {message && <p>{message}</p>}
    </form>
  );
}
