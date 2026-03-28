import { Horario } from "./Horario";
import { Servico } from "./Servico";
import { Usuario } from "./Usuario";

export type Agendamento = {
  id: number;
  usuario: Usuario;
  servico: Servico;
  horario: Horario;
  status: "AGENDADO" | "CANCELADO" | "CONCLUIDO";
};