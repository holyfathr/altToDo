import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";
import { StyledContainer, StyledForm, StyledTitle, StyledTextField, StyledButton } from './Login.styled';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://66478ad02bb946cf2f9e1ac8.mockapi.io/Users', {
        params: {
          email,
          password
        }
      });
      if (response.status === 200) {
        setError(null);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledForm>
        <StyledTitle component="h1">
          Login
        </StyledTitle>
        <StyledTextField
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <StyledButton
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
