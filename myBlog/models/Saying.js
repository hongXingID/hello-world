const sequelize = require("./db");
const { DataTypes } = require("sequelize")

//定义Saying表
const Saying = sequelize.define("Saying",{
    content:{
        type:DataTypes.TEXT,
        allowNull:null
    }
},{
    createdAt:true,
    updatedAt:true,
    paranoid:true
})

module.exports=Saying;
