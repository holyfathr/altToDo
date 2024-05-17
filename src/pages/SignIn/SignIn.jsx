import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.scss";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Пожалуйста введите данные');
      return;
    }
    if (!isEmailValid(email)) {
      setError('Пожалуйста введите действительный email');
      return;
    }
    try {
      const response = await axios.post('https://6635d4e5415f4e1a5e256e75.mockapi.io/users', {
        email,
        password
      });
      if (response.status === 201) {
        setError(null);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register">
      <form>
        <h1>Регистрация</h1>
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
        {error && <div className="register-error">{error}</div>}
        <button type="button" onClick={handleRegister}>
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default Register;
