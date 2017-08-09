
// models/cars.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    wheels: Number,
    engine: [{
        engineHp: { type: Number, required: true, default: 1 },
        cyclinder: {type: Number, required: true, default:1 }
    }],
    carPath: {type: String, required: true },
    fuel: [{
        mpg: { type: Number}, 
        fuelCompacity:{type: Number}
    }]
});




const Car = mongoose.model('Car', carSchema);

module.exports = Car;