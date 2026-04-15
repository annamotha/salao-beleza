import { Button, Box } from "@mui/material";
import { Produto } from "../../../types/Produto";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface TabelaProdutosProps {
  produtos: Produto[];
  onDelete?: (id: number) => void;
}

export function TabelaProdutos({ produtos, onDelete }: TabelaProdutosProps) {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "nome", headerName: "Nome", flex: 1, minWidth: 150 },
        { 
          field: "preco", 
          headerName: "Preço", 
          flex: 0.8,
          minWidth: 100,
          renderCell: (params) => `R$ ${Number(params.value).toFixed(2)}`
        },
        { field: "quantidade", headerName: "Quantidade", flex: 0.8, minWidth: 120 },
        {
          field: "acoes",
          headerName: "Ações",
          flex: 1,
          minWidth: 280,
          sortable: false,
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => navigate(`/produtos/${params.row.id}`)}
              >
                Detalhes
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="info"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/produtos/${params.row.id}/editar`)}
              >
                Editar
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete?.(params.row.id)}
              >
                Deletar
              </Button>
            </Box>
          ),
        }
    ];
    
    return (
        <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
                rows={produtos}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
            />
        </Box>
    );
};