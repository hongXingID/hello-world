const Saying = require("../models/Saying");

//增加Saying的content
exports.addSaying = async function (content) {
    const ins = await Saying.create({
        content,
    })
    return ins.toJSON()
}

//删除Saying，传入指定的id
exports.deleteSaying = async function(SayingId){
     await Saying.destroy({
        where:{
            id:SayingId
        }
     })
}

//修改Saying的内容，传入为两个参数，分别为id和content
exports.updateSaying = async function(id,content){
    await Saying.update({
        content,
    },{
          where:{
              id,
          }
    })
}


//查找单个，通过id查找
exports.findOneSaying = async function (SayingId){
    const result = await Saying.findByPk(SayingId)
    //此时result有两种情况，有和无
    if(result){
        return result.toJSON();
    }
    return null;
}

//查找所有，可以传入指定参数查找部分数据 page为第几页，limit为显示数据的条数

exports.findAllSaying = async function(page = 1,lim = 10){
    const result = await Saying.findAndCountAll({
        attributes:["id","content"],
        offset:(page - 1)*lim,
        limit:+lim,
        order:[["id","DESC"]]
    })
    return {
        total:result.count,
        datas:JSON.parse(JSON.stringify(result.rows))
    }
}

