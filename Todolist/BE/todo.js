const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors({
  origin: "http://172.20.16.237:54995"
}));

app.use(express.json());
let reqUserdata={};
let currentUser="";
let usersTask=[
    {
        userName:"WhyShu",
        tasks:[]
    },{
        userName:"Harsha",
        tasks:[
            {
                task:"Gym"
            },
            {
                task:"Walk"
            }
        ]
    }
];

function CheckUser(userName){
    return usersTask.find((item)=>item.userName===userName);
}

function UpdateTask(id){
    const index=usersTask.findIndex(item=>item.userName===currentUser);
    if(index===-1)return;

    const userTasks=usersTask[index].tasks;

    const newTasks=userTasks.filter(task=>task.id!==id);

    usersTask[index]={
        ...usersTask[index],
        tasks:newTasks
    }
}

app.get("/getTodo",(req,res)=>{
    const user=req.query.userName;
    currentUser=user;
    const usertasksinfo=CheckUser(user);
    console.log(user);
    console.log(usertasksinfo);
    res.status(200).json({Tasks:usertasksinfo.tasks})
})

app.post("/addTodo",(req,res)=>{
    const task=req.body.task;
    const Tasks=CheckUser(currentUser);
    const id=Tasks.tasks.length+1;
    const taskinfo={
        id,
        task
    }
    Tasks.tasks.push(taskinfo);
    res.status(200).json({message:"Successfully updated"});
})

app.post("/deleteTodo",(req,res)=>{
    const id=req.body.id;
    UpdateTask(id);
    res.status(200).json({message:"Successfully updated after deletion"});
})

app.listen(3001,()=>{
    console.log("Listening on port 3001")
})