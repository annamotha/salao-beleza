import { TabelaAgendamentos } from "../components/TabelaAgendamentos";
import { Container, Typography } from "@mui/material";
import { agendamentoTeste } from "../types/agendamento-test";

export function ListaAgendamentos() {
  const agendamentos = agendamentoTeste;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agendamentos
      </Typography>

      <TabelaAgendamentos agendamentos={agendamentos} />
    </Container>
  );
}