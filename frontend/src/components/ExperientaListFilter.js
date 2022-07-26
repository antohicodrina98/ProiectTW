import { useState, useEffect } from 'react';
import { get, remove } from '../Calls';
import { experientaRoute } from '../ApiRoutes';
import { useNavigate,useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { DataGrid } from '@mui/x-data-grid';
import { Button} from '@material-ui/core';
import { DataGridPro } from '@mui/x-data-grid-pro';

export default function DataTable() {
    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;


    const columns = [
        {field: 'IDExperienta', headerName: 'ID Experienta', width: 130 },
        {field: 'PunctPlecare', headerName: 'Punct Plecare', width: 130 },
        {field: 'PunctSosire', headerName: 'Punct Sosire', width: 130 },
        {field: 'Localitate', headerName: 'Localitate', width: 130 },
        {field: 'MijlocTransport', headerName: 'Mijloc Transport', width: 130 },
        {field: 'OraPlecare', headerName: 'Ora Plecare', width: 130 },
        {field: 'DurataCalatorie', headerName: 'Durata Calatorie', width: 160, type:'number'},
        {field: 'GradAglomerare', headerName: 'Grad Aglomerare', width: 160, type:'number' },
        {field: 'Observatii', headerName: 'Observatii', width: 130 },
        {field: 'NivelSatisfactie', headerName: 'Nivel Satisfactie', width: 160,type:'number' },
    ];

    const [rows, setRows] = useState([]);
    useEffect(async () => {
        let data = await get(experientaRoute);
        setRows(data);
    })

    function inapoi(){
        if(!id)
        {
            navigate("/");
        }
        else{
            navigate(`/PaginaProfilUtilizator/${id}`);
        }
    }

    return (
        <div>
            <Helmet>
                    <style>{'body { background-color: rgb(136, 128, 197); }'}</style>
            </Helmet>
            <h1>Lista Experiente</h1>
           
            <div style={{ height: 400, width: '100%' }}>
            <DataGridPro
                rows={rows}
                getRowId={(row) => row.IDExperienta}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            </div>
            <Button
                    style={{ marginTop: "2%" }}
                    variant='contained'
                    color="primary"
                    onClick={() => { inapoi() }}
            >
                Inapoi
            </Button>
        </div>
    );
}
