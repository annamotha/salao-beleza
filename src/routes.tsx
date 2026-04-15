import { Route, Routes } from "react-router-dom";
import { UsuarioRoutes } from "./modules/Usuario/routes";
import { Home } from "./pages/Home";
import { ServicoRoutes } from "./modules/Servico/routes";
import { AgendamentoRoutes } from "./modules/Agendamento/routes";
import { ProdutoRoutes } from "./modules/Produto/routes";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import { TipoUsuario } from "./types/Usuario";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route
          path="/usuarios/*"
          element={
            <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN]}>
              <UsuarioRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/servicos/*"
          element={
            <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO, TipoUsuario.CLIENTE]}>
              <ServicoRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agendamentos/*"
          element={
            <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN, TipoUsuario.FUNCIONARIO, TipoUsuario.CLIENTE]}>
              <AgendamentoRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos/*"
          element={
            <ProtectedRoute allowedRoles={[TipoUsuario.ADMIN]}>
              <ProdutoRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
