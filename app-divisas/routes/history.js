var express = require('express');
var router = express.Router();

const historyController = require("../controllers/historyController")

router.get('/v1/historys', historyController.findAllHistory);
router.get('/v1/history/:id', historyController.findHistoryById);
router.post('/v1/save', historyController.saveHistory);


module.exports = router;