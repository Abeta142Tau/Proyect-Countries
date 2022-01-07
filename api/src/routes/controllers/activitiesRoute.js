const axios = require("axios");
const { Country, Activities } = require("../../db");

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    //Creo la actividad
    const newActivity = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });
    //Recorremos los paises que trae el body
    countries.forEach(async (country) => {
      const countryActivity = await Country.findOne({
        //finOne devuelve la primera instancia encontrada o null si no lo encuentra
        where: {
          name: country,
        },
      });
      await newActivity.addCountry(countryActivity);
    });
    res.status(200).send({ message: "Activity add successfully" });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { postActivity };
