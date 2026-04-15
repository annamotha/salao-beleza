import { useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDataManager } from "../../../hooks/useDataManager";
import { Produto } from "../../../types/Produto";
import { produtoTeste } from "../types/produto-test";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarProduto() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getById, update } = useDataManager<Produto>({
        initialData: produtoTeste,
        storageKey: "salao_produtos",
    });

    const produto = id ? getById(Number(id)) : null;

    const [form, setForm] = useState({
        nome: "",
        preco: "",
        quantidade: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (produto) {
            setForm({
                nome: produto.nome,
                preco: String(produto.preco),
                quantidade: String(produto.quantidade),
            });
        }
    }, [produto]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    }

    const validateForm = (): boolean => {
        if (!form.nome.trim()) {
            setError("Nome é obrigatório");
            return false;
        }
        if (!form.preco || Number(form.preco) <= 0) {
            setError("Preço deve ser maior que 0");
            return false;
        }
        if (!form.quantidade || Number(form.quantidade) < 0) {
            setError("Quantidade não pode ser negativa");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm() || !id) return;

        setLoading(true);
        try {
            update(Number(id), {
                nome: form.nome,
                preco: Number(form.preco),
                quantidade: Number(form.quantidade),
            });
            navigate(`/produtos/${id}`);
        } catch (err) {
            setError("Erro ao atualizar produto");
        } finally {
            setLoading(false);
        }
    };

    if (!produto) {
        return (
            <Container maxWidth="sm" sx={{ py: 3 }}>
                <Alert severity="error">Produto não encontrado</Alert>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/produtos")}
                    sx={{ mt: 2 }}
                >
                    Voltar
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Typography variant="h4" gutterBottom>
                Editar Produto
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                    required
                />
                <TextField
                    label="Preço"
                    name="preco"
                    type="number"
                    value={form.preco}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                    required
                    inputProps={{ step: "0.01", min: "0" }}
                />
                <TextField
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    value={form.quantidade}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                    required
                    inputProps={{ min: "0" }}
                />

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : "Salvar"}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => navigate("/produtos")}
                        disabled={loading}
                        fullWidth
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
