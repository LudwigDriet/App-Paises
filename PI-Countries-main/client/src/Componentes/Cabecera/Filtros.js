import React from "react";
import { useState, useEffect} from "react";
import { HelpGetPaises } from "../../helpers/HelpGetPaises";

export const Filtros = (props) => {

    let {setPaises,paises}= props;


  let [alfa,setalfa]=useState('')

  let [continente,setcontinente]=useState('')

  let [poblacion,setpoblacion]=useState('')

  let [actividad,setactividad]=useState('')

  let [traerActividad,settraerActividad]=useState([])

  let [data,setdata]=useState([])

  useEffect(()=>{

    if(alfa !==""){
      alfa === "A-Z" 
      ? HelpGetPaises('http://localhost:3001/az').then(res => setPaises(res.data)) 
      : HelpGetPaises('http://localhost:3001/za').then(res => setPaises(res.data))
     }
     setalfa('')

     if(poblacion !==""){
      poblacion === "Menor" 
      ? HelpGetPaises('http://localhost:3001/poblacionmenos').then(res => setPaises(res.data)) 
      : HelpGetPaises('http://localhost:3001/poblacionmas').then(res => setPaises(res.data))
     }
     setpoblacion('')

     if(continente !==""){
      HelpGetPaises(`http://localhost:3001/continente/${continente}`).then(res => setPaises(res.data))
     }
     setcontinente('')

     HelpGetPaises('http://localhost:3001/actividades').then(res => settraerActividad(res.data))

     HelpGetPaises('http://localhost:3001/data').then(res => setdata(res.data))

     if(actividad !==''){
      //  paises.filter(pais=>pais.id===traerActividad.indexOf(pais.id))
     let traerac =  data.filter(a =>{
      return a.actividadId.toString() === actividad
      })
        let atr=[];
      for (let i = 0; i < paises.length; i++) {
        for (let j = 0; j < traerac.length; j++) {
          
          if(paises[i].cca3 === traerac[j].countryCca3){
            atr.push(paises[i])
          }
          
        }
      }

      // let pa = paises.filter(p=>{
      //  return traerac.filter(a=>{
      //    return p.cca3 ===  a.countryCca3
      //   })
      // })
      // traerac[0](p=>{
        
      //   setPaises(p.countryCca3 === paises.cca3)
      // })
      console.log(atr)
      console.log(traerac)
      setPaises(atr)
     }
     
    //  {
    //   let actividadFiltrada
    //   let act = paises.map(pais=>{

    //     pais.actividads.id === actividad

    //     if(pais?.actividads?.length>0){
          
    //      actividadFiltrada = pais.actividads.filter( a => a.id === actividad )
    //     }
          
    //     return actividadFiltrada
    //  }
    //  )

    //  console.log(act)
    //  }

    },[alfa,poblacion,continente,actividad])

  return (
    <div className = 'filtros_contenedor'>
      <div>
        <select name="Ordenar" id="orden" onChange={(evento)=>setalfa(evento.target.value)} >
          <option disabled selected={true}>Ordenar Alfabeticamente</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
         
        </select>
      </div>
      <div>
        <select name="Continente" id="continente" onChange={(evento)=>setcontinente(evento.target.value)}>
          <option disabled selected={true}>Ordenar por Continente</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Americas">America</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        
        </select>
      </div>
      <div>
        <select name="Actividad" id="actividad" onChange={(evento)=>setactividad(evento.target.value)}>
          <option disabled selected={true}>Ordenar por Actividad</option>
          {traerActividad.map(actividad=>(
            
            <option key={actividad.id} value={actividad.id}>{actividad.nombre}</option>
          ))}
         
        </select>
      </div>
      <div>
        <select name="Poblacion" id="poblacion" onChange={(evento)=>setpoblacion(evento.target.value)}>
          <option disabled selected={true}>Ordenar por Poblacion</option>
          <option value="Mayor">Mayor Poblacion</option>
          <option value="Menor">Menor Poblacion</option>
         
        </select>
      </div>
    </div>
  );
};
