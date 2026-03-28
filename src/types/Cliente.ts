import { Usuario } from "./Usuario";

export type Cliente = Usuario & {
  telefone: string;
};