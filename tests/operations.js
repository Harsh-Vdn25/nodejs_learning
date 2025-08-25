const express=require("express");
const app= express();

let noOfRequests=0;
let valArray=[];

function StrToInt(req,res,next){
    valArray=Object.values(req.query).map((item)=>parseInt(item));
    req.valArray=valArray;
    next();
}

const CountReq=(req,res,next)=>{
    noOfRequests++;
    console.log(noOfRequests);
    next();
}

const middleware=(req,res,next)=>{
    const info=req.method;
    const URL=req.originalUrl;
    const timestamp=new Date().toISOString();
    console.log(`[${timestamp}],${info},${URL}`)
    next();
}

app.use(StrToInt);
app.use(middleware);
app.use(CountReq);

app.get("/multiply",(req,res)=>{
    const productval=valArray.reduce((acc,num)=>acc*num,1);
    res.json({Product:productval});
})


app.get("/add",(req,res)=>{
    const sumval=valArray.reduce((acc,num)=>acc+num,0);
    res.json({Sum:sumval});
})


app.get("/sub",(req,res)=>{
    const DifferenceVal=valArray.reduce((acc,num)=>acc-num);
    res.json({Difference:DifferenceVal});
})

app.get("/divide",(req,res)=>{
    const Division=valArray.reduce((acc,num)=>acc/num);
    res.json({Division:Division});
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});