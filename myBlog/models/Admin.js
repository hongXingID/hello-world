const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const md5 = require("md5")
//创建一个模型对象
const Admin = sequelize.define(
  "Admin",
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true 
  }
);

//初始化一个账号root
Admin.create({
  loginId:"root",
  loginPwd:md5("123456")
})

module.exports = Admin;
