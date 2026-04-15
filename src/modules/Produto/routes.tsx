import { Route, Routes } from "react-router-dom";
import { ListaProdutos } from "./pages/ListaProdutos";
import { CadastrarProdutos } from "./pages/CadastrarProdutos";
import { DetalheProduto } from "./pages/DetalheProduto";
import { EditarProduto } from "./pages/EditarProduto";

export function ProdutoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ListaProdutos />} />
            <Route path="/novo" element={<CadastrarProdutos />} />
            <Route path="/:id" element={<DetalheProduto />} />
            <Route path="/:id/editar" element={<EditarProduto />} />
        </Routes>
    );
}