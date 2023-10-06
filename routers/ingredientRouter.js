const { Router } = require('express');
// const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const Ingredient = require('../model/Ingredient');
// const { where } = require('sequelize');
const ingredientRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

ingredientRouter.get('/getIngredients',async (req,res)=>{
    try {
        const ingredients = await Ingredient.findAll()
        res.senStatus = 200;
        res.setHeader('Content-type','application/json');
        res.send({ingredients:ingredients})
    } catch (error) {
        res.senStatus = 200;
        res.setHeader('Content-type','application/json');
        res.send({ingredients:0})
    }
})

ingredientRouter.post('/getAnIngredient',urlencodedParser,async (req,res)=>{
    const {name} = req.body;
    try {
        const ingredient = await Ingredient.findOne({
            where:{
                name:name
            }
        })
        res.senStatus = 200;
        res.setHeader('Content-type','application/json');
        return res.send({ingredient:ingredient})
    } catch (error) {
        res.senStatus = 200;
        res.setHeader('Content-type','application/json');
        return res.send({ingredient:0})
    }
})

ingredientRouter.post('/createIngredient',urlencodedParser,async (req,res)=>{
    const {id_category,name,weight,volume,protein,fats,calories,fiber} = req.body;
    try {
        await Ingredient.create({
            id_category:id_category,
            name:name,
            weight:weight,
            volume:volume,
            protein:protein,
            fats:fats,
            calories:calories,
            fiber:fiber
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Ingrédient Créer !"})
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur : Création impossible"})
    }
})

ingredientRouter.post('/updateIngredient',urlencodedParser,async (req,res)=>{
    const {id,id_category,name,weight,volume,protein,fats,calories,fiber} = req.body;
    try {
        await Ingredient.update({
            id_category:id_category,
            name:name,
            weight:weight,
            volume:volume,
            protein:protein,
            fats:fats,
            calories:calories,
            fiber:fiber
        },{
            where:{
                id:id
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Ingrédient Modifier !"})
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur : Modification impossible"})
    }
})

ingredientRouter.post('/deleteIngredient',urlencodedParser,async (req,res)=>{
    const {id} = req.body
    try {
        await Ingredient.destroy({
            where:{
                id:id
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Ingrédient Supprimer !"})
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur : Suppression impossible"})
    }
})

module.exports = ingredientRouter;