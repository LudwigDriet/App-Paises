import React from "react";
import { useState, useEffect } from "react";
import "./css/DetallePais.css";
import { useParams } from "react-router-dom";
import { HelpGetPaises } from "../../helpers/HelpGetPaises";
import { Link } from "react-router-dom";

export const DetallePais = () => {
  let params = useParams();

  let [detallePais, setdetallePais] = useState([]);
  useEffect(() => {
    HelpGetPaises(`https://app-paises.herokuapp.com/countries/${params.idPais}`).then(
      (res) => setdetallePais(res.data)
    );
  }, [params.idPais]);

  return (
    <div className="contenedor">
    <div className="detalle_contenedorgeneral">
      <div className="detalle_contenedor">
        <div className="detalle_bandera">
          <div>
            <img
              alt={detallePais.nombre}
              width="70%"
              style={{ marginTop: "10px" }}
              src={detallePais.bandera}
            />
          </div>
          <div>
            <h2>Nombre: {detallePais.nombre}</h2>
            <h4>{detallePais.cca3}</h4>
            <h2>Continente: {detallePais.continente}</h2>
            <h3>Region: {detallePais.region}</h3>
            <h4>Area: {detallePais.area} KM2</h4>
            <h4>Poblacion: {detallePais.poblacion}</h4>
          </div>
        </div>
        <div className="detalle_bandera">
          <div>
            <h2 style={{ marginLeft: "10px", marginRight: "10px" }}>
              Actividades Turisticas:
            </h2>
          </div>
          {detallePais.actividads
            ? detallePais.actividads.map((actividad) => {
                return (
                  <div key={actividad.id} className="detalle_actividad">
                    <h3>{actividad.nombre} :</h3>
                    <h4>Dificultad: {actividad.dificultad}</h4>
                    <h4>Duration: {actividad.duracion} </h4>
                    <h4>Temporada: {actividad.temporada}</h4>
                  </div>
                );
              })
            : "Agrega una actividad"}
          <div>
            <Link to={"/actividad"}>
              <button className="detalle_boton">AGRECAR ACTIVIDAD</button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    </div>
  );
};
