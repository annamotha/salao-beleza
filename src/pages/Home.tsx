import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TipoUsuario } from "../types/Usuario";

export function Home() {
  const navigate = useNavigate();
  const auth = useAuth();

  const buttons = [] as { label: string; path: string }[];

  if (!auth.isAuthenticated) {
    buttons.push({ label: "Entrar no Sistema", path: "/login" });
    buttons.push({ label: "Cadastrar-se", path: "/cadastro" });
  } else {
    buttons.push({ label: "Serviços", path: "/servicos" });
    buttons.push({ label: "Agendamentos", path: "/agendamentos" });
    if (auth.user?.tipo === TipoUsuario.ADMIN) {
      buttons.push({ label: "Gerenciar Usuários", path: "/usuarios" });
      buttons.push({ label: "Gerenciar Produtos", path: "/produtos" });
    }
  }

  return (
    <Container style={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h3" gutterBottom>
        Sistema de Salão 💇‍♀️
      </Typography>

      <Typography variant="h6" gutterBottom>
        {auth.isAuthenticated
          ? `Bem-vindo, ${auth.user?.nome}! Você está logado como ${auth.user?.tipo}.`
          : "Gerencie clientes, agendamentos e muito mais."}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mt: 4 }}>
        {buttons.map((button) => (
          <Button key={button.path} variant="contained" onClick={() => navigate(button.path)}>
            {button.label}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
