const http = require("http");
const express = require("express");
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const homeRouter = require("./routers/homeRouter");
const recepiesRouter = require("./routers/recepieRouter");
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const ingredientRouter = require('./routers/ingredientRouter');
const ratingRouter = require('./routers/ratingRouter');
const commentRouter = require('./routers/commentRouter');
const compositionRouter = require('./routers/compositionRouter');
const classificationRouter = require('./routers/classificationRouter');
const {Sequelize} = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const server = http.Server(app)
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc");

const store = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }) 

app.use(cors({ origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination:function(req,res,callback){
        callback(null,__dirname+"/uploads")
    },
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
});
const uploads = multer({storage:storage});

app.post("/uploads",uploads.single('image'),(req,res)=>{
    // console.log(req.body)
    // console.log(req.file)
    // res.end({msg:'file send !'});
    res.end()
}) 

app.use(session({
    store:store, 
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard_cat",
}))

store.sync()

app.use(express.static(__dirname + '/uploads'))
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(homeRouter)
app.use(recepiesRouter)
app.use(userRouter)
app.use(categoryRouter)
app.use(ingredientRouter)
app.use(ratingRouter)
app.use(commentRouter)
app.use(compositionRouter)
app.use(classificationRouter)

try{
    server.listen(8080,()=> console.log("Server started : http://localhost:8080/"))
}catch(err){
    console.log("Error: imposible de démarrer le serveur. "+err)
}

module.exports = store;
