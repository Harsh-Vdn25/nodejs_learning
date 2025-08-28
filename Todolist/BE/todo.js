const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());

app.use(express.json());

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { task } = req.body;
        const { userId } = req.query;
        const newTodo = await pool.query("INSERT INTO todolist (description,user_id) VALUES($1,$2) RETURNING *",
            [task, userId]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//Get all the todos
app.get("/todos", async (req, res) => {
    try {
        const userId = Object.entries(req.query);
        console.log(userId[0][1]);
        const Todos = await pool.query("SELECT tlst.todo_id,tlst.description FROM userinfo u JOIN todolist tlst ON u.user_id=tlst.user_id WHERE tlst.user_id=$1", [userId[0][1]]);
        res.json(Todos.rows);
    } catch (err) {
        console.log(err.message);
    }
})


//Delete todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        console.log(id);
        const deleteTodo = await pool.query(
            `DELETE FROM todolist tlst
            USING userinfo u
            WHERE tlst.todo_id = $1
            AND tlst.user_id = u.user_id
            AND u.user_name = $2`,
            [id, userId]
        );

        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(3001, () => {
    console.log("Listening on port 3001")
});