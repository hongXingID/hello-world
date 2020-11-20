const express = require("express");
const router = express.Router()
const TagsServices = require("../../services/TagsServices")
const { asyncHandler } = require("../getSendResult")


router.get(
    "/",
    async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await TagsServices.findAllTag(page, limit);
        const json = JSON.stringify(result);
        res.send(json)
    }
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        return await TagsServices.findTag(req.params.id);
    })
);

router.get(
    "/findTagId/:tag",
    asyncHandler(async (req, res) => {
        return await TagsServices.findTagId(req.params.tag);
    })
);

router.get(
    "/findBlogPost/:tag",
    asyncHandler(async (req, res) => {
        return await TagsServices.findBlogPost(req.params.tag);
    })
);

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        return await TagsServices.addTags(req.body.tag);
      })
);

  router.delete(
    "/:id",
    asyncHandler(async (req, res, next) => {
      return await TagsServices.deleteTags(req.params.id);
    })
  );

  router.put(
    "/:id",
    asyncHandler(async (req, res, next) => {
      return await TagsServices.updateTag(req.params.id,req.body.tag);
    })
  );

module.exports = router;
