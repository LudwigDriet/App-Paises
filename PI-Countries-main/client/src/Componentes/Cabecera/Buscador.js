import React from 'react';
import {useState} from 'react';
export const Buscador = (props) => {
    let {setbuscarPais} = props;

    let [teclearPais,setteclearPais] = useState('');


    let cambios = (event)=>{

        setteclearPais(event.target.value)
        setbuscarPais(event.target.value)

    }

    return (
         <div>                                                                                     
             <input type='text' placeholder='Pais' value={teclearPais} onChange={(event)=>cambios(event)}/>

         </div>
    )

}

