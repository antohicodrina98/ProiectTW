//sa pot sa sterg contul sau sa fac update 
//dupa codul din MagazinList
import { useState, useEffect } from 'react';
import { get, remove } from '../Calls';
import { Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { utilizatorRoute } from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function ModificareDateProfil() {

    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(utilizatorRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteUtilizator = async (id, index) => {
        await remove(utilizatorRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
        setOpen(false);
    }

    //Stergere pop up
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Utilizator Id</TableCell>
                            <TableCell align="right">Nume</TableCell>
                            <TableCell align="right">Prenume</TableCell>
                            <TableCell align="right">Numar de telefon</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Parola</TableCell>
                            <TableCell align="right">Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (//ma folosesc de forEach ca sa mi creeze pt fiecare utilizator un rand
                            <TableRow key={row.IDUtilizator}>
                                <TableCell component="th" scope ="row">
                                    {row.IDUtilizator}
                                </TableCell>
                                <TableCell align="right">{row.NumeUtilizator}</TableCell>
                                <TableCell align="right">{row.PrenumeUtilizator}</TableCell>
                                <TableCell align="right">{row.NumarDeTelefon}</TableCell>
                                <TableCell align="right">{row.Email}</TableCell>
                                <TableCell align="right">{row.Parola}</TableCell>
                                <TableCell align="right">{row.UserName}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => navigate(`/UtilizatorEdit/${row.IDUtilizator}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={handleClickOpen}> {/* onClick={() => deleteUtilizator(row.IDUtilizator, index)} */}
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">
                                            {"Confirmați ștergerea contului?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Această acțiune va determina ștergerea permanentă a contului dumneavoastră.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose}>
                                                Anulează
                                            </Button>
                                            {/* trb fct si aici handleClose */}
                                            <Button onClick={() => deleteUtilizator(row.IDUtilizator, index)}>
                                            
                                            Continuă
                                            </Button>
                                            {/* <Button onClick={handleClose} autoFocus>
                                                Continuă
                                            </Button> */}
                                        </DialogActions>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}