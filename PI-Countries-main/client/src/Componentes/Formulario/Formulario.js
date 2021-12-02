import React from 'react';
import {useState,useEffect} from 'react';
import './css/Formulario.css'
//import { useParams } from "react-router-dom";
import { HelpPostActividad } from '../../helpers/HelpPostActividad';
import { HelpGetPaises } from '../../helpers/HelpGetPaises';
export const Formulario = ()=>{

    

    let [teclearPais,setteclearPais] = useState({
        name: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        pais: '',
    });

    let[buscarPais,setbuscarPais]= useState({
        paisEncontrado:[],
        paisSeleccionado:[]
    })

    useEffect(() => {
   
        if(teclearPais.pais !== ''){
          HelpGetPaises(`http://localhost:3001/countries?name=${teclearPais.pais}`)
          .then(res => setbuscarPais({
              ...buscarPais,
              paisEncontrado: res.data
          }))
        }
        
    },[teclearPais.pais])

    
    let [actividadEnviada,setActividadEnviada]=useState('')
    

    let cambios = (evento)=>{

        setteclearPais(() => {
            return {
              ...teclearPais,
              [evento.target.name]: evento.target.value,
            };
          });
     }

    let envioFormulario = async (evento)=>{
        evento.preventDefault()
        //validar
        
        if(!teclearPais.name || !teclearPais.duracion || !teclearPais.dificultad || !teclearPais.temporada){
            
            alert('todos los campos deben estar completos')
            
        }
        if(buscarPais.paisSeleccionado.length === 0){
            alert('Debes seleccionar al menos un pais')
        }
        else{
            
            let actividad = {
             nombre: teclearPais.name,
             dificultad: teclearPais.dificultad,
             duracion: teclearPais.duracion,
             temporada: teclearPais.temporada,
             paises: buscarPais.paisSeleccionado
     
             }
             
            await HelpPostActividad('http://localhost:3001/activity', actividad)
            
            setActividadEnviada(teclearPais.dificultad)

            setteclearPais({
                name: "",
                dificultad: "",
                duracion: "",
                temporada: "",
                pais: '',
            })
            setbuscarPais({
                paisSeleccionado:[]
            })
        }
        
        
        
    }
    
    
    useEffect(() => {
       
        setActividadEnviada('')
        
    }, [actividadEnviada])

    let agregarPais = ()=>{

        buscarPais.paisSeleccionado.push(teclearPais.pais)
        setteclearPais({
            ...teclearPais,
                pais: ''
        })

    }

    let eliminarPais = (p) => {

     let paisesFiltrados =  buscarPais.paisSeleccionado.filter( paises => paises !== p )

     setbuscarPais({
         ...buscarPais,
            paisSeleccionado:paisesFiltrados

        })
    }

    return(
        <div className='formulario_caja' >
            <form className='formulario_contenedor' onSubmit={envioFormulario}>
                <input type='text' placeholder='Nombre de la actividad' name="name" value={teclearPais.name} onChange={(evento) => cambios(evento)}/>
                <select  name="dificultad" value={teclearPais.dificultad} onChange={(evento) => cambios(evento)}>
                    <option value=""> Dificultad  </option>
                    <option name="dificultad" value="1"> 1  </option>
                    <option name="dificultad" value="2"> 2 </option>  
                    <option name="dificultad" value="3"> 3 </option>
                    <option name="dificultad" value="4"> 4 </option>
                    <option name="dificultad" value="5"> 5 </option>
                </select>
                
                <input type='text' placeholder='Tiempo de duracion' name='duracion'value={teclearPais.duracion} onChange={(evento) => cambios(evento)}/>
                <select name="temporada" value={teclearPais.temporada} onChange={(evento) => cambios(evento)}>
                    <option value="" > Temporada  </option> 
                    <option  value="Verano"> Verano  </option>
                    <option  value="Otoño"> Otoño </option>  
                    <option  value="Invierno"> Invierno </option>
                    <option  value="Primavera"> Primavera </option>
                </select>
                <div>
                    <input list="pais" type='text' placeholder='Pais donde se realiza' name='pais' value={teclearPais.pais} onChange={(evento) => cambios(evento)} />
                    <input type='button' onClick={agregarPais} value='Agregar pais'/>
                </div>
                <datalist id="pais" >
                    {
                        !buscarPais.paisEncontrado? 'Ingresar un pais' :buscarPais.paisEncontrado.map( pais => (
                            
                            <option key={pais.cca3} value={pais.nombre}/> 
                        ))

                    }
                 </datalist>
                 <div>
                     {buscarPais.paisSeleccionado.map( (p,i) => (
                         <div key={i} style={{display:'flex', justifyContent: 'center', alignItems: 'center',  }}>
                         <p > {p} </p>
                         <input type='button' style={{ height: '18px', padding: '0px 20px', marginLeft: '5px' , cursor: 'pointer' }} onClick={()=>eliminarPais(p)} value='X'/>
                         </div>
                     ))}
                 </div>
                <button>Crear</button>
                
            
            </form>
        </div>
    )
}

  