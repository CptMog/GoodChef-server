const { Sequelize,DataTypes } = require('sequelize')
const User = require('./User')
const Recepie = require('./Recepie')
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Rating = sequelize.define('Rating', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
          }
    },
    id_recepie:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Recepie,
            key: 'id'
          }
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false  
    },
    rate:{
        type:DataTypes.SMALLINT,
        allowNull:false  
    }
})

module.exports = Rating;