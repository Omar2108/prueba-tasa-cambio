const Divisas = require("../models/divisaModel").modelDivisas;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const id_api = "ae21d260721048f8ba132bcfcb61bbe3";

//retorna todos los datos guardas en la coleccion divisas la ultima tasa de cambio con base a USD de la base de datos divisas
exports.findAllDivisas = async (req, res) => {

    try {
        Divisas.find((err, divisa) => {
            if (err) res.send(500, err.message);

            console.log("GET /divisas/v1/divisas");
            return res.status(200).jsonp(divisa);

        });
    } catch (error) {
        console.log({
            message: error
        });
    }
};

//controlador para guardar en la DB la ultima tasa de cambio de divisas con relacion a USD
exports.save = async (req, res) => {

    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${id_api}`);
    const data = await response.json();
    console.log(data);

    console.log(data);
    let body = req.body;
    body = data;

    let divisa = new Divisas({
        base: data.base,
        disclaime: data.disclaime,
        license: body.license,
        rates: { AED : body.rates.AED, EUR: body.rates.EUR, JPY: body.rates.JPY, COP: body.rates.COP,        GBP: body.rates.GBP},
        timestamp: body.timestamp
    });
    divisa.save((err, divisas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            user: divisas
        });
    });
}

//retorna la tasa de cambio para un id especifico 
exports.findHistoryById = async (req, res) => {

    try {
        Divisas.findById(req.params.id,  (err, divisa) => {
            if (err) return res.status(500).send(err.message);

            console.log('GET /divisas/v1/divisa/' + req.params.id);
            res.status(200).jsonp(divisa);
            console.log(divisa);
        });
    } catch (error) {

        console.log({
            message: error
        });
    }
}

