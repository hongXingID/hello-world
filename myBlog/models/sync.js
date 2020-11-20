require("./BlogPost")
require("./Saying")
require("./Tags")
require("./Comment")
require("./BlogPost_Tags")
require("./Admin")

const sequelize = require("./db")
sequelize.sync({ alter: true }).then(() => {
    console.log("所有模型同步完成")
})