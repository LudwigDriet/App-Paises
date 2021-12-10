import './App.css';
import React from 'react';
import  {Cabecera}  from './Componentes/Cabecera/Cabecera';
import { Paises } from './Componentes/Paises/Paises';
import { Routes,Route} from "react-router-dom";
import { DetallePais } from './Componentes/DetallePais/DetallePais';
import { Formulario } from './Componentes/Formulario/Formulario';
import { Inicio } from './Componentes/Inicio/Inicio';
import { Link } from 'react-router-dom';
// import { Error404 } from './Componentes/Error404/Error404';
// import { useDispatch } from 'react';
// import {getPaises}  from './store/actions/paises'
import { useState } from 'react';

function App() {
  
  let [paginaActual, setpaginaActual] = useState(0);
  
  

  return (
    <div className="App">
      
      
      <Routes>

        <Route path='/paises' element ={
            <div>
                <Link className='link' to={'/'} ><h1>App Paises</h1></Link>
                <Cabecera setpaginaActual={setpaginaActual}/>
         
                <Paises paginaActual={paginaActual} setpaginaActual={setpaginaActual} />
            </div>

        }/>
        
        <Route path='/detallePais/:idPais' element = {
              <div>
                <Link className='link' to={'/paises'}><h1>App Paises</h1></Link>
                <DetallePais/>
              </div>

          } />

        <Route path='/actividad' element = {
            <div>
              <Link className='link' to={'/paises'}><h1>App Paises</h1></Link>
              <Formulario/>
            </div>
      }/>
        {/* <Route path='/error' element = {<Error404/>} /> */}

        <Route path='/' element = {<Inicio/>} />
      </Routes>
    </div>
  );
}

export default App;
