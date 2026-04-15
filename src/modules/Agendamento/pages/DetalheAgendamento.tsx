import { useParams, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../context/AuthContext";
import { useDataManager } from "../../../hooks/useDataManager";
import { Agendamento } from "../../../types/Agendamento";
import { agendamentoTeste } from "../types/agendamento-test";
import { TipoUsuario } from "../../../types/Usuario";

export function DetalheAgendamento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useAuth();
  const { getById } = useDataManager<Agendamento>({
    initialData: agendamentoTeste,
    storageKey: "salao_agendamentos",
  });

  const agendamento = id ? getById(Number(id)) : null;
  const isClient = auth.user?.tipo === TipoUsuario.CLIENTE;

  if (!agendamento) {
    return (
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Alert severity="error">Agendamento não encontrado</Alert>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/agendamentos")} sx={{ mt: 2 }}>
          Voltar
        </Button>
      </Container>
    );
  }

  if (isClient && agendamento.cliente.email !== auth.user?.email) {
    return (
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Alert severity="warning">Você só pode visualizar seus próprios agendamentos.</Alert>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/agendamentos")} sx={{ mt: 2 }}>
          Meus agendamentos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Detalhe do Agendamento</Typography>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/agendamentos")}>Voltar</Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box>
              <Typography color="textSecondary" gutterBottom>Cliente</Typography>
              <Typography variant="h6">{agendamento.cliente.nome}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Serviço</Typography>
              <Typography variant="h6">{agendamento.servicoProduto.servico.nome}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Produto</Typography>
              <Typography variant="h6">{agendamento.servicoProduto.produto.nome}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Quantidade usada</Typography>
              <Typography variant="h6">{agendamento.servicoProduto.quantidadeUsada}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Data</Typography>
              <Typography variant="h6">{agendamento.horario.data}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Horário</Typography>
              <Typography variant="h6">{agendamento.horario.hora}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Status</Typography>
              <Typography variant="h6">{agendamento.status}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>Funcionário</Typography>
              <Typography variant="h6">{agendamento.horario.funcionario.nome}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
