import React from 'react';
import './css/Inicio.css'
import { Link } from 'react-router-dom';

export const Inicio = () =>{



    return (
        <div className='inicio_contenedor'>
            <div className='titulo'>
                <h2 >App Paises</h2>
            </div>
            <div >
                <Link to={'/paises'}>
                <button className='boton_inicio'>INICIO</button>
                </Link>
            </div>
            
        </div>
    )
}