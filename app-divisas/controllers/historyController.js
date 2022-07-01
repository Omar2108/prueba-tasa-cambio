const History = require("../models/divisaModel").modelHistory;
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
const id_api = "ae21d260721048f8ba132bcfcb61bbe3";

//retorna todos los datos guardas en la coleccion history de la base de datos divisas
exports.findAllHistory = async (req, res) => {

    try {
        History.find((err, history) => {
            if (err) res.send(500, err.message);

            console.log("GET /history/v1/historys");
            return res.status(200).jsonp(history);

        });
    } catch (error) {
        console.log({
            message: error
        });
    }
}

//controlador para guardar en la DB el historico de la tasa de cambio de divisas con relacion a USD
exports.saveHistory = async (req, res) => {

    try {
        const response = await fetch(`https://openexchangerates.org/api/historical/2012-07-10.json?app_id=${id_api}`);
        const data = await response.json();
        console.log(data);

        let body = req.body;
        body = data;

        let history = new History({
            base: data.base,
            disclaime: data.disclaime,
            license: body.license,
            rates: {
                AED: body.rates.AED,
                EUR: body.rates.EUR,
                JPY: body.rates.JPY,
                COP: body.rates.COP,
                GBP: body.rates.GBP
            },
            timestamp: body.timestamp
        });
        history.save((err, history) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                user: history
            });
        });

    } catch (error) {
        console.log({
            message: error
        });
    }

}


//retorna un historico de cambio para un id especifico 
exports.findHistoryById = async (req, res) => {

    try {
        History.findById(req.params.id,  (err, history) => {
            if (err) return res.status(500).send(err.message);

            console.log('GET /history/v1/historys' + req.params.id);
            res.status(200).jsonp(history);
            console.log(history);
        });
    } catch (error) {

        console.log({
            message: error
        });
    }
}
