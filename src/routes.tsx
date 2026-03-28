import { Route, Routes } from "react-router-dom";
import { AgendamentoRoutes } from "./modules/Agendamento/routes";

export function AppRoutes() {
    return ( 
        <>
            <Routes>
                <Route path="/" element={<h1>Nome: </h1>}></Route>
                <Route path="/agendamentos/*" element={<AgendamentoRoutes/>}></Route>
            </Routes>
        </>
    );
}