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
  })
);
server.listen(port, () =>
  console.log(`Rate Test  Server running on port: ${port}`)
);



