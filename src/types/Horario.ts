import { Funcionario } from "./Funcionario";

export type HorarioDisponivel = {
  id: number;
  data: string;
  hora: string;
  disponivel: boolean;
  funcionario: Funcionario;
};

export type Horario = HorarioDisponivel;