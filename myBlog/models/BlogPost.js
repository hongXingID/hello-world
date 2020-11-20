const sequelize = require("./db");
const { DataTypes } = require("sequelize");

//定义BlogPost表
const BlogPost = sequelize.define("BlogPost", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
    type:DataTypes.STRING,
    allowNull:false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    views:{
        type:DataTypes.STRING,
        allowNull:false  
    }
},{
    createdAt:true,
    updatedAt:true,
    paranoid:true
});

module.exports = BlogPost;
