const route = require('express').Router();
const mongoose = require('mongoose');
const Products = require('../schema/productSchema');
/**
 * dispach today
 * purchased today  
 */

route.get('/dispached/today', (req, res) => {
    Products.find({
        dispatchDate: Date().now()
    })        
});

module.exports = route;