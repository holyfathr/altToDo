import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Пожалуйста введите данные');
      return;
    }
    try {
      const response = await axios.get('https://6635d4e5415f4e1a5e256e75.mockapi.io/users', {
        params: {
          email,
          password
        }
      });
      if (response.data.length > 0) {
        setError(null);
        const user = response.data[0];
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError('Ошибка входа.');
      }
    } catch (err) {
      setError('Проверьте правильность логина или пароля.');
    }
  };

  return (
    <div className="login">
      <form>
        <h1>Вход</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="login-error">{error}</div>}
        <button type="button" onClick={handleLogin}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
