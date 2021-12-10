import React from 'react';
//import {useState} from 'react';
import { Buscador } from './Buscador';
import { Filtros } from './Filtros';
import './css/Cabecera.css'


export const Cabecera = (props) => {
  let {setpaginaActual}= props

   return (
         <div className='cabecera_contenedor'>
           <div className='cabecera_sub_contenedor' > 
               <Buscador />
                <Filtros setpaginaActual={setpaginaActual}/>
             </div>
         </div>
       
    )

}