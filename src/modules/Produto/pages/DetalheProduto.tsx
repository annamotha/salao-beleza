import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Card, CardContent, Alert } from "@mui/material";
import { produtoTeste } from "../types/produto-test";
import { useDataManager } from "../../../hooks/useDataManager";
import { Produto } from "../../../types/Produto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

export function DetalheProduto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById } = useDataManager<Produto>({
    initialData: produtoTeste,
    storageKey: "salao_produtos",
  });

  const produto = id ? getById(Number(id)) : null;

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Detalhes do Produto</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/produtos")}
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
              <Typography variant="h6">{produto.id}</Typography>
            </Box>

            <Box>
              <Typography color="textSecondary" gutterBottom>
                Nome
              </Typography>
              <Typography variant="h6">{produto.nome}</Typography>
            </Box>

            <Box>
              <Typography color="textSecondary" gutterBottom>
                Preço
              </Typography>
              <Typography variant="h6">R$ {Number(produto.preco).toFixed(2)}</Typography>
            </Box>

            <Box>
              <Typography color="textSecondary" gutterBottom>
                Quantidade em Estoque
              </Typography>
              <Typography variant="h6">{produto.quantidade}</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/produtos/${produto.id}/editar`)}
                fullWidth
              >
                Editar
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
