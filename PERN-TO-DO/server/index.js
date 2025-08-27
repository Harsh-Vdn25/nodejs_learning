const express=require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");


app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());

//create a todo
app.post("/todos",async(req,res)=>{
    try{
        const {description}=req.body;
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo);
    }catch(err){
        console.log(err.message);
    }
})

//Get all the todos
app.get("/todos", async (req, res) => {
    try {
        res.set('Cache-Control', 'no-cache');
        const Todos = await pool.query("SELECT * FROM todo");
        res.json(Todos.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//Get the askedtodo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const Todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(Todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Update a Todo
app.put("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {description}=req.body;
        const UpdatedTodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id])
        res.json(UpdatedTodo);
    }catch(err){
        console.log(err.message);
    }
})

//Delete todo
app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        console.log("Deleted");
        res.status(200).json({message:"Deleted"});
    }catch(err){
        console.log(err.message);
    }
})
app.listen(5000,()=>{
    console.log("Server has started on port 5000");
})