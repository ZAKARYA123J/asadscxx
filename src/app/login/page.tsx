"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, CircularProgress, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'xs',
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://immoceanrepo.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { token } = data;

      setCookie('token', token, { path: '/' });
      router.push('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your email and password and try again.');
      console.error('Login failed:', error);
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <CardContent>
          <Box component="form" onSubmit={handleLogin}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
             Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
