import { useParams } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export function DetalheAgendamento() {
  const { id } = useParams();

  return (
    <Container>
      <Typography variant="h4">Detalhe do Agendamento</Typography>

      <Typography>ID: {id}</Typography>

      <Button variant="outlined" component={Link} to="/agendamentos">
        Voltar
      </Button>
    </Container>
  );
}