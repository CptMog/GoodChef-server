const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const User = sequelize.define('User', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    first_name:{
        type:DataTypes.STRING(100),
        allowNull:false  
    },
    last_name:{
        type:DataTypes.STRING(100),
        allowNull:false  
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false  
    },
    description:DataTypes.STRING(255),
    password:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    image:DataTypes.STRING(255),
    is_admin:{
        type:DataTypes.ENUM('1','0'),
        allowNull:false,
        defaultValue:'0'
    }
    
})

module.exports = User;