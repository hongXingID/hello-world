const express = require("express")
const router = express.Router()
const BlogPostServices = require("../../services/BlogPostServices")
const { asyncHandler } = require("../getSendResult")
const captcha = require("svg-captcha")

router.get("/", async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await BlogPostServices.findBlogPost(limit, page)
    res.send(JSON.stringify(result))
})

router.get("/hotViews",async(req,res,next)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await BlogPostServices.findHotBlogPost(limit, page)
    res.send(JSON.stringify(result))
})

//返回验证码
router.get("/comment/code",async (req,res,next)=>{
    const img = captcha.create({
        fontSize:50,
        width:100,
        height:35
    })

    res.send(img)
})

router.get("/:id/:views", async (req, res, next) => {
    
    const newViews = +req.params.views + 1;
    await BlogPostServices.updataView(newViews, req.params.id)
    const result = await BlogPostServices.findOneBlogPost(req.params.id)
    res.send(result);
})



router.post("/", async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const description = req.body.description;
    const tags = req.body['tags'];
    const result = await BlogPostServices.addBlogPost(title, content, description, tags)
    res.send(JSON.stringify(result))
})

router.delete("/:id", asyncHandler(async (req, res, next) => {
    return await BlogPostServices.deleteBlogPost(req.params.id);
}))




module.exports = router