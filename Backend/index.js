import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import db from './dbConfig.js';
import {DB_USERNAME, DB_PASSWORD} from './Consts.js';
import Experienta from './entities/Experienta.js';
import Utilizator from './entities/Utilizator.js';
import LikeOp from './Operators.js';

/*
npm init urmat de cateva enter-uri
npm install
npm install express
npm install cors
npm install body-parser

proiectele sunt rulate cu npm start ce trb configurat in package.json in scripts
"start": "node index" si porneste cu fisierul index

de adaugat ini package.json: "type":"module", 
fix inainte de dependencies

pentru code first la db, adaugam 2 librarii:
npm install sequelize
npm install mysql2

ctrl+c pt a inchide terminalul
*/

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

let conn;

// -------------------------------------------------------- CONEXIUNE LA BD --------------------------------------------------------
mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then(connection => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS ProiectTW");
})
.then(() => {
    return conn.end();
})
.catch((err) => {
    console.warn(err.stack);
})

Utilizator.hasMany(Experienta, {as : "Experiente", foreignKey: "IDUtilizator"});
Experienta.belongsTo(Utilizator, {foreignKey: "IDUtilizator"});

// Employee.hasMany(Adresa, {as : "Adrese", foreignKey: "EmployeeId"});
// Adresa.belongsTo(Employee, {foreignKey: "EmployeeId"});
db.sync();

// -------------------------------------------------------- BEGIN LOGIC --------------------------------------------------------

//imi aduce utilizatorii
async function getUtilizator(){
    try{
    return await Utilizator.findAll({include: ["Experiente"]});
    }
    catch(e){
        console.log(e);
    }
}
async function getUtilizatorById(id){
    return await Utilizator.findByPk(id);
}

//prin post cream un utilizator
async function createUtilizator(utilizator){
    try{
        return await Utilizator.create(utilizator, {include: [{model: Experienta, as : "Experiente"}]});
    }
    catch(e){
        console.log(e);
    }
}

//imi aduce experientele
async function getExperienta(){
    try{
        return await Experienta.findAll();
    }
    catch(e){
        console.log(e);
    }
}

//imi aduce o experienta
async function getExperientaById(id){
    return await Experienta.findByPk(id);
}

//prin post cream o experienta
async function createExperienta(experienta){
    try{
        return await Experienta.create(experienta);
    }
    catch(e){
        console.log(e);
    }
}

//filtram experientele dupa Id Utilizator
async function filterExperiente(filter){
    try{
        let whereClause = {};
        if(filter){
            whereClause.IDUtilizator = filter;
        }
        return await Experienta.findAll({
            where: whereClause,
        }); 
    }
    catch(e){
        console.log(e);
    }   
}

//functie care sterge o experienta based on id-ul ei
function stergeExperienta(req,res){
  
    Experienta.destroy({
        where:{
            IDExperienta:req.params.id
        }
    }).then(function (deletedRecord){
        if(deletedRecord === 1){
            return "Stergerea a fost efectuata cu success";        
        }
        else
        {
            return "Nu a fost gasita experienta";
        }
    }).catch(function (error){
        console.log(error);
    });
   
}

//update la experienta
async function updateExperienta(id, experienta){
    if (parseInt(id) !== experienta.IDExperienta){
        console.log("Entity id different");
        return;
    }

    let updateEntity = await Experienta.findByPk(id);

    if (!updateEntity){
        console.log("Nu exista o experienta cu acest id in baza de date");
        return;
    }

    return await updateEntity.update(experienta);
}

//functie care sterge un utilizator based on id-ul lui
function stergeUtilizator(req,res){
    Utilizator.destroy({
        where:{
            IDUtilizator:req.params.id
        }
    }).then(function (deletedRecord){
        if(deletedRecord === 1){
            return "Stergerea a fost efectuata cu success";        
        }
        else
        {
            return "Nu a fost gasit utilizatorul";
        }
    }).catch(function (error){
        console.log(error);
    });
}

//update la utilizator
async function updateUtilizator(id, utilizator){
    if (parseInt(id) !== utilizator.IDUtilizator){
        console.log("Entity id different");
        return;
    }

    let updateEntity = await Utilizator.findByPk(id);

    if (!updateEntity){
        console.log("Nu exista un utilizator cu acest id in baza de date");
        return;
    }
    return await updateEntity.update(utilizator);
}
// -------------------------------------------------------- END LOGIC --------------------------------------------------------

