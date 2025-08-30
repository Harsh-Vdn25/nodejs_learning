const express = require("express");
const pool = require('./db');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "ilovecoding";

app.use(express.json());
app.use(cors());

const auth = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({
            status: "Unauthorized"
        })
    }
    try {
        const result = jwt.verify(token, JWT_SECRET);
        console.log(result);
        const foundUser=await pool.query("SELECT username FROM teachers WHERE username=$1",[result.username]);
        if(foundUser){
            req.teacher_id=result.id;
            next();
        }else{
            res.status(401).json({message: "Unauthorized"})
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

app.use(auth);

app.get('/attendance', async(req, res) => {
    try{
        const students=await pool.query(`
            SELECT s.student_name,s.stu_id
            FROM students s JOIN teachers t
            ON s.teacher_id=t.teacher_id
            WHERE t.teacher_id=$1
          `,[req.teacher_id]);
          console.log(students.rows);
          res.status(200).json(students.rows);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
})



app.post('/addstu',async(req,res)=>{
    if(!req.body.name){
        res.status(400).json({ message: "Invalid request" });
    }
    try{
        const students=await pool.query(`
            INSERT INTO students(student_name,teacher_id)
            VALUES ($1,$2)
            `,[req.body.name,req.teacher_id]);
            res.status(200).json({message:"Added student successfully"})
    }catch(err){
        res.status(404).json({ message: err.message });
    }
})

const Mark=async(student)=>{

}

//posting attendance (use a map function to map over the students object and mark them as present or absent)
app.post('/attendance',(req,res)=>{
    
})

app.listen(5001, () => {
    console.log("App is listening on port 5001");
})