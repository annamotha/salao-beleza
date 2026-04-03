import { Route, Routes } from "react-router-dom";
import { ListaServico } from "./pages/ListaServico";
import { CadastrarServico } from "./pages/CadastrarServico";
import { DetalheServico } from "./pages/DetalheServico";

export function ServicoRoutes() {
    return(
        <Routes>
            <Route path="/" element={<ListaServico/>} />
            <Route path="/novo" element={<CadastrarServico />} />
            <Route path="/:id" element={<DetalheServico />} />
        </Routes>
    )
}