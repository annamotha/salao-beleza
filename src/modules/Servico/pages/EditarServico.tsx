import { Box, Button, Container, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataManager } from "../../../hooks/useDataManager";
import { Servico } from "../../../types/Servico";
import { servicoTeste } from "../types/servico-test";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function EditarServico() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getById, update } = useDataManager<Servico>({
        initialData: servicoTeste,
        storageKey: "salao_servicos",
    });

    const servico = id ? getById(Number(id)) : null;

    const [form, setForm] = useState({
        nome: "",
        preco: "",
        duracao: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (servico) {
            setForm({
                nome: servico.nome,
                preco: String(servico.preco),
                duracao: String(servico.duracao),
            });
        }
    }, [servico]);

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
        if (!form.duracao || Number(form.duracao) <= 0) {
            setError("Duração deve ser maior que 0 minutos");
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
                duracao: Number(form.duracao),
            });
            navigate(`/servicos/${id}`);
        } catch (err) {
            setError("Erro ao atualizar serviço");
        } finally {
            setLoading(false);
        }
    };

    if (!servico) {
        return (
            <Container maxWidth="sm" sx={{ py: 3 }}>
                <Alert severity="error">Serviço não encontrado</Alert>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/servicos")}
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
                Editar Serviço
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
                    label="Duração (minutos)"
                    name="duracao"
                    type="number"
                    value={form.duracao}
                    onChange={handleChange}
                    fullWidth
                    disabled={loading}
                    required
                    inputProps={{ min: "1" }}
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
                        onClick={() => navigate("/servicos")}
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
