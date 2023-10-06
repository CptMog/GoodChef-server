const { Router } = require('express');
const Category = require('../model/Category');
const Recepie = require('../model/Recepie');
const homeRouter = new Router()

homeRouter.get('/',async (req,res) =>{
    const catagories = await Category.findAll({limit:12})
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        catagories : catagories
    })
})

module.exports = homeRouter;