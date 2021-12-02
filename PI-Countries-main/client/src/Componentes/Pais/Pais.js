import React from 'react';
import './css/Pais.css'
import { Link } from 'react-router-dom';

export const Pais = (props) => {
    let {bandera,nombre,continente,cca3}=props;
    
    return (
        <div >
            <Link className='link' to={`/detallePais/${cca3}`}>
         <div className='pais_contenedor' >
               <div className='pais_bandera'><img width='50%' src={bandera} alt = 'imagen bandera'/></div>
               <div><h3>{nombre}</h3><h4>{continente}</h4></div>
            

         </div>
            </Link>
         </div>
    )

}