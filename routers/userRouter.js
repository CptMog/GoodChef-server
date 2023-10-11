const { Router } = require('express');
const { Op } = require("sequelize");
const bodyParser = require('body-parser');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const session = require('express-session');
const {Sequelize} = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc");

const store = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }) 

const userRouter = new Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

userRouter.post("/getUserById",urlencodedParser,async(req,res)=>{ 
    const {id} = req.body;
    const user = await User.findOne({
        where:{
            id:id
        }
    })
    res.setHeader('Content-Type','application/json')
    if(user){
        res.json({user:user})
    }else{
        res.json({user:0})
    }
})

userRouter.post("/login",urlencodedParser,async (req,res)=>{

    const {email,password}  = req.body;
    const userLogged = await User.findOne({
        where:{
                email:email
        }
    })
    if(userLogged){
        bcrypt.compare(password,userLogged.password,(err,same)=>{
            res.setHeader('Content-type','text/html');
            if(!same){   
                res.json({msg:"mot de passe éronnee",authorized:false})
                res.end()
            }else{
                req.session.user = userLogged;
                res.json({sessionID:req.sessionID,authorized:true})
            }
        })
    } else{
        res.json({msg:"email inconnue",authorized:false})
        res.end()
    }
    
   
})


userRouter.post("/logged",urlencodedParser,async(req,res)=>{ 
    const {sessionID} = req.body;
    store.get(sessionID,async(err,sess)=>{

        if(sess != null || sess != undefined){
            const user = await User.findOne({
                where:{
                    id:sess.user.id
                }
            })
            res.json({user:user})
        }

    })
})

userRouter.post("/logout",urlencodedParser,async(req,res)=>{ 
    const {sessionID} = req.body;
    store.destroy(sessionID)
    res.end()
})

userRouter.post("/register",urlencodedParser,async (req,res)=>{
    const {email,first_name,last_name,password,passwordConf}  = req.body;
    const saltRounds = 10;

    try{ 
        if(password == passwordConf){
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password,salt);

            await User.create({first_name:first_name,last_name:last_name,email:email,password:hash});
            res.setHeader('Content-type','application/json');
            return res.send({msg:"Inscription réussi !"});
        }
    }catch(err){
            res.setHeader('Content-type','application/json');
            return res.send({msg:"Erreur : Vérifier les informations et réessayer!"});
    }
    
})  
 

userRouter.post("/update",urlencodedParser,async (req,res)=>{
    const {id,first_name,last_name,email,description,image,password,newPassword,passwordConf}  = req.body;

    let userData=""
    if(newPassword != ""){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword,salt)
        userData={
            first_name:first_name, 
            last_name:last_name,
            email:email,
            image:image,
            password:hash,
            description:description
        }
    }

    userData={
        first_name:first_name,
        last_name:last_name,
        email:email,
        image:image,
        password:password,
        description:description
    }

    bcrypt.compare(passwordConf,password,async (err,same)=>{
        res.setHeader('Content-type','application/json');
        if(same){
            await User.update({first_name:userData.first_name,last_name:userData.last_name,email:userData.email,image:userData.image,password:userData.password,description:userData.description}, {
                where: {
                    id: id
                }
            });
            res.json({msg:"Modification réussi !"});
        }else{
            res.json({msg:"Erreur : Mot de passe incorrect"});
        }
    })
        
    
})

userRouter.post("/delete",urlencodedParser,async (req,res)=>{
    const {id,passwordConf,sessionID}  = req.body;
    console.log(req.body)
    const getUser = await User.findOne({  
        where:{
            id:id
        }
    })
    bcrypt.compare(passwordConf,getUser.password,async(err,same)=>{
        if(!same){
            res.setHeader('Content-type','application/json');
            res.json({msg:"Erreur : Impossible de supprimer, mot de passe incorecte !",isDelete:false});
        }else{
            store.destroy(sessionID)
            await User.destroy({
                where: {
                    [Op.and]:{
                        id: id
                    }
                },
                truncate:true
            });
            res.setHeader('Content-type','application/json');
            res.json({isDelete:true});
        }
    })

})

userRouter.get("/getUsers",async (req,res)=>{
 
    try{
        const users = await User.findAll()
        res.sendStatus = 200 
        res.setHeader('Content-type','application/json');
        return res.send({users:users});
    }catch(err){
        res.setHeader('Content-type','application/json');
        res.sendStatus = 200;
        return res.send({users:0});
    }
    
})


userRouter.post("/adminupdate",urlencodedParser,async (req,res)=>{
    const {id,email,first_name,last_name,password} = req.body;
    try{
        await User.update({first_name:first_name,last_name:last_name,email:email,password:password},{
            where: {
                id: id
            }
        });
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Modification réussi !"});
    }catch(err){
        res.setHeader('Content-type','application/json');
        return res.send({msg:"Erreur : Impossible de modifier, vérifier les informations !"});
    }
    
})

userRouter.post("/admindelete",urlencodedParser,async (req,res)=>{
    const {id}  = req.body;
    try{
            await User.destroy({
                where: {
                    id: id,       
                },
                truncate:true
            });
            res.setHeader('Content-type','application/json');
            return res.send({msg:"Suppression réussi !"});
    }catch(err){
            res.setHeader('Content-type','application/json');
            return res.send({msg:"Erreur : Impossible de supprimer !"});
    }
    
}) 


module.exports = userRouter;