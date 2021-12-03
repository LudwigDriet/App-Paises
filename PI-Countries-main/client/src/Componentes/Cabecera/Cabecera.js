import React from 'react';
//import {useState} from 'react';
import { Buscador } from './Buscador';
import { Filtros } from './Filtros';
import './css/Cabecera.css'


export const Cabecera = (props) => {

  let  {setPaises,paises,copiapaises} = props
 

    return (
         <div className='cabecera_contenedor'>
           <div className='cabecera_sub_contenedor' > 
               <Buscador setbuscarPais={props.setbuscarPais}/>
                <Filtros setPaises={setPaises} paises={paises} copiapaises={copiapaises}/>
             </div>
         </div>
       
    )

}