const { Router } = require('express');
const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const Rating = require("../model/Rating")

const ratingRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

ratingRouter.post("/getRecepieRating",urlencodedParser, async (req,res)=>{
    const {id_recepie} = req.body
    try {
        const ratings = await Rating.findAll({
            where:{
                [Op.and]:{
                    id_recepie:id_recepie
                }
            }
        })
    
        res.setHeader('Content-type','application/json');
        return res.send({rating:ratings})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({rating:0})
    }
    
})

ratingRouter.post("/createRating",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user,rate} = req.body
    try {
        await Rating.create({
            id_user:id_user,
            id_recepie:id_recepie,
            rate:rate,
            date:new Date('d/m/y')
        })
    
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Note ajouter !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de donner une note !"})
    }
    
})

ratingRouter.post("/updateRating",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user,rate} = req.body
    try {
        await Rating.update({
            id_user:id_user,
            id_recepie:id_recepie,
            rate:rate,
        },{
            where:{
                [Op.and]:{
                    id_user:id_user,
                    id_recepie:id_recepie
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Modification note réussie !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de modifier la note!"})
    }
    
})


ratingRouter.post("/deleteRating",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user} = req.body
    try {
        await Rating.destroy({
            where:{
                [Op.and]:{
                    id_user:id_user,
                    id_recepie:id_recepie
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Supression note réussie !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de supprimer la note!"})
    }
    
})


module.exports = ratingRouter;