// -------------------------------------------------------- BEGIN ROUTES --------------------------------------------------------

// ruta de get care ne afiseaza toti utilizatorii 
router.route('/utilizator').get(async(req,res) => {
    return res.json(await getUtilizator());
})

// ruta de get care ne afiseaza toti utilizatorii 
router.route('/utilizator/:id').get(async(req,res) => {
    return res.json(await getUtilizatorById(req.params.id));
})

// ruta de post care creaza un utilizator
router.route('/utilizator').post(async(req,res) => {
    return res.send(201).json(await createUtilizator(req.body));
})



// ruta de get care ne afiseaza toate experientele
router.route('/experienta').get(async(req,res) => {
    return res.json(await getExperienta());
})

// ruta de post care creaza o experienta
router.route('/experienta').post(async(req,res) => {
    return res.send(201).json(await createExperienta({...req.body,IDUtilizator: req.body.IDUtilizator}));
//ia toate valorile alea si adauga IDUtilizator:1
})

router.route('/experientaEdit/:id').get(async(req, res) => {
    try{
        return res.json(await getExperientaById(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

// ruta de get a experientelor filtrate
// se apeleaa cu ruta urmata de ? si dupa cum filtram
// ... filtrareExperiente?PunctPlecare=Obor&PunctSosire=Viitorului
// Cand avem string din mai multe cuvinte, se concateneaza cu + 
// aka PunctSosire = Piata+Victoriei
router.route('/experienta/:id').get(async (req, res) => {
    return res.json(await filterExperiente(req.params.id));
})

//ruta de stergere pentru a sterge o experienta
router.route("/experienta/:id").delete((req, res) => {
    return res.json(stergeExperienta(req,res));
})

//ruta de update pt a modifica datele dintr-o experienta
//la testare in body trebuie pus si id-ul pe care il modificam!!
router.route('/experienta/:id').put(async(req, res) => {
    try{
        return res.json(await updateExperienta(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

//ruta de stergere pentru a sterge un utilizator
router.route("/utilizator/:id").delete((req, res) => {
    return res.json(stergeUtilizator(req,res));
})

//ruta de update pt a modifica datele dintr-un utilizator
//la testare in body trebuie pus si id-ul pe care il modificam!!
router.route('/utilizator/:id').put(async(req, res) => {
    try{
        return res.json(await updateUtilizator(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

// -------------------------------------------------------- END ROUTES --------------------------------------------------------


let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);


/*
    "NumeUtilizator": "NumeUtilizator1",
    "VarstaUtilizator": 111,
    "NumarDeTelefon": "NumarDeTelefon1",
    "Email": "Email1"
*/
/*
    "PunctPlecare": "Test1PctPlecare",
    "PunctSosire": "Test1PctSosire",
    "Localitate": "Test1Localitate",
    "MijlocTransport": "Test1MijlocTransport",
    "OraPlecare": 12,
    "DurataCalatorie": 30,
    "GradAglomerare": 22,
    "Observatii": "Test1Observatii",
    "NivelSatisfactie": 1111
*/

/*
{
    "NumeUtilizator": "NumeUtilizator3",
    "VarstaUtilizator": 23,
    "NumarDeTelefon": "NumarDeTelefon3",
    "Email": "Email3",
    "Experiente":[
        {
            "PunctPlecare": "Test1PctPlecare",
            "PunctSosire": "Test1PctSosire",
            "Localitate": "Test1Localitate",
            "MijlocTransport": "Test1MijlocTransport",
            "OraPlecare": 1,
            "DurataCalatorie": 1,
            "GradAglomerare": 1,
            "Observatii": "Test1Observatii",
            "NivelSatisfactie": 1
        },
        {
            "PunctPlecare": "Test2PctPlecare",
            "PunctSosire": "Test2PctSosire",
            "Localitate": "Test2Localitate",
            "MijlocTransport": "Test2MijlocTransport",
            "OraPlecare": 2,
            "DurataCalatorie": 2,
            "GradAglomerare": 2,
            "Observatii": "Test2Observatii",
            "NivelSatisfactie": 2
        }
    ]
}
*/
