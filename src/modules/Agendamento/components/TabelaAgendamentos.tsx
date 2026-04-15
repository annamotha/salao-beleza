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
  onConfirmar?: (id: number) => void;
  onCancelar?: (id: number) => void;
};

export function TabelaAgendamentos({ agendamentos, onConfirmar, onCancelar }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Serviço</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Qtd</TableCell>
            <TableCell>Horário</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {agendamentos.map((a) => (
            <LinhaAgendamento
              key={a.id}
              agendamento={a}
              onConfirmar={onConfirmar}
              onCancelar={onCancelar}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}