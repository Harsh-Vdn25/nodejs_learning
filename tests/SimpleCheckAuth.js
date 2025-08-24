const express=require("express");
const app=express();

const CheckAuth=(req,res,next)=>{
    const token=req.headers["authorization"];
    if(isValid=="true"){
        next();
    }else{
        res.status(401).json({message:"Unauthorized"});
    }
}



app.get("/dashboard",CheckAuth,(req,res)=>{
    res.json({message:"Welcome to the dashboard"})
})

app.listen(3000,()=>{
    console.log("Listening on port 3000"); 
});

