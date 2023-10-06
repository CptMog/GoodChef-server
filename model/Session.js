const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize("mysql://root:@localhost:3306/dbrc",{
    define:{
        freezeTableName:true,
    }
});
const Session = sequelize.define("Sessions", {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
});

module.exports = Session;