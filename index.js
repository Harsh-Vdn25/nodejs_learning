const express=require("express");
const app=express();

app.use(express.json());

let kidneyInfo=[
    {
        id:1,
        Name:"X",
        healthy:false
    },
    {
        id:2,
        Name:"Y",
        healthy:true
    },
    {
        id:3,
        Name:"Z",
        healthy:true
    }
]

app.get("/",(req,res)=>{
    let healthyCount=kidneyInfo.filter((kidney)=>kidney.healthy==true);
    res.json(healthyCount);
})

app.post("/postingreq",(req,res)=>{
    const {id,Name,healthy}=req.body;
    if(!Name||typeof(healthy)!=="boolean"){
        return res.status(400).json({message:"Name and healthy(boolean) required"});
    }
    const newKidney={
        id,
        Name,
        healthy
    }
    kidneyInfo.push(newKidney);
    res.status(200).json({message:"Posted successfully"});
})

app.put("/updateinfo",(req,res)=>{
    const {id,Name,healthy}=req.body;

    if(!id||!Name||typeof(healthy)!=="boolean"){
        return res.status(400).json({message:"Check your input"});
    }

    const index=kidneyInfo.findIndex((item)=>item.id===id);

    if(index===-1){
        return res.status(404).json({message:"Kidney info is not found."})
    }

    if(kidneyInfo[index].healthy){
        return res.status(200).json({message:"The kidney is already healthy"});
    }

    kidneyInfo[index]={id,Name,healthy};

    res.json({ message: "Updated successfully", updated: kidneyInfo[index] });
})

app.delete("/deleteinfo",(req,res)=>{
    const {id}=req.body;
    const index=kidneyInfo.findIndex((item)=>item.id===id);
    if(index===-1){
        return res.status(404).json({message:"Error Not Found"});
    }
    const deleted=kidneyInfo.splice(index,1);
    res.json({ message: "Deleted ", deleted: deleted[0]});
})

app.listen(3000);