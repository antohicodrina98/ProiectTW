import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { post, put, get } from '../Calls';
import { utilizatorRoute } from '../ApiRoutes';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet';

export default function UtilizatorEdit() {
    const [utilizator, setUtilizator] = useState({
        PrenumeUtilizator: "",
        NumeUtilizator: "",
        VarstaUtilizator: 0,
        NumarDeTelefon: "",
        Email: "",
        Parola: "",
        UserName: ""
    });
    const [visibility, setVisibility] = useState({
        showPassword: false
    })

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    useEffect(async () => {
        if (!id)//daca n am id inseamna ca sunt pe partea de adaugare deci fac return
            return;

        //daca am id vreau sa iau datele:
        let data = await get(utilizatorRoute, id);
        console.log(data);
        setUtilizator(data);
    }, [])

    const onChangeUtilizator = e => {
        e.preventDefault();
        e.stopPropagation();
        //se duce in obiectul magazin, ia proprietatile la rand 
        //name il ia din name setata mai jos - vezi TextField
        //numele trb sa coincida cu ce am setat pt obiect mai sus.
        setUtilizator({ ...utilizator, [e.target.name]: e.target.value });
    }

    const saveUtilizator = async () => {
        if (!utilizator.NumeUtilizator) {
            alert('Numele nu a fost completat');
        }
        else if (!utilizator.NumeUtilizator.match('^.{2,30}$')) {
            alert("Numele trebuie să aibă 2-30 caractere!");
        }
        else if (!utilizator.PrenumeUtilizator) {
            alert('Prenumele nu a fost completat');
        }
        else if (!utilizator.PrenumeUtilizator.match('^.{2,30}$')) {
            alert("Prenumele trebuie să aibă 2-30 caractere!");
        }
        else if (!utilizator.NumarDeTelefon) {
            alert('Numarul de telefon nu a fost completat');
        }
        else if(!utilizator.NumarDeTelefon.match('^[0-9\-\+]{9,15}$')){
            alert('Numar de telefon invalid!');
        }
        else if (!utilizator.Email) {
            alert('Email-ul nu a fost completat');
        }
        else if (!utilizator.Email.match('[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$')){
            alert('Email-ul este invalid!');
        }
        else if (!utilizator.UserName) {
            alert('Username-ul nu a fost completat');
        }
        else if (!utilizator.UserName.match('^.{2,30}$')) {
            alert("Username-ul trebuie să aibă 2-30 caractere!");
        }
        else if (!utilizator.Parola) {
            alert('Parola nu a fost completata');
        }
        else if (!utilizator.Parola.match('^.{2,30}$')) {
            alert("Parola trebuie să aibă 2-30 caractere!");
        }
        else if (!utilizator.VarstaUtilizator) {
            alert('Varsta nu a fost completata');
        }
        else if (isNaN(utilizator.VarstaUtilizator)) {
            alert('Varsta trebuie exprimata numeric');
        }
        else if (utilizator.VarstaUtilizator < 14) {
            alert('Doar persoanele peste 14 ani pot accesa site-ul!');
        }
        else{
            if (!id)//daca nu avem id sunt pe post altfel pe put
                await post(utilizatorRoute, utilizator);
            else
                await put(utilizatorRoute, id, utilizator);
            let data2 = await get(utilizatorRoute);
            let id2 = 0;
            for(let i=0; i< data2.length; i++){
                if(data2[i].UserName===utilizator.UserName && data2[i].Parola===utilizator.Parola)
                    id2 = data2[i].IDUtilizator;
            }
            navigate(`/PaginaProfilUtilizator/${id2}`);
        }

    }

    const handleChange = (prop) => (event) => {
        setVisibility({ ...visibility, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setVisibility({
            ...visibility,
            showPassword: !visibility.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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

            <Box
                style={{backgroundColor: "lightblue", marginTop:"15%", marginRight:"30%", marginLeft:"30%", borderRadius:"10px", padding: "15px"}}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        autoFocus
                        label="Nume"
                        name="NumeUtilizator"
                        id="NumeUtilizator"
                        value={utilizator.NumeUtilizator}
                        onChange={e => onChangeUtilizator(e)}
                    />

                    <TextField
                        required
                        autoFocus
                        label="Prenume"
                        name="PrenumeUtilizator"
                        id="PrenumeUtilizator"
                        value={utilizator.PrenumeUtilizator}
                        onChange={e => onChangeUtilizator(e)}
                    />
                </div>
                <div>
                    

                    <TextField
                        required
                        autoFocus
                        label="Numar de telefon"
                        name="NumarDeTelefon"
                        id="NumarDeTelefon"
                        value={utilizator.NumarDeTelefon}
                        onChange={e => onChangeUtilizator(e)}
                    />

                    <TextField
                        required
                        autoFocus
                        label="Email"
                        name="Email"
                        id="Email"
                        value={utilizator.Email}
                        onChange={e => onChangeUtilizator(e)}
                    />
                </div>
                <div>

                    <TextField
                        required
                        autoFocus
                        label="Username"
                        name="UserName"
                        id="UserName"
                        value={utilizator.UserName}
                        onChange={e => onChangeUtilizator(e)}
                    />
                    <TextField
                        required
                        autoFocus
                        label="Parola"
                        name="Parola"
                        id="Parola"
                        type={visibility.showPassword ? "text" : "password"}
                        value={utilizator.Parola}
                        onChange={e => onChangeUtilizator(e)}
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        // edge="end"
                        style={{
                            marginTop:
                                "20px"
                        }}
                    >
                        {visibility.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    
                </div>
                <div>
                    <TextField type="number"
                        required
                        autoFocus
                        label="Varsta"
                        name="VarstaUtilizator"
                        id="VarstaUtilizator"
                        value={utilizator.VarstaUtilizator}
                        onChange={e => onChangeUtilizator(e)}
                    />
                </div>
                <div>

                    <Button style={{ margin: "15px"}} color="primary" variant='outlined' startIcon={<SaveIcon />}
                        onClick={saveUtilizator}
                    >
                        Save
                    </Button>
                    
                    <Button style={{ margin: "15px"}} color="primary" variant='outlined' startIcon={<CancelIcon />}
                        onClick={() => { inapoi() }}
                    >
                        Cancel
                    </Button>

                    
                </div>
            </Box>

        </div>

    );
}
