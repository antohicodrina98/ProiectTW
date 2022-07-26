import { Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet';

export default function Main() {

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    return (
        <div style={{backgroundColor: "lightblue", marginTop:"15%", marginRight:"30%", marginLeft:"30%", borderRadius:"10px", padding: "15px"}}>
            <Helmet>
                <style>{'body { background-color: rgb(136, 128, 197); }'}</style>
            </Helmet>
            <h1>PAGINA PRINCIPALA</h1>
            <div >
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate("/AddUtilizator") }}
                >
                    Înregistrare
                </Button>
            </div>
            <br></br>
            <div>
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate("/LogareUtilizator") }}
                >
                    Logare
                </Button>
            </div>
            <br></br>
            <div>
                <Button color="primary" variant='outlined'
                    onClick={() => { navigate("/ExperientaListFilter") }}
                >
                    Continuă fără cont
                </Button>
            </div>
        </div>

    )
}