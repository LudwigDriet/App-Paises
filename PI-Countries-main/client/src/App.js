import './App.css';
import React from 'react';
import {useState,useEffect} from 'react';
import  {Cabecera}  from './Componentes/Cabecera/Cabecera';
import {Paginado} from './Componentes/Paginado/Paginado';
import { Paises } from './Componentes/Paises/Paises';
import { HelpGetPaises } from './helpers/HelpGetPaises';
import { Routes,Route} from "react-router-dom";
import { DetallePais } from './Componentes/DetallePais/DetallePais';
import { Formulario } from './Componentes/Formulario/Formulario';
import { Inicio } from './Componentes/Inicio/Inicio';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const paisesReducer = useSelector(state => state.paisesReducer)

  const dispatch = useDispatch()

  
 

  let [buscarPais,setbuscarPais] = useState('');
  let [paises,setPaises] = useState([]);
  let [copiapaises,setcopiaPaises] = useState([]);
  let [cargarpagina,setcargarpagina] = useState(true);
  
  

  let entrar = ()=>{
    setcargarpagina(true)
    setPaises([])
  }

  useEffect(() => {
    if(cargarpagina){
      HelpGetPaises('http://localhost:3001/countries')
      .then(res => {
        setPaises(res.data)
        setcopiaPaises(res.data)
        setcargarpagina(false)
      })
    }
  }, [paises])



  useEffect(() => {
   
      if(buscarPais !== ''){
        HelpGetPaises(`http://localhost:3001/countries?name=${buscarPais}`)
        .then(res => setPaises(res.data))
      }
      
  },[buscarPais])


  return (
    <div className="App">
      
      
      <Routes>

        <Route path='/paises' element ={
            <div>
                <Link className='link' to={'/paises'} onClick={()=>entrar()}><h1>Henry Countries</h1></Link>
                <Cabecera setbuscarPais={setbuscarPais} setPaises={setPaises} paises={paises} copiapaises={copiapaises}/>
                <Paises paises={paises}/>
                <Paginado/>
            </div>

        }/>
        
        <Route path='/detallePais/:idPais' element = {
          <div>
            <Link className='link' to={'/paises'} onClick={()=>entrar()}><h1>Henry Countries</h1></Link>
            <DetallePais/>
          </div>
            } />
        <Route path='/actividad' element = {
          <div>
              <Link className='link' to={'/paises'} onClick={()=>entrar()}><h1>Henry Countries</h1></Link>
              <Formulario/>
           </div>
      }/>
        <Route path='/' element = {<Inicio/>} />
      </Routes>
    </div>
  );
}

export default App;
