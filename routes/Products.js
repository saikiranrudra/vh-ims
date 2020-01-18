const route = require('express').Router();

route.get("/", (req, res) => {
    res.json({ 
        status: "succress",
        message: "data from route"
    })
});

module.exports = route;