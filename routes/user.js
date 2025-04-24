const {Router} = require('express');
const { userModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const userMiddleware = require('../middleware/user');



const userRouter = Router();

userRouter.post('/signup', async function(req,res){

    const {name,email,password} = req.body;

    await userModel.create({
        name,
        email,
        password
    })

    res.json({
        message:"signup endpoints"
    })
})

userRouter.post('/signin', async function(req,res){
    const {email,password} = req.body;

    const user = userModel.findOne({
        email,
        password
    })

    if(user){
        const token = jwt.sign({
            id:user._id,

        }, JWT_USER_PASSWORD)

        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
    
})
userRouter.get("/purchases",userMiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await userModel.find({
        userId
    })
    let purchasedCourseIds = [];
    for(let i=0;i<purchases.length;i++){
        purchasedCourseIds.push(purchases[i].courseId);
    }
    const coursesData = await courseModel.find({
        _id:{$in:purchasedCourseIds}
    })

    res.json({
        purchases,
        coursesData
    })
    
})
module.exports = {
    userRouter:userRouter
};