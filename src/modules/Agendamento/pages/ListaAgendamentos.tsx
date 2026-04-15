import { Container, Typography, Box, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useDataManager } from "../../../hooks/useDataManager";
import { agendamentoTeste } from "../types/agendamento-test";
import { TabelaAgendamentos } from "../components/TabelaAgendamentos";
import { Agendamento } from "../../../types/Agendamento";
import { TipoUsuario } from "../../../types/Usuario";
import { useState } from "react";

export function ListaAgendamentos() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: agendamentos, update } = useDataManager<Agendamento>({
    initialData: agendamentoTeste,
    storageKey: "salao_agendamentos",
  });

  const agendamentosVisiveis = auth.user?.tipo === TipoUsuario.CLIENTE
    ? agendamentos.filter((agendamento) => agendamento.cliente.email === auth.user?.email)
    : agendamentos;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const handleConfirmar = (id: number) => {
    update(id, { status: "CONCLUIDO" });
    setSnackbar({
      open: true,
      message: "Agendamento confirmado com sucesso.",
      severity: "success",
    });
  };

  const handleCancelar = (id: number) => {
    update(id, { status: "CANCELADO" });
    setSnackbar({
      open: true,
      message: "Agendamento cancelado.",
      severity: "info",
    });
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Agendamentos</Typography>
        {(auth.user?.tipo === TipoUsuario.CLIENTE ||
          auth.user?.tipo === TipoUsuario.ADMIN ||
          auth.user?.tipo === TipoUsuario.FUNCIONARIO) && (
          <Button variant="contained" onClick={() => navigate("/agendamentos/novo")}>Novo Agendamento</Button>
        )}
      </Box>
      <TabelaAgendamentos
        agendamentos={agendamentosVisiveis}
        onConfirmar={handleConfirmar}
        onCancelar={handleCancelar}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
