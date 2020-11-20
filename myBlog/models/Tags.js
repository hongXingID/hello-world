const sequelize = require("./db");
const { DataTypes } = require("sequelize")

//定义Tags表

const Tags = sequelize.define("Tags", {
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
})
module.exports = Tags;