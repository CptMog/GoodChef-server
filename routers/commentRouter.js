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
                id_recepie:id_recepie
            },
            order:[['id','ASC']] 
        })

        res.setHeader('Content-type','application/json');
        return res.send({comments:comments})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({comments:[]})
    }
    
})

commentRouter.post("/getUserComment",urlencodedParser, async (req,res)=>{
    const {id_user} = req.body
    try {
        const comment = await Comment.findOne({
            where:{
                id_user:id_user
            }
        })

        res.setHeader('Content-type','application/json');
        return res.send({comment:comment})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({comment:0})
    }
    
})

commentRouter.post("/createComment",urlencodedParser, async (req,res)=>{
    const {id_recepie,id_user,description} = req.body
    
    try {
        await Comment.create({
            id_user:id_user,
            id_recepie:id_recepie,
            description:description,
            date:new Date()
        })
        console.log(id_recepie,id_user,description)
        res.setHeader('Content-type','application/json');
        return res.json({msg:"Commentaire ajouter !"})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.json({msg:"Erreur: Impossible de donner un commentaire !"})
    }
    
})

commentRouter.post("/updateComment",urlencodedParser, async (req,res)=>{
    const {id,id_recepie,id_user,description} = req.body
    try {
        await Comment.update({
            id_user:id_user,
            id_recepie:id_recepie,
            description:description,
        },{
            where:{
                [Op.and]:{
                    id:id
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Modification commentaire réussie !",state:1})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de modifier le commentaire!",state:0})
    }
    
})


commentRouter.post("/deleteComment",urlencodedParser, async (req,res)=>{
    const {id} = req.body
    try {
        await Comment.destroy({
            where:{
                [Op.and]:{
                    id:id
                }
            }
        })
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Supression commentaire réussie !",state:1})
        
    } catch (error) {
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur: Impossible de supprimer le commentaire!",state:0})
    }
    
})


module.exports = commentRouter;