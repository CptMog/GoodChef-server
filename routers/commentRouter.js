const { Router } = require('express');
const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const Comment = require("../model/Comment")

const commentRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

commentRouter.post("/getRecepieComment",urlencodedParser, async (req,res)=>{
    const {id_recepie} = req.body
    try {
        const comments = await Comment.findAll({
            where:{
                [Op.and]:{
                    id_recepie:id_recepie
                }
            }
        })
    
        res.setHeader('Content-type','application/json');
        return res.send({comments:comments})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({comments:0})
    }
    
})

commentRouter.post("/createComment",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user,decription} = req.body
    try {
        await Comment.create({
            id_user:id_user,
            id_recepie:id_recepie,
            decription:decription,
            date:new Date('d/m/y')
        })
    
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Commentaire ajouter !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de donner un commentaire !"})
    }
    
})

commentRouter.post("/updateComment",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user,decription} = req.body
    try {
        await Comment.update({
            id_user:id_user,
            id_recepie:id_recepie,
            decription:decription,
        },{
            where:{
                [Op.and]:{
                    id_user:id_user,
                    id_recepie:id_recepie
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Modification commentaire réussie !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de modifier le commentaire!"})
    }
    
})


commentRouter.post("/deleteComment",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user} = req.body
    try {
        await Comment.destroy({
            where:{
                [Op.and]:{
                    id_user:id_user,
                    id_recepie:id_recepie
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Supression commentaire réussie !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de supprimer le commentaire!"})
    }
    
})


module.exports = commentRouter;