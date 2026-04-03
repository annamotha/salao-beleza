import { TipoUsuario, Usuario } from "../../../types/Usuario";

export const usuariosTeste: Usuario[] = [
    {
        id: 1,
        nome: "Anna",
        email: "anna@email.com",
        senha: "123456",
        tipo: TipoUsuario.CLIENTE,
    }
];