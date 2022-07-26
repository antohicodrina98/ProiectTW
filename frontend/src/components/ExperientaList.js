import { useState, useEffect } from 'react';
import { get, remove } from '../Calls';
import { Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { experientaRoute } from '../ApiRoutes';
import { useNavigate,useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function ExperientaList() {

    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;


    useEffect(async () => {
        let data = await get(experientaRoute,id);
        setRows(data);
    }, [needUpdate]);


    const deleteExperienta = async (id, index) => {
        await remove(experientaRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    }

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
            <div>
                <Button style={{ marginTop: "2%" }}
                    variant='contained'
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => { navigate(`/ExperientaList/ExperientaEdit/${id}`) }}
                >
                    Adauga experienta
                </Button>
                <br></br>
                <Button
                    style={{ marginTop: "2%" }}
                    variant='contained'
                    color="primary"
                    onClick={() => { inapoi() }}
                >
                    Inapoi
                </Button>
            </div>

            <br />

            <div style={{ marginLeft: "2%", marginRight: "2%",
                    alignContent: "center", display: "flex", flexWrap: "wrap", alignContent: "center"}}>
                <TableContainer style={{
                    backgroundColor: "lightblue", marginTop: "1%", padding: "15px", marginLeft: "2%"}}
                    component={Paper}>
                    <Table aria-label="simple table" style={{border:"1px solid black"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{border:"1px solid black"}}>ID Experienta</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Localitate</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Mijloc de Transport</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Punct Plecare</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Punct Sosire</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Ora Plecare</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Durata Calatorie</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Grad Aglomerare</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Nivel Satisfactie</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Observatii</TableCell>
                                <TableCell style={{border:"1px solid black"}} align="center">Actiuni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow style={{border:"1px solid black"}} key={row.IDExperienta}>
                                    <TableCell style={{border:"1px solid black"}} component="th" scope="row">
                                        {row.IDExperienta}
                                    </TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.Localitate}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.MijlocTransport}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.PunctPlecare}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.PunctSosire}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.OraPlecare}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.DurataCalatorie}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.GradAglomerare}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.NivelSatisfactie}</TableCell>
                                    <TableCell style={{border:"1px solid black"}} align="center">{row.Observatii}</TableCell>

                                    <TableCell style={{border:"1px solid black"}} align="center">
                                        <IconButton onClick={() => navigate(`/ExperientaList/ExperientaEdit/${id}/${row.IDExperienta}`)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => deleteExperienta(row.IDExperienta, index)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </div>

        </div>
    )
}