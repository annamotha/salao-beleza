import { HorarioDisponivel } from "./Horario";
import { ServicoProduto } from "./ServicoProduto";
import { Cliente } from "./Cliente";

export type Agendamento = {
  id: number;
  cliente: Cliente;
  servicoProduto: ServicoProduto;
  horario: HorarioDisponivel;
  status: "AGENDADO" | "CANCELADO" | "CONCLUIDO";
};