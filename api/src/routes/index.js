const { Router } = require("express");
const axios = require("axios");
const { Country, Actividad, coun_act } = require("../db");
const router = Router();

const getDataApi = async () => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3/all");

    const dataApi = data.map((c) => {
      return {
        cca3: c.cca3,
        nombre: c.name.common,
        bandera: c.flags[0],
        continente: c.region,
        capital: c.capital ? c.capital[0] : "No tiene capital",
        region: c.subregion,
        area: c.area,
        poblacion: c.population,
      };
    });
    await Country.bulkCreate(dataApi);
  } catch (err) {
    console.log(err);
  }
};

// Configurar los routers

let cargada = false;

router.get("/countries", async (req, res) => {
  let name = req.query.name;

  if (!name) {
    try {
      if (!cargada) {
        await getDataApi();
        cargada = true;
      }

      let todosPaises = await Country.findAll({
        include: { model: Actividad, through: { attributes: [] } },
      });
      return res.status(200).send(todosPaises);
    } catch (error) {
      return res.status(404).send(error);
    }
  } else {
    const buscarPais = await Country.findAll({
      include: { model: Actividad, through: { attributes: [] } },
    });

    let paisEncontrado = await buscarPais.filter((pais) => {
      return pais.nombre.toLowerCase().includes(name.toLowerCase());
    });

    paisEncontrado.length
      ? res.send(paisEncontrado)
      : res.status(404).send("Pais no encontrado");
  }
});

router.get("/countries/:idPais", async (req, res) => {
  let idPais = req.params.idPais.toUpperCase();

  try {
    let paisId = await Country.findOne({
      where: { cca3: idPais },
      include: { model: Actividad, through: { attributes: [] } },
    });
    if (paisId) {
      res.status(200).send(paisId);
    } else {
      res.status(404).send("No existe un pais con ese ID");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/activity", async (req, res) => {
  try {
    let { nombre, dificultad, duracion, temporada, paises } = req.body;

    let [actividad, creado] = await Actividad.findOrCreate({
      where: { nombre },
      defaults: {
        nombre,
        dificultad,
        duracion,
        temporada,
      },
    });

    const paisActividad = await Country.findAll({
      where: { nombre: paises },
    });

    actividad.addCountry(paisActividad);
    return res.status(200).send("Actividad Creada");
  } catch (error) {
    res.status(404).send(error);
  }
});

//filtrados

router.get("/az", async (req, res) => {
  let az = await Country.findAll({
    order: [["nombre", "ASC"]],
  });
  return res.status(200).send(az);
});

router.get("/za", async (req, res) => {
  let za = await Country.findAll({
    order: [["nombre", "DESC"]],
  });

  return res.status(200).send(za);
});

router.get("/poblacionmenos", async (req, res) => {
  let poblacion = await Country.findAll({
    order: [["poblacion", "ASC"]],
  });

  return res.status(200).send(poblacion);
});

router.get("/poblacionmas", async (req, res) => {
  let poblacion = await Country.findAll({
    order: [["poblacion", "DESC"]],
  });

  return res.status(200).send(poblacion);
});

router.get("/continente/:idContinente", async (req, res) => {
  let { idContinente } = req.params;

  let poblacion = await Country.findAll({
    where: { continente: idContinente },
  });

  return res.status(200).send(poblacion);
});

router.get("/actividades", async (req, res) => {
  let actividades = await Actividad.findAll();
  return res.status(200).send(actividades);
});

router.get("/actividadPorPais", async (req, res) => {
  let actividadPorPais = await coun_act.findAll();
  return res.status(200).send(actividadPorPais);
});


module.exports = router;
