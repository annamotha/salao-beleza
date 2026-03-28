export enum TipoUsuario {
  ADMIN = "ADMIN",
  FUNCIONARIO = "FUNCIONARIO",
  CLIENTE = "CLIENTE",
}

export type Usuario = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: TipoUsuario;
}