import { Route, Routes } from "react-router-dom";
import { AgendamentoRoutes } from "./modules/Agendamento/routes";
import { UsuarioRoutes } from "./modules/Usuario/routes";
import { ServicoRoutes } from "./modules/Servico/routes";

export function AppRoutes() {
    return ( 
        <>
            <Routes>
                <Route path="/" element={<h1>Nome: </h1>}></Route>
                <Route path="/agendamentos/*" element={<AgendamentoRoutes/>}></Route>
                <Route path="/usuarios/*" element={<UsuarioRoutes/>}></Route>
                <Route path="/servicos/*" element={<ServicoRoutes/>}></Route>
            </Routes>
        </>
    );
}