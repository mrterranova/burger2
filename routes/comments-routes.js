//import from models folder
var db = require("../models");

//export routs into app
module.exports = app => {
    //read all comments associated with Burger name
    app.get("/api/comments", (req, res) => {
        db.Comments.findAll({
            include: [dbBurger]
        }).then(dbComments => {
            res.json(dbComments);
        });
    });

    app.post("/api/comments/:burger_name", (req,res) => {
        //post a new comment for burger by name
        db.Comments.create(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then (dbComments => {
                res.json(dbComments);
        });
    });

    app.put("/api/comments/:burger_name", (req, res) => {
        //edit a comment for burger by name
        db.Comments.update(
            req.body, {
                where: { id: req.body.id}
            }).then(dbComments => {
                res.json(dbComments);
            });
    });
}