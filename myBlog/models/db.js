//连接数据库
const {Sequelize} = require("sequelize")
const sequelize = new Sequelize('my_blog','root','123456',{
    host:'129.204.171.99',
    port:3306,
    dialect:"mysql"
})
module.exports = sequelize;

