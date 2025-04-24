const {Router} = require("express");
const adminMiddleware = require("../middleware/admin");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase", adminMiddleware ,async function(req,res){

    const userId = req.userId;
    const courseId = req.body.courseId
    
    await purchaseModel.create({
        userId,
        courseId
    })
    
    
    res.json({
        message:"you have successfully course purchased"
    })
})

courseRouter.get("/preview", async function(req,res){
    const courses = await courseModel.find({})

    res.json({
        courses
    })
})

module.exports = {
    courseRouter:courseRouter
}