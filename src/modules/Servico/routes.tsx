import { Route, Routes } from "react-router-dom";
import { ListaServico } from "./pages/ListaServico";
import { CadastrarServico } from "./pages/CadastrarServico";
import { DetalheServico } from "./pages/DetalheServico";
import { EditarServico } from "./pages/EditarServico";
import { ProtectedRoute } from "../../componentes/ProtectedRoute";
import { TipoUsuario } from "../../types/Usuario";

export function ServicoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ListaServico />} />
            <Route
              path="/novo"
              element={
                <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO]}>
                  <CadastrarServico />
                </ProtectedRoute>
              }
            />
            <Route path="/:id" element={<DetalheServico />} />
            <Route
              path="/:id/editar"
              element={
                <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO]}>
                  <EditarServico />
                </ProtectedRoute>
              }
            />
        </Routes>
    )
}