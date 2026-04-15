import { Servico } from "./Servico";
import { Produto } from "./Produto";

export type ServicoProduto = {
  servico: Servico;
  produto: Produto;
  quantidadeUsada: number;
};
