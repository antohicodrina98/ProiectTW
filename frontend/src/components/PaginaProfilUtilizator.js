import { Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { get, remove } from '../Calls';
import { utilizatorRoute } from '../ApiRoutes';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';



export default function PaginaProfilUtilizator() {

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;


    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUtilizator = async () => {
        await remove(utilizatorRoute, id);
        setOpen(false);
        navigate("/");
    }

    const stergeProfil =() => {
        setOpen(true);
    }

    return (
        <div style={{ backgroundColor: "lightblue", marginTop: "15%", marginRight: "30%", marginLeft: "30%", borderRadius: "10px", padding: "15px" }}>
            <h1>PAGINA DUMNEAVOASTRA</h1>
            <Helmet>
                <style>{'body { background-color: rgb(136, 128, 197); }'}</style>
            </Helmet>
            <div >
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate(`/PaginaProfilUtilizator/${id}/ExperientaListFilter`) }
                    }
                >
                    Experiente
                </Button>
            </div>
            <br></br>
            <div>
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate(`/PaginaProfilUtilizator/${id}/ExperientaList`) }}
                >
                    Experientele mele
                </Button>
            </div>
            <br></br>
            <div>
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate(`/PaginaProfilUtilizator/UtilizatorEdit/${id}`) }}
                >
                    Modifica Profil
                </Button>
            </div>
            <br></br>
            <div>
                <Button color="primary" variant='outlined'
                    onClick={() => setOpen(true)}
                >
                    Sterge Profil
                </Button>
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
                        <Button onClick={() => deleteUtilizator()}>
                            Continuă
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <br></br>
            <div>
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate("/") }}
                >
                    Delogare
                </Button>
            </div>
        </div>

    )
}