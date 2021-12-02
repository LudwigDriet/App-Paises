import React from 'react';
import './css/Paginado.css'
export const Paginado = () => {

    return (
         <div className = 'paginado_contenedor'>
            
             <ul className='paginado_ul'>
                <li className='paginado_li'>Antes</li>
                 <li className='paginado_li'>1</li>
                 <li className='paginado_li'>2</li>
                 <li className='paginado_li'>3</li>
                 <li className='paginado_li'>4</li>
                 <li className='paginado_li'>Despues</li>
             </ul>
             
        </div>
    )

}