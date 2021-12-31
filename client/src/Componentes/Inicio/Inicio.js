import React from "react";
import "./css/Inicio.css";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <div className="inicio_contenedor">
      <Link className="titulo" to={"/paises"}>
        <div className="boton_inicio">
          <h2 className="titulo_letra">App Paises</h2>
        </div>
      </Link>
    </div>
  );
};
