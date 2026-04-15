import { Container, Typography, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { TipoUsuario } from "../../../types/Usuario";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarAgendamento() {
  const auth = useAuth();
  const navigate = useNavigate();

  const isClient = auth.user?.tipo === TipoUsuario.CLIENTE;

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Agendamento
      </Typography>

      {isClient ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Clientes não podem editar agendamentos. Se precisar alterar um horário, entre em contato com o salão.
        </Alert>
      ) : (
        <Alert severity="info" sx={{ mb: 2 }}>
          Edição de agendamento disponível para administradores e funcionários.
        </Alert>
      )}

      <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/agendamentos")}>Voltar aos agendamentos</Button>
    </Container>
  );
}
