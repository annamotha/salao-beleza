import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usuariosTeste } from "../types/usuarios-test";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

type Props = {
  usuarios: typeof usuariosTeste;
  onDelete?: (id: number) => void;
};

export function TabelaUsuarios({ usuarios, onDelete }: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Nome", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "tipo", headerName: "Tipo", flex: 0.8, minWidth: 120 },
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
            onClick={() => navigate(`/usuarios/${params.row.id}`)}
          >
            Detalhes
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="info"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/usuarios/${params.row.id}/editar`)}
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
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={usuarios}
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
}