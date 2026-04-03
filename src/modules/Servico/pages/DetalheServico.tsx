import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export function DetalheServico() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Detalhe do Serviço
            </Typography>

            <Typography>ID: {id}</Typography>
            <Button variant="contained" onClick={() => navigate("/servicos")}>
                Voltar
            </Button>
        </Container>
    );
}