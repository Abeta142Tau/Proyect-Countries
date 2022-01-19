const axios = require("axios");
const { Country, Activities } = require("../../db");

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    if (!name || !difficulty || !duration || !season || !countries) {
      res
        .status(404)
        .json({ message: "All parameters are requered, please complete" });
    } else {
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
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activities.findAll({
      attributes: ["id", "name", "difficulty", "duration", "season"],
      include: Country,
    });
    res.status(200).send(activities);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { postActivity, getAllActivities };
