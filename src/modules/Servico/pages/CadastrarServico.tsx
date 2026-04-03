import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function CadastrarServico() {
    const [form, setForm] = useState({
        nome: "",
        preco: "",
        duracao: ""
    });

    function handleChange(e: any) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit() {
        console.log("Serviço criado:", form);
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Cadastrar Serviço
            </Typography>

            <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                />
                <TextField
                    label="Preço"
                    name="preco"
                    type="number"
                    value={form.preco}
                    onChange={handleChange}
                />
                <TextField
                    label="Duração (minutos)"
                    name="duracao"
                    type="number"
                    value={form.duracao}
                    onChange={handleChange}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Salvar
                </Button>
            </Box>
        </Container>
    );
}