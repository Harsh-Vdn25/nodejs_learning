const express = require("express");
const pool = require('./db');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "ilovecoding";

app.use(express.json());
app.use(cors());

const auth = async (req, res, next) => {
    const user_name = req.body.username;
    const password = req.body.password;
    try {
        if (!user_name || !password) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const result = await pool.query(`
        SELECT t_c.username,t.teacher_id 
        FROM teachers t 
        JOIN 
        t_credentials t_c
        ON t.username=t_c.username
        WHERE t_c.username=$1 AND 
        t_c.password=$2 
        `, [user_name, password]);
        if (result.rows.length > 0) {
            console.log(result.rows[0]?.username,result.rows[0]?.teacher_id);
            const token = createToken(result.rows[0]?.username,result.rows[0]?.teacher_id);
            req.token = token;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        res.json({ status: "error", message: "Login failed" });
    }
}

const createToken = (user_name,id) => {
    const token = jwt.sign({
        username: user_name,
        id:id
    }, JWT_SECRET);
    return token;
}

app.post("/signin", auth, (req, res) => {
    res.status(200).json({
        status: "success",
        token: req.token
    });
})

app.listen(5000, () => {
    console.log("Listening on port 5000");
})

