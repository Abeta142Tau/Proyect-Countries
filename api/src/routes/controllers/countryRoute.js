const axios = require("axios");
const { Country, Activities } = require("../../db");
const { Op } = require("sequelize");

const getApiInfo = async () => {
  try {
    let countries = await axios.get("https://restcountries.com/v3/all");
    countries = await axios.all(
      countries.data.map((el) => {
        Country.findOrCreate({
          where: {
            id: el.cca3 ? el.cca3 : "Not found ",
            name: el.name.common ? el.name.common : "Not found ",
            flagImage: el.flags ? el.flags[1] : "Not found ",
            continents: el.continents ? el.continents[0] : "Not found ",
            capital: el.capital ? el.capital[0] : "Not found ",
            subregion: el.subregion ? el.subregion : "Not found ",
            area: el.area,
            population: el.population,
          },
        });
      })
    );
    return "All information was added correctly";
  } catch (e) {
    return e;
  }
};

const getAllCountries = async () => {
  try {
    //No olvidar llamar aquí getApiInfo para que en esta instancia me traiga la data y no en el index//
    let nameCountries = await getApiInfo();
    nameCountries = await Country.findAll({
      attributes: [
        "id",
        "name",
        "flagImage",
        "continents",
        "capital",
        "population",
        "area",
      ],
      include: Activities,
    });
    return nameCountries;
  } catch (e) {
    return e;
  }
};

const getCountriesName = async (name) => {
  try {
    let nameCountry = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ["id", "name", "flagImage", "continents", "capital"],
      include: Activities,
    });
    return nameCountry;
  } catch (e) {
    return e;
  }
};

const getCountries = async (req, res) => {
  let { name } = req.query;
  try {
    if (name) {
      let country = await getCountriesName(name);
      country.length > 0
        ? res.status(200).json(country)
        : res.status(404).send("Country not found");
    } else {
      let countries = await getAllCountries();
      res.status(200).json(countries);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const getCountryById = async (req, res) => {
  let { id } = req.params;
  try {
    let country = await Country.findByPk(id.toUpperCase(), {
      attributes: [
        "id",
        "name",
        "flagImage",
        "continents",
        "capital",
        "subregion",
        "area",
        "population",
      ],
      include: Activities,
    });
    country
      ? res.status(200).send(country)
      : res.status(404).send("Country not found");
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  getApiInfo,
  getCountries,
  getAllCountries,
  getCountriesName,
  getCountryById,
};
