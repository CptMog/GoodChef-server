const { Sequelize,DataTypes } = require('sequelize');

const Ingredient = require('./Ingredient');
const Recepie = require('./Recepie');
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Composition = sequelize.define('Composition', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    id_recepie:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Recepie,
            key: 'id'
          }
    },
    id_ingredient:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Ingredient,
            key: 'id'
          }
    },
    qte:{
        type:DataTypes.SMALLINT,
        allowNull:false  
    }
})

module.exports = Composition;