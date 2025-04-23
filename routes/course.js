const {Router} = require("express");

const courseRouter = Router();

courseRouter.post("/purchase",function(req,res){
    res.json({
        message:"course purchase endpoints"
    })
})

courseRouter.get("/preview", function(req,res){
    res.json({
        message:"course preview endpoints"
    })
})

module.exports = {
    courseRouter:courseRouter
}