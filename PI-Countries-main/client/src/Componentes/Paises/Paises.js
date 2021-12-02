import React from 'react';
//import {useState,useEffect} from 'react';
import {Pais} from '../Pais/Pais';

import './css/Paises.css'

export const Paises = (props) => {

    let {paises}= props;

    
    
    return (
         <div className = 'paises_contenedor'>

        {
            
          paises.map(pais => (
                <div key={pais.cca3}>

                    <Pais bandera ={pais.bandera} nombre ={pais.nombre} continente={pais.continente} cca3={pais.cca3}/>


                </div>
            ))
        
        }
             
         </div>
    )

}