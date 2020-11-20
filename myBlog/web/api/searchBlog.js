const express = require("express")
const router = express.Router();
const BlogPostServices = require("../../services/BlogPostServices")

router.get("/:title",async (req,res,next)=>{
    const result = await BlogPostServices.fuzzyQueryBlogPost(req.params.title)
    res.send(result)
})

module.exports = router;