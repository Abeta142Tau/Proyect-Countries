const { Router } = require("express");
const axios = require("axios");
const { getCountries, getCountryById } = require("./controllers/countryRoute");
const { postActivity } = require("./controllers/activitiesRoute");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", getCountries);
router.get("/countries/:id", getCountryById);
router.post("/activity", postActivity);

module.exports = router;
