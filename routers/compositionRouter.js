const { Router } = require('express');
const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const Composition = require("../model/Composition")

const compositionRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

compositionRouter.post("/getRecepieComposition",urlencodedParser, async (req,res)=>{
    const {id_recepie} = req.body
    try {
        const composition = await Composition.findAll({
            where:{
                [Op.and]:{
                    id_recepie:id_recepie
                }
            }
        })
    
        res.setHeader('Content-type','application/json');
        return res.send({composition:composition})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({composition:0})
    }
    
})

compositionRouter.post("/createComposition",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_ingredient,qte} = req.body
    try {
        await Composition.create({
            id_recepie:id_recepie,
            id_ingredient:id_ingredient,
            qte:qte
        })
    
        res.setHeader('Content-type','application/json');
        return res.send({msg:"ingrédient de la composition ajouter !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible d'ajouter l'ingrédient de la composition' !"})
    }
    
})

compositionRouter.post("/updateComposition",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_ingredient,qte} = req.body
    try {
        await Composition.update({
            id_ingredient:id_ingredient,
            id_recepie:id_recepie,
            qte:qte,
        },{
            where:{
                [Op.and]:{
                    id_ingredient:id_ingredient,
                    id_recepie:id_recepie
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Modification l'ingrédient de la composition réussie !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de modifier l'ingrédient de la composition!"})
    }
    
})


compositionRouter.post("/deleteComposition",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_ingredient} = req.body
    try {
        await Composition.destroy({
            where:{
                [Op.and]:{
                    id_ingredient:id_ingredient,
                    id_recepie:id_recepie
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Supression l'ingrédient de la composition réussie !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de supprimer l'ingrédient de la composition !"})
    }
    
})


module.exports = compositionRouter;