const {Router} = require("express");

const adminRouter = Router();

adminRouter.post("/signup", function(req, res){
    res.json({
        message:"admin signin endpoints"
    })
})

adminRouter.post("/sigin",function(req,res){
    res.json({
        message:"admin login endpoints"
    })

})
adminRouter.post("/course", function(req, res){
    res.json({
        message:"admin course endpoints"
    })
})
adminRouter.put("/course",function(req,res){
    res.json({
        message:"admin course update"
    })
})

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message:"admin buld course endpoints"
    })
})

module.exports = {
    adminRouter:adminRouter
};