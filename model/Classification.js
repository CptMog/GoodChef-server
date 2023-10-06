const { Sequelize,DataTypes } = require('sequelize');
const Recepie = require('./Recepie')
const Category = require('./Category');

const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Classification = sequelize.define('Classification', {
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
    id_category:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Category,
            key: 'id'
          }
    },

})

module.exports = Classification;