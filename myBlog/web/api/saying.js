const express = require("express")
const router = express.Router()
const Saying = require("../../services/SayingServices")
const { asyncHandler } = require("../getSendResult")


router.get("/", async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await Saying.findAllSaying(page, limit)
    res.send(JSON.stringify(result))
})

// router.get("/:id", asyncHandler(async (req, res, next) => {
//     const result = await Saying.findOneSaying(req.params.id)
//     return JSON.stringify(result)
// }))

router.post("/", asyncHandler(async (req, res, next) => {
    return await Saying.addSaying(req.body.content)

}))

router.delete("/:id", asyncHandler(async (req, res, next) => {
    return await Saying.deleteSaying(req.params.id)
}))


module.exports = router