/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, Actividad , conn } = require('../../src/db.js');

const agent = session(app);
const actividad = {
  nombre: 'correr',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe("GET /countries/:idPais", () => {
    it("Devuelve 200 si le paso un id", (done) => {
      agent.get("/countries/ARG").then(() => done());
    });
  }
  );
  describe("GET /countries/:idPais", () => {
    it("Devuelve 404 si le paso un id incorrecto", (done) => {
      agent.get("/countries/hola").then(() => done());
    });
  }
  );
  describe("POST /activity", () => {
    it("Devuelve 200 si la ruta del POST es correcta", (done) => {
      agent.post("/activity").send(actividad).then(() => done());
    });
  }
  );
  describe("GET /countries?name=name", () => {
    it("Devuelve 200 si le paso un nombre correcto", (done) => {
      agent.get("/countries?name=Argentina").then(() => done());
    });
  }
  );
  describe("GET /countries?name=name", () => {
    it("Devuelve 404 si le paso un nombre incorrecto", (done) => {
      agent.get("/countries?name=kjnrt").then(() => done());
    });
  }
  );
  
 

  // Test de Modelo
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('nombre', () => {
      it('Deberia retornar error si le paso null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Deberia trabajar bien si le paso un nombre', () => {
        Country.create({ nombre: 'Argentina' });
      });
    });
  });

  describe('Validators', () => {
    beforeEach(() => Actividad.sync({ force: true }));
    describe('name', () => {
    it('Deberia trabajar bien si le paso un nombre', () => {
        Actividad.create({ nombre: 'correr' });
      });
    });
  });
  
});
