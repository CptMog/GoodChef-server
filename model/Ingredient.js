const { Sequelize,DataTypes } = require('sequelize');
const Category = require('./Category');
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Ingredient = sequelize.define('Ingredient', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    id_category:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Category,
            key: 'id'
          }
    },
    name:{
        type:DataTypes.STRING(255),
        allowNull:false  
    },
    weight:{
        type:DataTypes.DECIMAL(10,0),
        allowNull:false  
    },
    volume:{
        type:DataTypes.DECIMAL(10,0),
        allowNull:false  
    },
    protein:DataTypes.DECIMAL(10,0),
    fats:DataTypes.DECIMAL(10,0),
    calories:DataTypes.DECIMAL(10,0),
    fiber:DataTypes.DECIMAL(10,0)
})

module.exports = Ingredient;