//import from models folder
var db = require("../models");

//export routs into app
module.exports = app => {
    //read all comments associated with Burger name
    app.get("/api/comments/:burger_id", (req, res) => {
        var query = {};
        if(req.query.burger_id) {
            query.BurgerId = req.query.burger_id;
        }
        db.Comments.findAll({
            where: query,
            include: [db.Burger]
        }).then(dbComments => {
            res.json(dbComments);
        });
    });

    app.post("/api/comments/:burger_id", (req,res) => {
        //post a new comment for burger by name
        db.Comments.create({
            customer : req.body.customer, 
            comment: req.body.comment, 
            stars: req.body.stars, 
            BurgerId: req.params.burger_id
        }).then (dbComments => {
                res.json(dbComments);
        });
    });

    app.put("/api/comments/:burger_id", (req, res) => {
        //edit a comment for burger by id
        db.Comments.update(
            req.body, {
                where: {id: req.body.id}
            }).then(dbComments => {
                res.json(dbComments);
            });
    });
}