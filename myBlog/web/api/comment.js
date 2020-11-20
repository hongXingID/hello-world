const express = require("express")
const router = express.Router()
const CommentServices = require("../../services/CommentServices")
const { asyncHandler } = require("../getSendResult")

//查找所有博客评论
router.get("/all",asyncHandler(async(req,res,next)=>{
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const result = await CommentServices.findAllBlogPostComment(page,limit)
  return result
}))


//查找指定博客的评论,blogId=-1为留言板评论
router.get("/",asyncHandler(async (req, res, next) => {
  const blogPostId =req.query.id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const result = await CommentServices.findBlogPostComment(page,limit,blogPostId)
  return result
}))

// blogId =-1代表留言板的评论
router.post("/", asyncHandler( async (req, res, next) => {
    const blogId = req.body.blogId;
    const username = req.body.username;
    const content = req.body.content;
    const email = req.body.email;
    const result = await CommentServices.addComment(blogId, username, content, email)
    return result;
}))

router.delete("/:id",asyncHandler(async(req,res,next)=>{
  return  await CommentServices.deleteComment(req.params.id)
}))
module.exports = router