import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";
import { StyledContainer, StyledForm, StyledTitle, StyledTextField, StyledButton } from '../Login/Login.styled';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
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
    <StyledContainer maxWidth="sm">
      <StyledForm>
        <StyledTitle component="h1">
          Register
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
          onClick={handleRegister}
        >
          Register
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
