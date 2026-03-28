import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Agendamento } from "../../../types/Agendamento";
import { LinhaAgendamento } from "./LinhaAgendamentos";

type Props = {
  agendamentos: Agendamento[];
};

export function TabelaAgendamentos({ agendamentos }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Serviço</TableCell>
            <TableCell>Horário</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {agendamentos.map((a) => (
            <LinhaAgendamento key={a.id} agendamento={a} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}