import { Route, Routes } from "react-router-dom";
import { ListaAgendamentos } from "./components/ListaAgendamentos";

export function AgendamentoRoutes() {
  return(
        <Routes>
            <Route path="/" element={<ListaAgendamentos />} />
        </Routes>
    )
}