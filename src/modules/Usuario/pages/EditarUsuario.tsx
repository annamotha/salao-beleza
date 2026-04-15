import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, MenuItem, Box, Alert, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { usuariosTeste } from "../types/usuarios-test";
import { useDataManager } from "../../../hooks/useDataManager";
import { Usuario, TipoUsuario } from "../../../types/Usuario";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, update } = useDataManager<Usuario>({
    initialData: usuariosTeste,
    storageKey: "salao_usuarios",
  });

  const usuario = id ? getById(Number(id)) : null;

  const [form, setForm] = useState({
    nome: "",
    email: "",
    tipo: TipoUsuario.CLIENTE,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      setForm({
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      });
    }
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const target = e.target as any;
    setForm({ ...form, [target.name]: target.value });
    setError("");
  };

  const validateForm = (): boolean => {
    if (!form.nome.trim()) {
      setError("Nome é obrigatório");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email é obrigatório");
      return false;
    }
    if (!form.email.includes("@")) {
      setError("Email inválido");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !id) return;

    setLoading(true);
    try {
      update(Number(id), {
        nome: form.nome,
        email: form.email,
        tipo: form.tipo,
      });
      navigate(`/usuarios/${id}`);
    } catch (err) {
      setError("Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) {
    return (
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Alert severity="error">Usuário não encontrado</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/usuarios")}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Usuário
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth
          disabled={loading}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          disabled={loading}
          required
        />

        <TextField
          select
          label="Tipo"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          fullWidth
          disabled={loading}
        >
          <MenuItem value={TipoUsuario.CLIENTE}>Cliente</MenuItem>
          <MenuItem value={TipoUsuario.FUNCIONARIO}>Funcionário</MenuItem>
          <MenuItem value={TipoUsuario.ADMIN}>Admin</MenuItem>
        </TextField>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Salvar"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate("/usuarios")}
            disabled={loading}
            fullWidth
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
