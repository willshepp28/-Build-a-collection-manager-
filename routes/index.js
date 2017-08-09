const express = require('express');
const router = express.Router();
const Car = require('../models/cars');

router.get('/',  function (req, res) {
    var cars = Car.find()
        .then(function(e){
            console.log(e);
              res.render('home', {cars: e});
        })
        .catch(function(e){
            console.log(e);
            console.log('error');
        });
  
});


router.route('/add')
    .get(function (req, res) {
        res.render('add');
    })
    .post(function (req, res) {

        const name = req.body.name;
        const brand = req.body.brand;
        const wheels = req.body.wheels;
        const engineHp = req.body.engineHp;
        const cylinder = req.body.cylinder;
        const carPath = req.body.carPath || "https://www.streetrodding.com/img/car-placeholder.png";
        const mpg = req.body.mpg;
        const fuelCompacity = req.body.fuelCompacity;

        Car.create({ name: name, brand: brand, wheels: wheels, engine: [{ engineHp: engineHp, cylinder: cylinder }], carPath: carPath, fuel: [{ mpg: mpg ,fuelCompacity: fuelCompacity }] })
            .then(function(e){
                console.log(e);
            })
            .catch(function(e){
                console.log(e);
                res.redirect('/add');
            });
        // https://images-na.ssl-images-amazon.com/images/I/81KOBEUvDwL._SL256_.jpg
        res.redirect('/');
    });



router.post('/delete/:name', function(req,res){
    const name = req.params.name;
    console.log(name);

    Car.deleteOne({name: name})
        .then(function(e){
            console.log(e);
        })
        .catch(function(e){
            res.redirect('/');
        });

        res.redirect('/');
});


router.route('/edit/:name')
    .get(function(req,res){

        const name = req.params.name;


          var cars = Car.findOne({name:name})
        .then(function(e){
            console.log(e);

        res.render('edit', {cars: e});
        })
        .catch(function(e){
            console.log(e);
            console.log('error');
        });

    
    })
    .post(function(req,res){


        // let user edit parts of page
         const name = req.body.name;
        const brand = req.body.brand;
        const wheels = req.body.wheels;
        const engineHp = req.body.engineHp;
        const cylinder = req.body.cylinder;
        const carPath = req.body.carPath || "https://www.streetrodding.com/img/car-placeholder.png";
        const mpg = req.body.mpg;
        const fuelCompacity = req.body.fuelCompacity;

 

        Car.updateOne(
            {name: name},
             {$set: {name: name, brand: brand, wheels: wheels, engine: [{ engineHp: engineHp, cylinder: cylinder }], carPath: carPath, fuel: [{ mpg: mpg ,fuelCompacity: fuelCompacity }]}
            })
            .then(function(e){
                console.log(e);
            })
            .catch(function(e){
                console.log(e);
                res.redirect('/edit/:' + name);
            })
            
        
      
        res.redirect('/');
    });

module.exports = router;