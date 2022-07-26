import { useState, useEffect } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@mui/material/Box';
import { TextField, Button, InputLabel, NativeSelect, MenuItem } from '@material-ui/core';
import { post, put, get } from '../Calls';
import { experientaRoute } from '../ApiRoutes';
import { experientaEditRoute } from '../ApiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet';
import './ExperientaEdit.css'

export default function ExperientaEdit() {

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;
    const idExp = routerParams.idExp;
    const errors = 0;

    const [experienta, setExperienta] = useState
        ({
            PunctPlecare: "",
            PunctSosire: "",
            Localitate: "",
            MijlocTransport: "",
            OraPlecare: "",
            DurataCalatorie: 0,
            GradAglomerare: 0,
            Observatii: "",
            NivelSatisfactie: 0,
            IDUtilizator: id
        });



    useEffect(async () => {
        if (!idExp)
            return;

        let data = await get(experientaEditRoute, idExp);
        setExperienta(data);
    }, [])

    const onChangeExperienta = e => {
        e.preventDefault();
        e.stopPropagation();
        setExperienta({ ...experienta, [e.target.name]: e.target.value });
    }
    
    const MijloaceTransport = ["metrou","Metrou","autobuz","Autobuz","tramvai","Tramvai"];
    const saveExperienta = async () => {
        if (!experienta.Localitate) {
            alert('Localitatea nu a fost completata');
        }
        else if (!experienta.Localitate.match('^.{2,30}$')) {
            alert("Localitatea trebuie să aibă 2-30 caractere!");
        }
        else if (!experienta.MijlocTransport) {
            alert('Mijlocul de transport nu a fost completat');
        }
        else if (!MijloaceTransport.includes(experienta.MijlocTransport)){
            alert("Mijlocul de transport trebuie să fie metrou/autobuz/tramvai!");
        }
        else if (!experienta.MijlocTransport.match('^.{2,30}$')) {
            alert("Mijlocul de transport trebuie să aibă 2-30 caractere!");
        }
        else if (!experienta.PunctPlecare) {
            alert('Punctul de plecare nu a fost completat');
        }
        else if (!experienta.PunctPlecare.match('^.{2,30}$')) {
            alert("Punctul de plecare trebuie să aibă 2-30 caractere!");
        }
        else if (!experienta.PunctSosire) {
            alert('Punctul de sosire nu a fost completat');
        }
        else if (!experienta.PunctSosire.match('^.{2,30}$')) {
            alert("Punctul de sosire trebuie să aibă 2-30 caractere!");
        }
        else if (!experienta.OraPlecare) {
            alert('Ora de plecare nu a fost completata');
        }
        else if (!experienta.OraPlecare.match('^[0-2][0-3]:[0-5][0-9]$')) {
            alert('Ora trebuie să aibă formatul HH:MM');
        }
        else if (!experienta.DurataCalatorie) {
            alert('Durata nu a fost completata');
        }
        else if (experienta.DurataCalatorie < 1) {
            alert('Durata călătoriei trebuie să fie de minim 1 minut!');
        }
        else if (experienta.DurataCalatorie > 180) {
            alert('Durata călătoriei nu poate să depășească 180 minute!');
        }
        else if (isNaN(experienta.DurataCalatorie)) {
            alert('Durata trebuie sa fie scrisa in numar minute');
        }
        else if (!experienta.GradAglomerare) {
            alert('Gradul de aglomerare nu a fost completat');
        }
        else if (isNaN(experienta.GradAglomerare) || experienta.GradAglomerare < 1 || experienta.GradAglomerare > 5) {
            alert('Gradul de aglomerare este de la 1-5');
        }
        else if (!experienta.NivelSatisfactie) {
            alert('Nivelul de satisfactie nu a fost selectat');
        }
        else if (isNaN(experienta.NivelSatisfactie) || experienta.NivelSatisfactie < 1 || experienta.NivelSatisfactie > 10) {
            alert('Gradul de aglomerare este de la 1-10');
        }
        else if (experienta.Observatii > 500) {
            alert('Observațiile nu pot depăși 500 de caractere!');
        }
        else {
            if (!idExp)
                await post(experientaRoute, experienta);
            else
                await put(experientaRoute, idExp, experienta);
            navigate(`/PaginaProfilUtilizator/${id}/ExperientaList`)

        }

    }
    function cancelEdit() {
        if (!id) {

        }
        else {
            navigate(`/PaginaProfilUtilizator/${id}/ExperientaList`)
        }
        //navigate("/ExperientaList")
    }
    return (
        <div>
            <Helmet>
                <style>{'body { background-color: rgb(136, 128, 197); }'}</style>
            </Helmet>
            <Box style={{ backgroundColor: "lightblue", marginTop: "8%", marginRight: "30%", marginLeft: "30%", borderRadius: "10px", padding: "15px" }}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <div>
                        <TextField
                            required
                            autoFocus
                            id="Localitate"
                            name="Localitate"
                            label="Localitate"
                            fullWidth
                            value={experienta.Localitate}
                            onChange={e => onChangeExperienta(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            id="MijlocTransport"
                            name="MijlocTransport"
                            label="Mijloc Transport"
                            fullWidth
                            value={experienta.MijlocTransport }
                            onChange={e => onChangeExperienta(e)}
                        /> 
                    </div>
                    <div>
                        <TextField
                            required
                            autoFocus
                            id="PunctPlecare"
                            name="PunctPlecare"
                            label="Punct Plecare"
                            fullWidth
                            value={experienta.PunctPlecare}
                            onChange={e => onChangeExperienta(e)}
                        />
                        <TextField
                            required
                            autoFocus
                            id="PunctSosire"
                            name="PunctSosire"
                            label="Punct Sosire"
                            fullWidth
                            value={experienta.PunctSosire}
                            onChange={e => onChangeExperienta(e)}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            autoFocus
                            id="OraPlecare"
                            name="OraPlecare"
                            label="Ora Plecare"
                            fullWidth
                            value={experienta.OraPlecare}
                            onChange={e => onChangeExperienta(e)}
                        />
                        <TextField type="number"
                            required
                            autoFocus
                            id="DurataCalatorie"
                            name="DurataCalatorie"
                            label="Durata Calatorie"
                            fullWidth
                            value={experienta.DurataCalatorie}
                            onChange={e => onChangeExperienta(e)}
                        />
                    </div>
                    <div>
                        <TextField type="number"
                            required
                            autoFocus
                            id="GradAglomerare"
                            name="GradAglomerare"
                            label="Grad Aglomerare"
                            fullWidth
                            value={experienta.GradAglomerare}
                            onChange={e => onChangeExperienta(e)}
                        />

                    </div>
                    <br></br>
                    <div>
                        <label>Nivel Satisfactie</label>
                        <br></br>
                        <span id="emoji1" className="emoji" onClick={(e) => {
                            experienta.NivelSatisfactie = 1;
                        }
                        } >&#128548;</span>
                        <span id="emoji2" className="emoji" onClick={(e) => {
                            experienta.NivelSatisfactie = 2;
                        }
                        } >&#128530;</span>
                        <span id="emoji3" className="emoji" onClick={(e) => {
                            experienta.NivelSatisfactie = 3;
                        }
                        } >&#128528;</span>
                        <span id="emoji4" className="emoji" onClick={(e) => {
                            experienta.NivelSatisfactie = 4;
                        }
                        } >&#128578;</span>
                        <span id="emoji5" className="emoji" onClick={(e) => {
                            experienta.NivelSatisfactie = 5;
                        }
                        } >&#128515;</span>
                    </div>
                    <div>
                        <TextField
                            autoFocus
                            id="Observatii"
                            name="Observatii"
                            label="Observatii"
                            fullWidth
                            value={experienta.Observatii}
                            onChange={e => onChangeExperienta(e)}
                        />
                    </div>
                </div>
                <Button style={{ margin: "15px" }}
                    id='btnSave' color="primary" variant='outlined' startIcon={<SaveIcon />}
                    onClick={saveExperienta}
                >
                    Save
                </Button>
                <Button style={{ margin: "15px" }}
                    id='btnCancel' color="primary" variant='outlined' startIcon={<CancelIcon />}
                    onClick={() => { cancelEdit() }}
                >
                    Cancel
                </Button>
            </Box>

        </div>
    )
}

