import { TipoUsuario, Usuario } from "../../../types/Usuario";

export const usuariosTeste: Usuario[] = [
    {
        id: 1,
        nome: "Anna Silva",
        email: "anna@email.com",
        senha: "123456",
        tipo: TipoUsuario.CLIENTE,
    },
    {
        id: 2,
        nome: "Maria Santos",
        email: "maria@email.com",
        senha: "123456",
        tipo: TipoUsuario.CLIENTE,
    },
    {
        id: 3,
        nome: "João Pedro",
        email: "joao@email.com",
        senha: "123456",
        tipo: TipoUsuario.FUNCIONARIO,
    },
    {
        id: 4,
        nome: "Carla Bezerra",
        email: "carla@email.com",
        senha: "123456",
        tipo: TipoUsuario.FUNCIONARIO,
    },
    {
        id: 5,
        nome: "Admin",
        email: "admin@email.com",
        senha: "123456",
        tipo: TipoUsuario.ADMIN,
    },
    {
        id: 6,
        nome: "Jennifer Costa",
        email: "jennifer@email.com",
        senha: "123456",
        tipo: TipoUsuario.CLIENTE,
    },
    {
        id: 7,
        nome: "Roberto Souza",
        email: "roberto@email.com",
        senha: "123456",
        tipo: TipoUsuario.FUNCIONARIO,
    },
    {
        id: 8,
        nome: "Paula Oliveira",
        email: "paula@email.com",
        senha: "123456",
        tipo: TipoUsuario.CLIENTE,
    },
];