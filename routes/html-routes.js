//dependencies
const path = require("path");

module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/burger.html"));
    });

    app.get("/comments", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/comment.html"));
    });
};