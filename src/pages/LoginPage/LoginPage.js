import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserService"; // Điều chỉnh đường dẫn tùy theo cấu trúc dự án của bạn

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response === "admin") {
        navigate("/");
      } else if (response === "employee") {
        navigate("/EmployeePage");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      alert("Login failed!");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
