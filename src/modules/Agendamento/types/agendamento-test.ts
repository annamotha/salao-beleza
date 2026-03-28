import { Agendamento } from "../../../types/Agendamento";
import { TipoUsuario } from "../../../types/Usuario";



export const agendamentoTeste: Agendamento[] = [
    {
        id: 1,
        usuario: {
            id: 1,
            nome: "Anna",
            email: "anna@email.com",
            senha: "123456",
            tipo: TipoUsuario.CLIENTE,
        },
        servico: {
            id: 1,
            nome: "Corte de Cabelo",
            preco: 50,
            duracao: 30
        },
        horario: {
            id: 1,
            hora: "14:00",
            disponivel: true
        },
        status: "AGENDADO"
    }

];