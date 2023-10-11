const { Router } = require('express');
const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const Category = require('../model/Category');

const categoryRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

categoryRouter.get('/getAdminCategories',async(req,res)=>{ 
    
    try {
        const catagories = await Category.findAll()
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            catagories : catagories,
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            catagories : 0,
        })
    }
    
})

categoryRouter.post('/showStateCategory',urlencodedParser,async (req,res) =>{
    const {
        id,
        showed
    } = req.body;
    try {
        res.setHeader('Content-type','application/json');
        await Category.update({
            showed:showed
        },{
            where:{
                [Op.and]:{
                    id:id,
                }
            }
        })  
        res.send({msg:"Affichage catégorie changer !",state:true})
    } catch (error) {
        res.send({msg:"Erreur : impossible de changer l'affichage",state:false})
    }
    
})

categoryRouter.get('/getCategories',async(req,res)=>{
    
    try {
        const catagories = await Category.findAll({
            where:{
                showed:'1'
            }
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            catagories : catagories,
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            catagories : 0,
        })
    }
    
})

categoryRouter.post('/getACategorie',async(req,res)=>{
    const {id} = req.body;
    try {
        const catagorie = await Category.findOne({
            where:{
                [Op.and]:{
                    showed:'1',
                    id:id
                }
            }
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.json({
            catagorie : catagorie,
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.json({
            catagorie : 0,
        })
    }
    
})

categoryRouter.post('/createCategorie',urlencodedParser,async(req,res)=>{
    const {name,image} = req.body;

    try {
        await Category.create({
            name:name,
            image:image
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Création de la categrorie réussi !",
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Erreur : Création impossible",
        })
    }
    
})

categoryRouter.post('/updateCategorie',urlencodedParser,async(req,res)=>{
    const {id,name,image} = req.body;
    try {
        await Category.update({
            name:name,
            image:image
        },{
            where:{
                id:id
            },
        })   
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Modification de la categrorie réussi !",
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Erreur : Modification impossible",
        })
    }
    
})

categoryRouter.post('/deleteCategorie',urlencodedParser,async(req,res)=>{
    const {id} = req.body;
    try {
        await Category.destroy({
            where:{
                id:id
            },
        })
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Suppression de la categrorie réussi !",
        })
    } catch (error) {
        res.sendStatus = 200    
        res.setHeader('Content-type','application/json');
        res.send({
            msg : "Erreur : Suppresion impossible",
        })
    }
    
})
module.exports = categoryRouter;