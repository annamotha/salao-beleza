import { Usuario } from "./Usuario";

export type Funcionario = Usuario & {
  area: string;
  atributo19: number;
};