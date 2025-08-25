const express=require("express");
const app=express();

let noOfRequests=0;

const CountReq=(req,res,next)=>{
    noOfRequests++;
    console.log(noOfRequests);
    next();
}

const middleware=(req,res,next)=>{
    const info=req.method;
    console.log(info);
    next();
}

app.get("/",middleware,CountReq,(req,res)=>{
    res.json({message:"GET Request"});
})

app.post("/",middleware,CountReq,(req,res)=>{
    res.json({message:"post Request"});
})

app.put("/",middleware,CountReq,(req,res)=>{
    res.json({message:"put Request"});
})

app.listen(3000);