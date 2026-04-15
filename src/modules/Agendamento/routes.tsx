import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../../componentes/ProtectedRoute";
import { TipoUsuario } from "../../types/Usuario";
import { ListaAgendamentos } from "./components/ListaAgendamentos";
import { CadastroAgendamento } from "./pages/CadastroAgendamento";
import { DetalheAgendamento } from "./pages/DetalheAgendamento";
import { EditarAgendamento } from "./pages/EditarAgendamento";

export function AgendamentoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ListaAgendamentos />} />
            <Route path="/novo" element={<CadastroAgendamento />} />
            <Route path="/:id" element={<DetalheAgendamento />} />
            <Route
              path="/:id/editar"
              element={
                <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO]}>
                  <EditarAgendamento />
                </ProtectedRoute>
              }
            />
        </Routes>
    )
}
