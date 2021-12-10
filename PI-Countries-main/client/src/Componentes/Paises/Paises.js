import React from 'react';
import {useState,useEffect} from 'react';
import {Pais} from '../Pais/Pais';
import { useSelector, useDispatch } from "react-redux";
import { getPaises } from '../../store/actions/paises';
import './css/Paises.css'

export const Paises = (props) => {
const paisesReducer =  useSelector(state => state.paisesReducer)
    
let{paginaActual,setpaginaActual}=props;
  let [paises,setPaises] = useState([]);
    
  
  
        const dispatch = useDispatch()
        let URL = 'http://localhost:3001/countries';
        
        
  
  
    //     function handleClick(e) {
    // e.preventDefault();
    // dispatch(getPaises(URL));
    // setpaginaActual(0);
    //     }
            
            useEffect(() => {
                
                dispatch(getPaises(URL))
            }, [dispatch,URL])
            
            useEffect(() => {
            setPaises(paisesReducer.data)
          }, [paisesReducer.data])


       
        //   let [paginaActual, setpaginaActual] = useState(0);

          let proximo = 0;
          const paginacion = () => {
              if((proximo === 0) && (paginaActual === 0)){
                         
                  if (paises.length) {
                      proximo = proximo + 9;
                      return paises.slice(paginaActual, paginaActual + 9);
                  }
                  
                  return [];
              }   
              if(paginaActual >= 9) {
                  
                  if(paises.length) {
                      return paises.slice(paginaActual, paginaActual + 10);
                  }
                 
                  return [];
              }
          }
          
          const paginaSiguiente = () => {
              if(paises.length > paginaActual + 10) {
                  if(proximo === 9) {
                    paginaActual = paginaActual + 9;
                      setpaginaActual(paginaActual);
                  } else {
                      setpaginaActual(paginaActual + 10)
                  }
              }
              
          }
          
          const paginaAnterior = () => {
              if(paginaActual > 9) {
                  setpaginaActual(paginaActual - 10);
              }
              if(paginaActual === 9) {
                  setpaginaActual(paginaActual -9);
              }
          }
          const arrayPaises = paginacion();







    return (
      <div>
         <div className = 'paises_contenedor'>
        

        {
            
            
            arrayPaises.map(pais => (
                <div key={pais.cca3}>

                    <Pais bandera ={pais.bandera} nombre ={pais.nombre} continente={pais.continente} cca3={pais.cca3}/>


                </div>
            ))
        
        }
         </div>
             <div className='botones_paginado'>
                <button className='boton_boton' onClick={e => {paginaAnterior(e)}}>Acterior</button> 
                <button className='boton_boton' onClick={e => {paginaSiguiente(e)}}>Siguiente</button>
            </div>
            </div>
    )

}