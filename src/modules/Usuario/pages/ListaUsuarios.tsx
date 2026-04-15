import { Container, Typography, Button, Box, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TabelaUsuarios } from "../componentes/TabelaUsuarios";
import { usuariosTeste } from "../types/usuarios-test";
import { useDataManager } from "../../../hooks/useDataManager";
import { SearchBar } from "../../../componentes/SearchBar";
import { useState } from "react";
import { Usuario } from "../../../types/Usuario";
import AddIcon from "@mui/icons-material/Add";

export function ListaUsuarios() {
  const navigate = useNavigate();
  const { data: usuarios, search, remove } = useDataManager<Usuario>({
    initialData: usuariosTeste,
    storageKey: "salao_usuarios",
  });

  const [filtrados, setFiltrados] = useState<Usuario[]>(usuarios);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = search(query, ["nome", "email"]);
      setFiltrados(results);
    } else {
      setFiltrados(usuarios);
    }
  };

  const handleDelete = (id: number) => {
    remove(id);
    setSnackbar({
      open: true,
      message: "Usuário excluído com sucesso.",
      severity: "success",
    });
    setFiltrados((current) => current.filter((usuario) => usuario.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">
          Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/usuarios/novo")}
        >
          Novo Usuário
        </Button>
      </Box>

      <SearchBar onSearch={handleSearch} placeholder="Pesquisar por nome ou email..." />

      <TabelaUsuarios 
        usuarios={filtrados.length > 0 ? filtrados : usuarios}
        onDelete={handleDelete}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
