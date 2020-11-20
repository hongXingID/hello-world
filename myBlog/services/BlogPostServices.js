const BlogPost = require("../models/BlogPost");
const Tags = require("../models/Tags");
const TagsServices = require("./TagsServices")
const Sequelize = require('sequelize');
const BlogPost_Tags = require("../models/BlogPost_Tags");
const Op = Sequelize.Op;

//不调用的话会出bug
require("../models/BlogPost_Tags")

//添加博客文章，参数为title，content,description,tags数组
exports.addBlogPost = async function (title, content, description, tags) {
      const newBlogPost = await BlogPost.create({
            title,
            content,
            description,
            views: 0
      })
      for (let i = 0; i < tags.length; i++) {
            const res = await TagsServices.findTag(tags[i]);
            if (res == null) {
                  TagsServices.addTags(tags[i])
            }
      }

      const newTags = await Tags.findAll({
            where: {
                  tag: tags
            }
      }
      )
      await newBlogPost.setTags(newTags)
      return true
}

//删除博客文章，传入id
exports.deleteBlogPost = async function (blogPostId) {
    const result = await  BlogPost.destroy({
            where: {
                  id: blogPostId
            }
      })
      return result

}

//增加浏览数
exports.updataView = async function (views, blogPostId) {
      BlogPost.update({
            views
      }, {
            where: {
                  id: blogPostId
            }
      })
}

//查找所有博客文章
exports.findBlogPost = async function (limit = 10, page = 1) {
      const result = await BlogPost.findAndCountAll({
            include: [{
                  model: Tags,
                  attributes:  ['tag']
            }
            ],
            attributes: ["title", "description", "views", "createdAt", "id"],
            limit: +limit,
            offset: (page - 1) * limit,
            order: [["id", "DESC"]]
      })
      const blogCount = await BlogPost.findAndCountAll()
      return {
            total: blogCount.count,
            datas: JSON.parse(JSON.stringify(result.rows))
      }
}

//查找文章，按照浏览量排名
exports.findHotBlogPost = async function(limit = 10,page=1){
      const result = await BlogPost.findAndCountAll({
            attributes: ["title","views", "id"],
            limit: +limit,
            offset: (page - 1) * limit,
            order: [["views", "DESC"]]
      })
      return JSON.parse(JSON.stringify(result))
}


//模糊查询
exports.fuzzyQueryBlogPost = async function (word) {
      const result = await BlogPost.findAll({
            raw: true,
            order: [
                  ['views', 'DESC']
            ],
            where: {
                  title: {
                        [Op.like]: '%' + word + '%'
                  }
            },
            attributes: ['id', 'title', 'views', 'description', 'createdAt']
      })
      if (!result) {
            return null;
      } else {
            return result
      }
}

//查找指定博客文章，传入博客Id
exports.findOneBlogPost = async function (blogPostId) {
      const result = await BlogPost.findByPk(blogPostId, {
            include: [{
                  model: Tags
            }]
      })
      if (!result) {
            return null
      } else {
            return result.dataValues
      }
}