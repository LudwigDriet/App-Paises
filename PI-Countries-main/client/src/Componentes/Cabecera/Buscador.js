import React from "react";
import { useState, useEffect } from "react";
import "./css/Cabecera.css";
import { useDispatch } from "react-redux";
import { getPaisesFiltrados, getPaises } from "../../store/actions/paises";
import { HelpGetPaises } from "../../helpers/HelpGetPaises";


export const Buscador = () => {
  
  const dispatch = useDispatch();
    
 
  let [buscarPais, setbuscarPais] = useState("");

  
  let URL = "http://localhost:3001/countries";
  useEffect(() => {
    if (buscarPais !== "") {
      HelpGetPaises(`http://localhost:3001/countries?name=${buscarPais}`)
        .then((res) => dispatch(getPaisesFiltrados(res.data)))
        .catch(() => alert('Pais no encontrado'));
    } else {
      dispatch(getPaises(URL));
    }
  }, [buscarPais, URL, dispatch]);

  let cambios = (event) => {
    setbuscarPais(event.target.value);
  };

  return (
    <div>
      <input
        className="clase_buscador"
        type="text"
        placeholder="Pais"
        onChange={(event) => cambios(event)}
      />
    </div>
  );
};
