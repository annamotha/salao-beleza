import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { useDataManager } from "../hooks/useDataManager";
import { useAuth } from "../context/AuthContext";
import { Usuario, TipoUsuario } from "../types/Usuario";
import { usuariosTeste } from "../modules/Usuario/types/usuarios-test";

export function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  const { data: usuarios, add } = useDataManager<Usuario>({
    initialData: usuariosTeste,
    storageKey: "salao_usuarios",
  });

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = (): boolean => {
    if (!form.nome.trim()) {
      setError("Nome é obrigatório.");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email é obrigatório.");
      return false;
    }
    if (!form.email.includes("@")) {
      setError("Email inválido.");
      return false;
    }
    if (usuarios.some((usuario) => usuario.email === form.email.trim())) {
      setError("Já existe um usuário cadastrado com este email.");
      return false;
    }
    if (!form.senha.trim()) {
      setError("Senha é obrigatória.");
      return false;
    }
    if (form.senha.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    add({
      nome: form.nome.trim(),
      email: form.email.trim(),
      senha: form.senha.trim(),
      tipo: TipoUsuario.CLIENTE,
    });

    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Cliente
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cadastre-se para agendar serviços no salão.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Senha"
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          fullWidth
          helperText="Mínimo 6 caracteres"
          required
        />
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}
