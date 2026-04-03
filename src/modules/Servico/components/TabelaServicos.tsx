import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { useNavigate } from "react-router-dom";
import { Servico } from "../../../types/Servico";
import { Button } from "@mui/material";

export function TabelaServicos({ servicos }: { servicos: Servico[] }) {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: "nome", headerName: "Nome", flex: 1 },
        { field: "preco", headerName: "Preço", flex: 1 },
        { field: "duracao", headerName: "Duração", flex: 1 },
        { field: "acoes", headerName: "Ações", renderCell: (params) => (
            <Button variant="contained" onClick={() => navigate(`/servicos/${params.row.id}`)}>
                Ver
            </Button>
        ) }
    ];

    return (
        <div style={{ height: 400 }}>
        <DataGrid
            rows={servicos}
            columns={columns}
            pageSizeOptions={[5]}
        />
        </div>
    );
}