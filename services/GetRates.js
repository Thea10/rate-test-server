const axios = require("axios");

async function getRates(req, res) {
  let base = req.query.base;
  let currencies = req.query.currency.split(",");
  try {
    let externalRates = await getExternalRates();
    let rateData = externalRates.data;
    let keys = Object.keys(rateData.rates);
    let rateObject;

    keys.some((key) => {
      if (currencies.includes(key)) {
        let newRate = {
          [key]: rateData.rates[key],
        };
        rateObject = { ...rateObject, ...newRate };
      }
    });

    res.status(200).send({
      results: {
        base: base,
        date: new Date().toLocaleDateString(),
        rates: { ...rateObject },
      },
    });
  } catch (error) {
    res.status(403).send({ message: error });
  }
}

async function getExternalRates() {
  let API_URL = process.env.PROXY_API;
  try {
    const response = await axios.get(`${API_URL}`);
    return response;
  } catch (error) {
    return error.message;
  }
}

module.exports = getRates;
