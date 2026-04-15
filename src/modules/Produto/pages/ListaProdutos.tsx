import { Button, Container, Typography, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TabelaProdutos } from "../componentes/TabelaProdutos";
import { produtoTeste } from "../types/produto-test";
import { useDataManager } from "../../../hooks/useDataManager";
import { Produto } from "../../../types/Produto";
import { SearchBar } from "../../../componentes/SearchBar";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export function ListaProdutos() {
    const navigate = useNavigate();
    const { data: produtos, search } = useDataManager<Produto>({
        initialData: produtoTeste,
        storageKey: "salao_produtos",
    });

    const [filtrados, setFiltrados] = useState<Produto[]>(produtos);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "info",
    });

    const handleSearch = (query: string) => {
        if (query.trim()) {
            const results = search(query, ["nome"]);
            setFiltrados(results);
        } else {
            setFiltrados(produtos);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4">
                    Produtos
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon/>}
                    onClick={() => navigate("/produtos/novo")} 
                >
                    Novo Produto
                </Button>
            </Box>

            <SearchBar onSearch={handleSearch} placeholder="Pesquisar produtos..." />

            <TabelaProdutos produtos={filtrados.length > 0 ? filtrados : produtos} />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Container>
    );
}