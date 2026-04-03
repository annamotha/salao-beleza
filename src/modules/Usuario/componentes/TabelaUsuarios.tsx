import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usuariosTeste } from "../types/usuarios-test";


type Props = {
  usuarios: typeof usuariosTeste;
};

export function TabelaUsuarios({ usuarios }: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "tipo", headerName: "Tipo", flex: 1 },
    {
      field: "acoes",
      headerName: "Ações",
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          onClick={() => navigate(`/usuarios/${params.row.id}`)}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400 }}>
      <DataGrid
        rows={usuarios}
        columns={columns}
        pageSizeOptions={[5]}
      />
    </div>
  );
}