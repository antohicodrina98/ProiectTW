import logo from './logo.svg';
import './App.css';
import ExperientaList from './components/ExperientaList';
import ExperientaEdit from './components/ExperientaEdit';
import UtilizatorEdit from './components/UtilizatorEdit';
import Main from './components/Main';
import Logare from './components/Logare';
import ModificareDateProfil from './components/ModificareDateProfil';
import DataTable from './components/ExperientaListFilter';
import PaginaProfilUtilizator from './components/PaginaProfilUtilizator';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/LogareUtilizator" element={<Logare/>}/>
          <Route path="/AddUtilizator" element={<UtilizatorEdit/>}/>
          <Route path="/ExperientaList" element={<ExperientaList/>}/>
          <Route path="/ExperientaList/:id" element={<ExperientaList/>}/>
          <Route path="/ExperientaList/ExperientaEdit/:id" element={<ExperientaEdit/>}/>
          <Route path="/ExperientaList/ExperientaEdit/:id/:idExp" element={<ExperientaEdit/>}/>
          <Route path="/ModificareProfil" element={<ModificareDateProfil/>}/>
          <Route path="/ExperientaListFilter" element={<DataTable/>}/>
          <Route path="/PaginaProfilUtilizator/:id" element={<PaginaProfilUtilizator/>}/>
          <Route path="/PaginaProfilUtilizator/:id/ExperientaListFilter" element={<DataTable/>}/>
          <Route path="/PaginaProfilUtilizator/:id/ExperientaList" element={<ExperientaList/>}/>
          <Route path="/PaginaProfilUtilizator/UtilizatorEdit/:id" element={<UtilizatorEdit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//npm install @material-ui/core
//npm install @material-ui/icons
//npm install @material-ui/lab
//npm install react-router-dom
//npm install axios