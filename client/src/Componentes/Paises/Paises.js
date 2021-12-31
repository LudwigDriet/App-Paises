import React from "react";
import { useState, useEffect } from "react";
import { Pais } from "../Pais/Pais";
import { useSelector, useDispatch } from "react-redux";
import { getPaises } from "../../store/actions/paises";
import "./css/Paises.css";

export const Paises = (props) => {
  const paisesReducer = useSelector((state) => state.paisesReducer);

  let { paginaActual, setpaginaActual } = props;
  let [paises, setPaises] = useState([]);

  const dispatch = useDispatch();
  let URL = `/${REACT_APP_API}/countries`;

  useEffect(() => {
    dispatch(getPaises(URL));
  }, [dispatch, URL]);

  useEffect(() => {
    setPaises(paisesReducer.data);
  }, [paisesReducer.data]);

  let proximo = 0;
  const paginacion = () => {
    if (proximo === 0 && paginaActual === 0) {
      if (paises.length) {
        proximo = proximo + 8;
        return paises.slice(paginaActual, paginaActual + 8);
      }

      return [];
    }
    if (paginaActual >= 8) {
      if (paises.length) {
        return paises.slice(paginaActual, paginaActual + 8);
      }

      return [];
    }
  };

  const paginaSiguiente = () => {
    if (paises.length > paginaActual + 8) {
      if (proximo === 9) {
        paginaActual = paginaActual + 8;
        setpaginaActual(paginaActual);
      } else {
        setpaginaActual(paginaActual + 8);
      }
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 8) {
      setpaginaActual(paginaActual - 8);
    }
    if (paginaActual === 8) {
      setpaginaActual(paginaActual - 8);
    }
  };
  const arrayPaises = paginacion();

  return (
    <div>
      <div className="paises_contenedor">
        {arrayPaises.map((pais) => (
          <div key={pais.cca3}>
            <Pais
              bandera={pais.bandera}
              nombre={pais.nombre}
              continente={pais.continente}
              cca3={pais.cca3}
            />
          </div>
        ))}
      </div>
      <div className="botones_paginado">
        <button
          className="boton_boton"
          onClick={(e) => {
            paginaAnterior(e);
          }}>
          Acterior
        </button>
        <button
          className="boton_boton"
          onClick={(e) => {
            paginaSiguiente(e);
          }}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
