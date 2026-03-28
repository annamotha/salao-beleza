import { TableRow, TableCell, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Agendamento } from "../../../types/Agendamento";

type Props = {
  agendamento: Agendamento;
};

export function LinhaAgendamento({ agendamento }: Props) {
  return (
    <TableRow>
      <TableCell>{agendamento.usuario.nome}</TableCell>
      <TableCell>{agendamento.servico.nome}</TableCell>
      <TableCell>{agendamento.horario.hora}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          component={Link}
          to={`/agendamentos/${agendamento.id}`}
        >
          Ver
        </Button>
      </TableCell>
    </TableRow>
  );
}