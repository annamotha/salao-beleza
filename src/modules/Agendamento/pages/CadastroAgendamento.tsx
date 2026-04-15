import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Alert,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { useDataManager } from "../../../hooks/useDataManager";
import { Agendamento } from "../../../types/Agendamento";
import { Servico } from "../../../types/Servico";
import { Produto } from "../../../types/Produto";
import { Usuario, TipoUsuario } from "../../../types/Usuario";
import { Cliente } from "../../../types/Cliente";
import { Funcionario } from "../../../types/Funcionario";
import { agendamentoTeste } from "../types/agendamento-test";
import { servicoTeste } from "../../Servico/types/servico-test";
import { produtoTeste } from "../../Produto/types/produto-test";
import { usuariosTeste } from "../../Usuario/types/usuarios-test";

export function CadastroAgendamento() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { add } = useDataManager<Agendamento>({
    initialData: agendamentoTeste,
    storageKey: "salao_agendamentos",
  });

  const { data: servicos } = useDataManager<Servico>({
    initialData: servicoTeste,
    storageKey: "salao_servicos",
  });

  const { data: produtos } = useDataManager<Produto>({
    initialData: produtoTeste,
    storageKey: "salao_produtos",
  });

  const { data: usuarios } = useDataManager<Usuario>({
    initialData: usuariosTeste,
    storageKey: "salao_usuarios",
  });

  const isFuncionario = (usuario: Usuario): usuario is Funcionario =>
    usuario.tipo === TipoUsuario.FUNCIONARIO;

  const isCliente = (usuario: Usuario): usuario is Cliente =>
    usuario.tipo === TipoUsuario.CLIENTE;

  const funcionarios = usuarios.filter(isFuncionario);
  const clientes = usuarios.filter(isCliente);

  const isClient = auth.user?.tipo === TipoUsuario.CLIENTE;
  const canCreateAppointment = auth.user?.tipo === TipoUsuario.CLIENTE ||
                               auth.user?.tipo === TipoUsuario.ADMIN ||
                               auth.user?.tipo === TipoUsuario.FUNCIONARIO;

  const [form, setForm] = useState({
    servicoId: servicos[0]?.id ?? 0,
    produtoId: produtos[0]?.id ?? 0,
    funcionarioId: funcionarios[0]?.id ?? 0,
    clienteId: isClient ? (auth.user?.id ?? 0) : (clientes[0]?.id ?? 0),
    quantidade: 1,
    data: "",
    hora: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auth.user) {
      setError("É necessário estar logado para criar um agendamento.");
      return;
    }

    if (!canCreateAppointment) {
      setError("Apenas clientes, funcionários e administradores podem criar agendamentos.");
      return;
    }

    const servico = servicos.find((item) => item.id === Number(form.servicoId));
    const produto = produtos.find((item) => item.id === Number(form.produtoId));
    const funcionario = funcionarios.find((item) => item.id === Number(form.funcionarioId));
    const cliente = clientes.find((item) => item.id === Number(form.clienteId)) || (auth.user as Cliente);

    if (!servico || !produto || !funcionario || !cliente) {
      setError("Selecione serviço, produto, funcionário e cliente.");
      return;
    }

    if (!form.data || !form.hora) {
      setError("Data e hora são obrigatórias.");
      return;
    }

    add({
      cliente,
      servicoProduto: {
        servico,
        produto,
        quantidadeUsada: Number(form.quantidade),
      },
      horario: {
        id: Number(`${Date.now()}`.slice(-6)),
        data: form.data,
        hora: form.hora,
        disponivel: false,
        funcionario,
      },
      status: "AGENDADO",
    });

    navigate("/agendamentos");
  };


  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Novo Agendamento
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          select
          label="Serviço"
          value={form.servicoId}
          onChange={(e) => handleChange("servicoId", Number(e.target.value))}
          fullWidth
        >
          {servicos.map((servico) => (
            <MenuItem key={servico.id} value={servico.id}>
              {servico.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Produto"
          value={form.produtoId}
          onChange={(e) => handleChange("produtoId", Number(e.target.value))}
          fullWidth
        >
          {produtos.map((produto) => (
            <MenuItem key={produto.id} value={produto.id}>
              {produto.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Funcionário"
          value={form.funcionarioId}
          onChange={(e) => handleChange("funcionarioId", Number(e.target.value))}
          fullWidth
        >
          {funcionarios.map((funcionario) => (
            <MenuItem key={funcionario.id} value={funcionario.id}>
              {funcionario.nome}
            </MenuItem>
          ))}
        </TextField>

        {!isClient && (
          <TextField
            select
            label="Cliente"
            value={form.clienteId}
            onChange={(e) => handleChange("clienteId", Number(e.target.value))}
            fullWidth
          >
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          label="Quantidade usada"
          type="number"
          value={form.quantidade}
          onChange={(e) => handleChange("quantidade", Number(e.target.value))}
          inputProps={{ min: 1 }}
          fullWidth
        />

        <TextField
          label="Data"
          type="date"
          value={form.data}
          onChange={(e) => handleChange("data", e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="Hora"
          type="time"
          value={form.hora}
          onChange={(e) => handleChange("hora", e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Button type="submit" variant="contained">
          Confirmar agendamento
        </Button>
      </Box>
    </Container>
  );
}
