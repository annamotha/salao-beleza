import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [auth.isAuthenticated, from, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !senha.trim()) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    const success = auth.login(email, senha);
    if (!success) {
      setError("Email ou senha incorretos.");
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography variant="body1" gutterBottom>
        Use um dos tipos: Admin, Funcionário ou Cliente.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type="email"
        />
        <TextField
          label="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          fullWidth
          type="password"
        />
        <Button type="submit" variant="contained">
          Entrar
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
        <Typography variant="body2">Ainda não tem conta?</Typography>
        <Button variant="text" onClick={() => navigate("/cadastro")}>Cadastre-se</Button>
      </Box>
    </Container>
  );
}
