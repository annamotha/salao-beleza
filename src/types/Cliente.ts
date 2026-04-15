import { TipoUsuario, Usuario } from "./Usuario";

export type Cliente = Omit<Usuario, "tipo"> & {
  telefone: string;
  tipo: TipoUsuario.CLIENTE;
};