const express=require("express");
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

let reqUserdata={};
let usersTask=[
    {
        userName:"Harsha",
        tasks:[
            "roisjig",
            "esijfidsng"
        ]
    }
];

function CheckUser(userName){
    return usersTask.find((item)=>item.userName===userName);
}

app.post("/todo",(req,res)=>{
    reqUserdata=CheckUser(req.body.userName);
    if(reqUserdata){
        res.json({message:"user sent his data"})
        console.log(reqUserdata)
}else{
    res.json({message:"Nope nope"});
}    
})

app.get("/getTodo",(req,res)=>{
    
})

app.listen(3001,()=>{
    console.log("Listening on port 3001")
})