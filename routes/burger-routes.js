//import from models folder
var db = require("../models");

//export routs into app
module.exports = app => {
    app.get("/api/burgers", (req,res) => {
        db.Burger.findAll({
            include: [db.Comments]
        }).then (dbBurger => {
            res.json(dbBurger);
        });
    });
    
    app.get("/api/burgers/:id", (req,res) =>{
        db.Burger.findOne({
            where: {
                id: req.params.id
            }, 
            include: [db.Comments]
        }). then (dbBurger => {
            res.json(dbBurger);
        });
    });

    app.post("/api/burgers", (req, res) => {
        db.Burger.create (req.body).then(dbBurger => {
            res.json(dbBurger);
        });
    });

    app.put("/api/burgers", (req, res) => {
        console.log(req.params.id)
        db.Burger.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(dbBurger => {
            res.json(dbBurger);
            console.log(dbBurger)
        });
    });
};
