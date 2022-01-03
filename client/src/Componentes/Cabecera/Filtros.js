import React from "react";
import { useState, useEffect } from "react";
import { HelpGetPaises } from "../../helpers/HelpGetPaises";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaisesFiltrados } from "../../store/actions/paises";
import { getPaises } from "../../store/actions/paises";

export const Filtros = (props) => {
  let { setpaginaActual } = props;

  let paisesReducer = useSelector((state) => state.paisesReducer);
  const dispatch = useDispatch();
  let URL = "https://app-paises.herokuapp.com/countries";

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPaises(URL));
    setpaginaActual(0);
  }

  let [alfa, setalfa] = useState("");

  let [continente, setcontinente] = useState("");

  let [poblacion, setpoblacion] = useState("");

  let [actividad, setactividad] = useState("");

  let [traerActividad, settraerActividad] = useState([]);

  let [actividadPorPais, setactividadPorPais] = useState([]);

  let [copiapaises, setcopiaPaises] = useState([]);

  let [crearCopiaPais, setcrearCopiaPais] = useState(true);

  let [selectEstado, setselectEstado] = useState("DEFAULT");

  if (crearCopiaPais && paisesReducer.fetched) {
    setcopiaPaises(paisesReducer.data);
    setcrearCopiaPais(false);
  }

  useEffect(() => {
    if (alfa !== "") {
      alfa === "A-Z"
        ? HelpGetPaises("https://app-paises.herokuapp.com/az").then((res) => {
            dispatch(getPaisesFiltrados(res.data));
          })
        : HelpGetPaises("https://app-paises.herokuapp.com/za").then((res) => {
            dispatch(getPaisesFiltrados(res.data));
          });
    }
    setalfa("");

    if (poblacion !== "") {
      poblacion === "Menor"
        ? HelpGetPaises("https://app-paises.herokuapp.com/poblacionmenos").then((res) => {
            dispatch(getPaisesFiltrados(res.data));
          })
        : HelpGetPaises("https://app-paises.herokuapp.com/poblacionmas").then((res) => {
            dispatch(getPaisesFiltrados(res.data));
          });
    }
    setpoblacion("");

    if (continente !== "") {
      HelpGetPaises(`https://app-paises.herokuapp.com/continente/${continente}`).then(
        (res) => {
          dispatch(getPaisesFiltrados(res.data));
        }
      );
    }
    setcontinente("");

    HelpGetPaises("https://app-paises.herokuapp.com/actividades").then((res) => {
      settraerActividad(res.data);
    });
    if (actividadPorPais !== "") {
      HelpGetPaises("https://app-paises.herokuapp.com/actividadPorPais").then((res) =>
        setactividadPorPais(res.data)
      );
    }

    if (actividad !== "") {
      let actividadEncontrada = actividadPorPais.filter((a) => {
        return a.actividadId.toString() === actividad;
      });

      let paisesParaMostrar = [];

      for (let i = 0; i < copiapaises.length; i++) {
        for (let j = 0; j < actividadEncontrada.length; j++) {
          if (copiapaises[i].cca3 === actividadEncontrada[j].countryCca3) {
            paisesParaMostrar.push(copiapaises[i]);
          }
        }
      }

      dispatch(getPaisesFiltrados(paisesParaMostrar));
    }

    setactividad("");

    setselectEstado("DEFAULT");
  }, [alfa, poblacion, continente, actividad, selectEstado]);

  return (
    <div className="filtros_contenedor">
      <div>
        <select
          value={selectEstado}
          className="select_filtro"
          name="Ordenar"
          id="orden"
          onChange={(evento) => setalfa(evento.target.value)}>
          <option value={selectEstado} disabled>
            Ordenar Alfabeticamente
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      <div>
        <select
          value={selectEstado}
          className="select_filtro"
          name="Continente"
          id="continente"
          onChange={(evento) => setcontinente(evento.target.value)}>
          <option value={selectEstado} disabled>
            Ordenar por Continente
          </option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Americas">America</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div>
        <select
          value="DEFAULT"
          className="select_filtro"
          name="Actividad"
          id="actividad"
          onChange={(evento) => setactividad(evento.target.value)}>
          <option value="DEFAULT">Ordenar por Actividad</option>
          {traerActividad.map((actividad) => (
            <option key={actividad.id} value={actividad.id}>
              {actividad.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectEstado}
          className="select_filtro"
          name="Poblacion"
          id="poblacion"
          onChange={(evento) => setpoblacion(evento.target.value)}>
          <option value={selectEstado} disabled>
            Ordenar por Poblacion
          </option>
          <option value="Mayor">Mayor Poblacion</option>
          <option value="Menor">Menor Poblacion</option>
        </select>
      </div>
      <Link to={"/actividad"}>
        {" "}
        <button className="boton_crear">Crear Actividad</button>{" "}
      </Link>
      <button
        className="boton_crear"
        onClick={(e) => {
          handleClick(e);
        }}>
        Recargar Paises
      </button>
    </div>
  );
};
