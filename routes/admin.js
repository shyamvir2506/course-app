const {Router} = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const adminMiddleware = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async function(req, res){

    const {name,email,password} = req.body;
    await adminModel.create({
        name,
        email,
        password
    })

    res.json({
        message:"admin signup done"
    })
})

adminRouter.post("/sigin", async function(req,res){

    const {email,password} = req.body;
    const admin = await adminModel.findOne({
        email,
        password
    })

    if(admin){
        const token = jwt.sign({
            id:admin._id, 
            
        },JWT_ADMIN_PASSWORD)
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }

    

})
adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const {title,desc,imageUrl,price} = req.body;

    const course = await courseModel.create({
        title,
        desc,
        imageUrl,
        price,
        creatorId:adminId
    })


    res.json({
        message:"admin course endpoints",
        courseId:course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req,res){
    const adminId = req.adminId;
    const {title,desc,imageUrl,price,courseId} = req.body;
    const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title,
        desc,
        imageUrl,
        price
    })

    res.json({
        message:"admin course updated",
        courseId:course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware, async function(req,res){
    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId:adminId
    })


    res.json({
        message:"admin buld course endpoints",
        courses
    })
})

module.exports = {
    adminRouter:adminRouter
};