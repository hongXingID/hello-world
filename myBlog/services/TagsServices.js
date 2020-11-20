const BlogPost = require("../models/BlogPost")
const Tags = require("../models/Tags")

//引入一下关系表
require("../models/BlogPost_Tags")


//增加Tag
exports.addTags = async function (tag) {
  
    //增加前先查找是否存在该tag
    const res = await Tags.findOne({
        where:{
            tag,
        }
    })
    if(res){
        //存在tag，直接返回"have the tag"
        return "have the tag"
    }
    
    const ins = await Tags.create({
        tag,
    })
    return ins.toJSON()
}

//删除Tag，通过Tag对应的Id
exports.deleteTags = async function (TagId) {
    await Tags.destroy({
        where: {
            id: TagId
        }
    })
}

// 修改Tag
exports.updateTag = async function (TagId, Tag) {
    await Tags.update({
        tag: Tag
    }, {
        where: {
            id: TagId,
        }
    })
}

//查找单个Tag，传入指定id
exports.findTag = async function (TagId) {
    const result = await Tags.findByPk(TagId)
    if (result) {
        return result.toJSON()

    }
    return null;
}

//通过tag查找id
exports.findTagId = async function(tag){
    const result = await Tags.findOne({
        where:{
            tag,
        }
    })
    if(result == null){
        return result;
    }
    return result.toJSON()
}

//通过tag查找博客
exports.findBlogPost = async function(tag){
    const result = await Tags.findAndCountAll({
        where:{
            tag,
        },
        include:[{
            model:BlogPost,
            attributes:["title","views","description","id","createdAt"]
        }],
        attributes:["tag"]
    })
return result.rows
}

//查找所有Tag，可以传入指定参数page和lim
exports.findAllTag = async function (page = 1, lim = 10) {
    const result = await Tags.findAndCountAll({
        attributes: ["id", "tag"],
        limit: +lim,
        offset: (page - 1) * lim,
        order:[['id','DESC']]
    })
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}



