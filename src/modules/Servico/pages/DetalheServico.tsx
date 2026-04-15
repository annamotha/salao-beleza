import { Button, Container, Typography, Box, Card, CardContent, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDataManager } from "../../../hooks/useDataManager";
import { Servico } from "../../../types/Servico";
import { servicoTeste } from "../types/servico-test";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../context/AuthContext";
import { TipoUsuario } from "../../../types/Usuario";

export function DetalheServico() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const auth = useAuth();
    const { getById } = useDataManager<Servico>({
        initialData: servicoTeste,
        storageKey: "salao_servicos",
    });

    const servico = id ? getById(Number(id)) : null;
    const isClient = auth.user?.tipo === TipoUsuario.CLIENTE;

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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4">Detalhes do Serviço</Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/servicos")}
                >
                    Voltar
                </Button>
            </Box>

            <Card>
                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                ID
                            </Typography>
                            <Typography variant="h6">{servico.id}</Typography>
                        </Box>

                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                Nome
                            </Typography>
                            <Typography variant="h6">{servico.nome}</Typography>
                        </Box>

                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                Preço
                            </Typography>
                            <Typography variant="h6">R$ {Number(servico.preco).toFixed(2)}</Typography>
                        </Box>

                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                Duração
                            </Typography>
                            <Typography variant="h6">{servico.duracao} minutos</Typography>
                        </Box>

                        {!isClient && (
                          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                              <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<EditIcon />}
                                  onClick={() => navigate(`/servicos/${servico.id}/editar`)}
                                  fullWidth
                              >
                                  Editar
                              </Button>
                          </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}