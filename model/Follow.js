const { Sequelize,DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
        createdAt:false,
        updatedAt:false,
    }
});
const Follow = sequelize.define('Follow', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    id_follower:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
          }
    },
    id_followed:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
          }
    },
    date_follow:{
        type:DataTypes.DATE,
        allowNull:false  
    }
})

module.exports = Follow;