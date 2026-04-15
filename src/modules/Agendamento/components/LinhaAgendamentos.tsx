import { TableRow, TableCell, Button } from "@mui/material";
import { Agendamento } from "../../../types/Agendamento";

type Props = {
  agendamento: Agendamento;
  onConfirmar?: (id: number) => void;
  onCancelar?: (id: number) => void;
};

export function LinhaAgendamento({ agendamento, onConfirmar, onCancelar }: Props) {
  const podeAcao = agendamento.status === "AGENDADO";

  return (
    <TableRow>
      <TableCell>{agendamento.cliente.nome}</TableCell>
      <TableCell>{agendamento.servicoProduto.servico.nome}</TableCell>
      <TableCell>{agendamento.servicoProduto.produto.nome}</TableCell>
      <TableCell>{agendamento.servicoProduto.quantidadeUsada}</TableCell>
      <TableCell>{agendamento.horario.hora}</TableCell>
      <TableCell>{agendamento.horario.data}</TableCell>
      <TableCell>{agendamento.status}</TableCell>
      <TableCell>
        {podeAcao && (
          <>
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: 8 }}
              onClick={() => onCancelar?.(agendamento.id)}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: 8 }}
              onClick={() => onConfirmar?.(agendamento.id)}
            >
              Confirmar
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}