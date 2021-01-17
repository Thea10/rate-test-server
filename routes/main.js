const getRates = require("../services/GetRates");

module.exports = function (server) { 

    server.use(
        function (req, res, next) { 
            res.header( "Origin, Content-Type, Accept");
            next()
         }
    );

    server.get('/api/rates', getRates )

 }