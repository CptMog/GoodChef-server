const { Sequelize,DataTypes } = require('sequelize')
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Category = sequelize.define('Category', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type:DataTypes.STRING(255),
        allowNull:false
    },
    image: DataTypes.STRING(255),
    showed:{
        type:DataTypes.ENUM('0','1'),
        allowNull:false,
        defaultValue:'0'
    },
})

module.exports = Category;