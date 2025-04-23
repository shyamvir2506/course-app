const {Router} = require('express');

const userRouter = Router();

userRouter.post('/signup',function(req,res){
    res.json({
        message:"signup endpoints"
    })
})

userRouter.post('/signin',function(req,res){
    res.json({
        message:"signin endpoints"
    })
})

module.exports = {
    userRouter:userRouter
};