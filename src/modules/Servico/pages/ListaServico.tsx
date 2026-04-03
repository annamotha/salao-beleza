import { useNavigate } from "react-router-dom";
import { servicoTeste } from "../types/servico-test";
import { Button, Container, Typography } from "@mui/material";
import { TabelaServicos } from "../components/TabelaServicos";
import { Servico } from "../../../types/Servico";

export function ListaServico() {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Serviços
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate("/servicos/novo")}
                sx={{ mb: 2 }}
            >
                Novo Serviço
            </Button>

            <TabelaServicos servicos={servicoTeste} />
        </Container>
    );
}