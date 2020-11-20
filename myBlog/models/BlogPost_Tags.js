const BlogPost = require("./BlogPost")
const sequelize = require("./db")
const Tags = require("./Tags")
const {DataTypes} = require("sequelize")

const BlogPost_Tags = sequelize.define("BlogPost_Tags",{
    BlogPostId:{
        type:DataTypes.INTEGER,
        references:{
            model:BlogPost,
            key:'id'
        }
    },
    TagId:{
        type:DataTypes.INTEGER,
        references:{
            model:Tags,
            key:'id'
        }
    }
})

BlogPost.belongsToMany(Tags,{
    through:{
        model:BlogPost_Tags
    }
})

Tags.belongsToMany(BlogPost,{
    through:{
        model:BlogPost_Tags
    }
})

module.exports = BlogPost_Tags;
