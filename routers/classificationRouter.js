const { Router } = require('express');
const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const Classification = require('../model/Classification');

// const { where } = require('sequelize');
const classificationsRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

classificationsRouter.get('/getClassifications',async(req,res)=>{
    
    try {
        const classifications = await Classification.findAll()
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            classifications : classifications,
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            classifications : 0,
        })
    }
    
})

classificationsRouter.post('/getClassificationsByCategory',async(req,res)=>{
    const {id_category} = req.body;
    try {
        const classifications = await Classification.findAll({
            where:{
                id_category:id_category
            }
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            classifications : classifications,
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            classifications : 0,
        })
    }
    
})

classificationsRouter.post('/getClassificationsByRecepie',async(req,res)=>{
    const {id_recepie} = req.body;
    try {
        const classifications = await Classification.findAll({
            where:{
                id_recepie: id_recepie
            }
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.json({
            classifications : classifications,
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.json({
            classifications : 0,
        })
    }
    
})

classificationsRouter.post('/createClassification',urlencodedParser,async(req,res)=>{
    const {id_recepie,id_category} = req.body;

    try {
        await Classification.create({
            id_recepie:id_recepie,
            id_category:id_category
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Recette classifier !",
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Erreur : impossible de classifier la recette",
        })
    }
    
})

classificationsRouter.post('/updateClassification',urlencodedParser,async(req,res)=>{
    const {id,id_recepie,id_category} = req.body;
    try {
        await Classification.update({
            id_recepie:id_recepie,
            id_category:id_category
        },{
            where:{
                id:id
            },
        })   
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Classification modifler !",
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Erreur : Modification impossible",
        })
    }
    
})

classificationsRouter.post('/deleteClassification',urlencodedParser,async(req,res)=>{
    const {id} = req.body;
    try {
        await Classification.destroy({
            where:{
                id:id
            },
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Suppression de la classification réussi !",
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Erreur : Suppresion impossible",
        })
    }
    
})
module.exports = classificationsRouter;