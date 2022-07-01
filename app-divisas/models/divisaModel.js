const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//esquema del modelo para tasa de cambio
const divisasSchema = new Schema({

    base : { type: String, required: [true, "La base es obligatoria"]},
    disclaime : {type:String},
    license : {type:String},
    rates: { AED: { type: String }, EUR:{type:String}, JPY: {type:String}, COP:{type:String}, GBP:{type:String}},
    timestamp: { type: Number }
});

//esquema del modelo para historico de tasa de cambio
const historySchema = new Schema({

    base : { type: String, required: [true, "La base es obligatoria"]},
    disclaime : {type:String},
    license : {type:String},
    rates: { AED: { type: String }, EUR:{type:String}, JPY: {type:String}, COP:{type:String}, GBP:{type:String}},
    timestamp: { type: Number }
});



const modelHistory = mongoose.model("History", historySchema);
const modelDivisas = mongoose.model("Divisas", divisasSchema);
module.exports ={ modelDivisas, modelHistory };