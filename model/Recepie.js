const { Sequelize,DataTypes } = require('sequelize');

const User = require('./User');
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Recepie = sequelize.define('Recepie', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    id_author:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
          }
    },
    title:{
        type:DataTypes.STRING(255),
        allowNull:false  
    },
    description:{
        type:DataTypes.STRING(255),
        allowNull:false  
    },
    ingredients:{
        type:DataTypes.TEXT,
        allowNull:false  
    },
    steps:{
        type:DataTypes.TEXT,
        allowNull:false  
    },
    image:{
        type:DataTypes.STRING(255),
        allowNull:false  
    },
    video:DataTypes.STRING(255),
    protein:DataTypes.DECIMAL(10,0),
    fats:DataTypes.DECIMAL(10,0),
    calories:DataTypes.DECIMAL(10,0),
    fiber:DataTypes.DECIMAL(10,0),
    time_prepare:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    time_rest:DataTypes.STRING(20),
    time_cooking:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    une:{
        type:DataTypes.ENUM('0','1'),
        allowNull:false,
        defaultValue:'0'
    },
    trend:{
        type:DataTypes.ENUM('0','1'),
        allowNull:false,
        defaultValue:'0'
    },
    url:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    moderation_state:{
        type:DataTypes.ENUM('-1','0','1'),
        allowNull:false,
        defaultValue:'-1'
    }
})

module.exports = Recepie;