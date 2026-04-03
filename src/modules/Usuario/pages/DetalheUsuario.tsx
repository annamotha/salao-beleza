import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export function DetalheUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Detalhe do Usuário</Typography>

      <Typography>ID: {id}</Typography>

      <Button onClick={() => navigate("/usuarios")}>
        Voltar
      </Button>
    </Container>
  );
}