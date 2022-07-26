import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import { post, put, get } from '../Calls';
import { utilizatorRoute } from '../ApiRoutes';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet';

export default function Logare() {

    const [utilizator, setUtilizator] = useState({
        Parola: "",
        UserName: ""
    });
    const [visibility, setVisibility] = useState({
        showPassword: false
    })

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    const logareUtilizator = async () => {
        if (!utilizator.UserName) {
            alert('Username-ul nu a fost completat');
        }
        else if (!utilizator.Parola) {
            alert('Parola nu a fost completata');
        }
        else{
            let utilizatorExistent = false;
            let data = await get(utilizatorRoute, id);
            let idUtilizator = -1;
            for(let i=0; i< data.length; i++){
                if(data[i].UserName == utilizator.UserName && data[i].Parola == utilizator.Parola){
                    idUtilizator = data[i].IDUtilizator;
                    utilizatorExistent = true;
                }
            }
    
            if(utilizatorExistent){
                //navigare la pagina de profil
                navigate(`/PaginaProfilUtilizator/${idUtilizator}`)
            }
            else {
                alert('Date incorecte!');
            }
        }
        
    }

    const onChangeUtilizator = e => {
        e.preventDefault();
        e.stopPropagation();
        //se duce in obiectul magazin, ia proprietatile la rand 
        //name il ia din name setata mai jos - vezi TextField
        //numele trb sa coincida cu ce am setat pt obiect mai sus.
        setUtilizator({ ...utilizator, [e.target.name]: e.target.value });
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

    
    return (
        <div>
            <Helmet>
                <style>{'body { background-color: rgb(136, 128, 197); }'}</style>
            </Helmet>
            <Box style={{ backgroundColor: "lightblue", marginTop: "15%", marginRight: "30%", marginLeft: "30%", borderRadius: "10px", padding: "15px" }}
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
                        label="Username"
                        name="UserName"
                        id="UserName"
                        value={utilizator.Username}
                        onChange={e => onChangeUtilizator(e)}
                    />
                </div>
                <div>
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
                    <Button style={{ margin: "15px" }}
                        color="primary"
                        variant='outlined'
                        onClick={logareUtilizator}
                    >
                        Log-in
                    </Button>

                    <Button style={{ margin: "15px" }}
                        color="primary"
                        variant='outlined'
                        startIcon={<CancelIcon />}
                        onClick={() => { navigate("/") }}
                    >
                        Cancel
                    </Button>
                   
                </div>
            </Box>
        </div>

    );
}