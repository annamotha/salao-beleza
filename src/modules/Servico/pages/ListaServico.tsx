import { useNavigate } from "react-router-dom";
import { servicoTeste } from "../types/servico-test";
import { Button, Container, Typography, Box, Snackbar } from "@mui/material";
import { TabelaServicos } from "../components/TabelaServicos";
import { Servico } from "../../../types/Servico";
import { useDataManager } from "../../../hooks/useDataManager";
import { SearchBar } from "../../../componentes/SearchBar";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../../context/AuthContext";
import { TipoUsuario } from "../../../types/Usuario";

export function ListaServico() {
    const navigate = useNavigate();
    const auth = useAuth();
    const isClient = auth.user?.tipo === TipoUsuario.CLIENTE;

    const { data: servicos, search, remove } = useDataManager<Servico>({
        initialData: servicoTeste,
        storageKey: "salao_servicos",
    });

    const [filtrados, setFiltrados] = useState<Servico[]>(servicos);
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
            setFiltrados(servicos);
        }
    };

    const handleDelete = (id: number) => {
        remove(id);
        setSnackbar({
            open: true,
            message: "Serviço excluído com sucesso.",
            severity: "success",
        });
        setFiltrados((current) => current.filter((servico) => servico.id !== id));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4">
                    Serviços
                </Typography>
                {!isClient && (
                  <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => navigate("/servicos/novo")}
                  >
                      Novo Serviço
                  </Button>
                )}
            </Box>

            <SearchBar onSearch={handleSearch} placeholder="Pesquisar serviços..." />

            <TabelaServicos servicos={filtrados.length > 0 ? filtrados : servicos} isClient={isClient} onDelete={handleDelete} />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Container>
    );
}