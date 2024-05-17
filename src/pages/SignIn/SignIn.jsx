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
      const response = await axios.post('https://66478ad02bb946cf2f9e1ac8.mockapi.io/Users', {
        email,
        password
      });
      if (response.status === 200) {
        setError(null);
        
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
    navigate('/dashboard');
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