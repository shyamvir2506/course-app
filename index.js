require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const {courseRouter} = require("./routes/course");

const app = express();
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

const PORT = process.env.PORT || 3000;

app.get("/", function(req,res){
    res.send("hello shyam");

})

async function main() {
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(PORT, ()=>{
        console.log(`server is running on port:${PORT}`);
    })
}

main();
