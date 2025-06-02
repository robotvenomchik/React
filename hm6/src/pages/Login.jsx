import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div>
      <h2>Вхід</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: 300, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Email: <input type="email" required />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Пароль: <input type="password" required />
          </label>
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
} 