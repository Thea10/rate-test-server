const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors');
const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const mainRoute = require("./routes/main");
var corsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mainRoute(server);

const port = process.env.PORT || 9000;

server.get("/", (req, res) =>
  res.json({
    message: "Rate Test Server",
    getRates: "send a GET request to /api/rates which accepts the following request query parameter strings: 1. base: the currency rate to be quoted against, 2: currency the specific exchange rates based on a comma-separated symbols parameter",
    sampleRequest: "https://rate-test-server.herokuapp.com/api/rates?base=CZK&currency=EUR,GBP,USD"
  })
);
server.listen(port, () =>
  console.log(`Rate Test  Server running on port: ${port}`)
);



