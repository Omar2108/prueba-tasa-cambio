var express = require('express');
var router = express.Router();

const divisasController = require("../controllers/divisaController")

router.get('/v1/divisas', divisasController.findAllDivisas);
router.get('/v1/divisa/:id', divisasController.save);
router.post('/v1/save', divisasController.save);

module.exports = router;
