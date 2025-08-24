const express=require("express");
const app=express();

let noOfreqPerUser={};
setInterval(() => {
    noOfreqPerUser={};
}, 1000);
app.use(function(req,res,next){
    const userId=req.header("user-id");
    if(noOfreqPerUser[userId]){
        noOfreqPerUser[userId]+=1;
        if(noOfreqPerUser[userId]>5){
            res.status(404).json({message:"Get the fuck out bitch"});
            console.log("There is a hacker");
            return;
        }else{
            next();
        }
    }else{
        noOfreqPerUser[userId]=1;
        next();
    }
})

app.get("/",(req,res)=>{
    res.json({message:"Good to go dude"});
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});