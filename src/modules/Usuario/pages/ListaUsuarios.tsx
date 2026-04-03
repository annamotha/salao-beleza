import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TabelaUsuarios } from "../componentes/TabelaUsuarios";
import { usuariosTeste } from "../types/usuarios-test";

export function ListaUsuarios() {
  const navigate = useNavigate();
  const usuarios = usuariosTeste;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Usuários
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/usuarios/novo")}
        sx={{ mb: 2 }}
      >
        Novo Usuário
      </Button>

      <TabelaUsuarios usuarios={usuarios} />
    </Container>
  );
}
