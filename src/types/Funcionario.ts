import { Usuario } from "./Usuario";

export type Funcionario = Usuario & {
  especialidade: string;
};