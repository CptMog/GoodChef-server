const {Router} = require('express');
const { Op } = require("sequelize");
const Recepie = require('../model/Recepie');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const recepiesRouter = new Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false });

recepiesRouter.get('/getAdminRecepies',async (req,res) =>{
    const recepies = await Recepie.findAll({order:[['date','DESC']]})
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepies : recepies,
       })
})

recepiesRouter.get('/getRecepies',async (req,res) =>{
    const recepies = await Recepie.findAll({order:[['date','DESC']],
        where:{
            moderation_state:'1'
        }
    })
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepies : recepies,
       })
})

recepiesRouter.post('/getLimitRecepies',async (req,res) =>{
    const {limit} = req.body;
    const recepies = await Recepie.findAll({order:[['date','DESC']],limit:limit,
            where:{
                moderation_state:'1'
            }
    })
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepies : recepies,
       })
})
 
recepiesRouter.post('/myRecepies',async (req,res) =>{
    const {id_author} =req.body 
    const recepies = await Recepie.findAll({
        where:{
            id_author:id_author
        },
        order:[['date','DESC']] 
    })
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepies : recepies,
    })
})

recepiesRouter.post('/getARecepie',urlencodedParser,async (req,res) =>{
    const {url} = req.body
    const recepie = await Recepie.findOne({
        where:{ 
            url:url
        }
    })
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepie : recepie,
       })
})

recepiesRouter.get('/getRecepieUne',urlencodedParser,async (req,res) =>{
    const recepie = await Recepie.findOne({
        where:{ 
            une:'1'
        }
    })
    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepie : recepie,
       })
})

recepiesRouter.post('/getTrendings',urlencodedParser,async (req,res) =>{
    const {limit} = req.body
    let recepies = ''
    
    if(limit){
        recepies = await Recepie.findAll({
            where:{ 
                trend:'1',
            },
            limit: limit
        })
    }else{
        recepies = await Recepie.findAll({
            where:{ 
                trend:'1',
            },
            limit:5
        })
    }

    res.sendStatus = 200    
    res.setHeader('Content-type','application/json');
    res.send({
        recepies : recepies,
       })
})

recepiesRouter.post('/createRecepie',urlencodedParser,async (req,res) =>{
    const {
        title,
        description,
        ingredients,
        time_prepare,
        time_rest,     
        time_cooking,
        image,
        steps,
        id_author
    } = req.body;

    try {
        await Recepie.create({
            id_author:id_author,
            title:title,
            description:description,
            ingredients:JSON.stringify(ingredients),
            steps:JSON.stringify(steps),
            image:image,
            time_prepare:time_prepare,
            time_rest:time_rest,
            time_cooking:time_cooking,
            url: title.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, ''),
            date: Date.now()
        })
        res.setHeader('Content-type','application/json');
        res.json({msg:"Recette créer réussi"})
    } catch (error) {
        res.setHeader('Content-type','application/json');
        res.json({msg:"Erreur : impossible de créer la recette, vérifier les informations"})
    }
    
})

recepiesRouter.post('/moderateRecepie',urlencodedParser,async (req,res) =>{
    const {
        id,
        moderation_state
    } = req.body;
    try {
        res.setHeader('Content-type','application/json');
        await Recepie.update({
            moderation_state:moderation_state
        },{
            where:{
                [Op.and]:{
                    id:id,
                }
            }
        })  
        res.send({msg:"Modération réussi",state:true})
    } catch (error) {
        res.send({msg:"Erreur : impossible de modérer",state:false})
    }
    
})

recepiesRouter.post('/putRecepieUne',urlencodedParser,async (req,res) =>{
    const {
        id,
        state
    } = req.body;
    console.log(id,state)
    const updateUne = async()=>{
        try {
            await Recepie.update({
                une:state
            },{
                where:{
                    [Op.and]:{
                        id:id,
                    }
                }
            })  
            res.send({msg:"Mise en Une réussi",state:true})
        } catch (error) {
            res.send({msg:"Erreur : impossible de mettre en Une",state:false})
        }
    }

    if(state == '1'){
        const isARecepieInUne = await Recepie.findOne({
            where:{
                une:'1'
            }
        })

        res.setHeader('Content-type','application/json');
        if(!isARecepieInUne){
            updateUne()
        }else{
            res.send({msg:"Erreur: iL y'a déjà une recette en Une,veuillez la décocher avant de cocher une nouvelle"})
        }
    }else{
        updateUne()
    }
   
})

recepiesRouter.post('/putRecepieTrends',urlencodedParser,async (req,res) =>{
    const {
        id,
        state
    } = req.body;

    const updateTrend = async()=>{
        try {
            await Recepie.update({
                trend:state
            },{
                where:{
                    [Op.and]:{
                        id:id,
                    }
                }
            })  
            res.send({msg:"Mise à jours Tendance réussi",state:true})
        } catch (error) {
            res.send({msg:"Erreur : impossible de mettre àjours les tendances",state:false})
        }
    }

    if(state == '1'){
        const isARecepieInTrend = await Recepie.findAll({
            where:{
                trend:'1'
            }
        })

        res.setHeader('Content-type','application/json');
        if(isARecepieInTrend.length < 5 ){
            updateTrend()
        }else{
            res.send({msg:"Erreur: iL y'a déjà 5 recettes en tendance,veuillez décocher une recette avant de cocher une nouvelle"})
        }
    }else{
        updateTrend()
    }
   
})

recepiesRouter.post('/updateRecepie',urlencodedParser,async (req,res) =>{
    const {
        id,
        title,
        description,
        ingredients,
        time_prepare,
        time_rest,     
        time_cooking,
        image,
        steps,
        id_author
    } = req.body;

    try {
        res.setHeader('Content-type','application/json');
        await Recepie.update({
            title:title,
            description:description,
            ingredients:JSON.stringify(ingredients),
            steps:JSON.stringify(steps),
            image:image,
            time_prepare:time_prepare,
            time_rest:time_rest,
            time_cooking:time_cooking,
            url: title.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, ''),
            moderation_state:'-1'
        },{
            where:{
                [Op.and]:{
                    id:id,
                    id_author:id_author
                }
            }
        })
        
        res.send({msg:"Modification réussi",state:true})
    } catch (error) {
        res.send({msg:"Erreur : impossible de modifier, vérifier les informations",state:false})
    }
    
})

recepiesRouter.post('/deleteRecepie',urlencodedParser,async (req,res) =>{
    const {
        id,
        id_author,
        passwordConf
    } = req.body;

    const user = await User.findOne({
        where:{
            id:id_author
        }
    }) 

    bcrypt.compare(passwordConf,user.password,async (err,same)=>{

        res.setHeader('Content-type','application/json');
        if(!same){
            res.json({msg:"Impossble de suprimer, vérifier votre mot de passe",state:false})
        }else{
            await Recepie.destroy({
                where:{
                    [Op.and]:{
                        id:id,
                        id_author:id_author
                    }
                }
            })
            res.json({msg:"Recette supprimer avec succès",state:true})
        }
    })

}) 


recepiesRouter.post('/deleteAdminRecepie',urlencodedParser,async (req,res) =>{
    const {id} = req.body;
    try {
        await Recepie.destroy({
            where:{
                [Op.and]:{
                    id:id,
                }
            }
        })
        res.json({msg:"Recette supprimer avec succès",state:true})
    } catch (error) {
        res.json({msg:"Impossble de suprimer, vérifier votre mot de passe",state:false})
    }
    

})


module.exports = recepiesRouter;