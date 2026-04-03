import { useState } from "react";
import { Container, TextField, Button, Typography, MenuItem, Box} from "@mui/material";

export function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "CLIENTE",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    console.log("Usuário criado:", form);
  }

  return (
    <Container>
      <Typography variant="h4">Cadastro de Usuário</Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          label="Senha"
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
        />

        <TextField
          select
          label="Tipo"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
        >
          <MenuItem value="CLIENTE">Cliente</MenuItem>
          <MenuItem value="FUNCIONARIO">Funcionário</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>

        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Container>
  );
}