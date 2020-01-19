const route = require('express').Router();
const User = require('../models/Users');

route.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        mobileNumber: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password
    });
    
    try {
        
        const data = await User.find({
            name: req.body.name,
            username: req.body.username,
         });

         if(data) {
             throw { message: "user already existed" };
             return;
         }

        const result = await user.save();
        res.status(201).json({
            status: "success",
            data: result
        });
    } catch(err) {
        res.status(500).json({
            status: "failed",
            data: {
                error: err.message
            }
        })
    }
});


module.exports = route;