import { Route, Routes } from "react-router-dom";
import { ListaUsuarios } from "./pages/ListaUsuarios";
import { CadastroUsuario } from "./pages/CadastroUsuario";
import { DetalheUsuario } from "./pages/DetalheUsuario";
import { EditarUsuario } from "./pages/EditarUsuario";

export function UsuarioRoutes() {
  return (
    <Routes>
        <Route path="/" element={<ListaUsuarios />} />
        <Route path="/novo" element={<CadastroUsuario />} />
        <Route path="/:id" element={<DetalheUsuario />} />
        <Route path="/:id/editar" element={<EditarUsuario />} />
    </Routes>
  );
};