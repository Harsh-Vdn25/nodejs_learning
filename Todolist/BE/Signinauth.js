const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
app.use(express.json());

const corsOptions = {
    origin: "http://172.20.16.237:49830"
};

app.use(cors(corsOptions));

//If the user is already present
const checkAuth = async (req, res, next) => {
    const userName = req.body.userName;
    const result = await pool.query("SELECT user_id FROM userinfo uinf WHERE uinf.user_name=$1",[userName]);
    if (result.rows.length>0) {
        console.log("You should sign in");
        res.status(400).json({ message: "You already have an account" });
    } else {
        next();
    }
}

const checkAuthSignin = async(req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const signType = req.body.Signtype;
    const isExist = await getUSerId(userName,password);
    if (isExist) {
        next();
    } else if (signType == "Signup") {
        res.status(400).json({ message: "Please create an account." });
    }
    else {
        res.status(400).json({ message: "Invalid Credentials" });
    }

}

const getUSerId=async (name,password)=>{
    const result=await pool.query("SELECT user_id FROM userinfo uinf WHERE uinf.user_name=$1 AND uinf.password=$2",[name,password]);
    return result.rows[0]?.user_id;
}

    const newUSer = async (name, password) => {
    // The RETURNING clause will get the user_id from the newly inserted row
    const result = await pool.query("INSERT INTO userinfo(user_name, password) VALUES ($1,$2) RETURNING user_id", [name, password]);
    return result.rows[0]?.user_id;
}

app.post("/signinauth", checkAuthSignin, async (req, res) => {
    const unique_userId=await getUSerId(req.body.userName,req.body.password);
    res.json({
        status: "success",
        redirectUrl: `http://172.20.16.237:3000/Todolist?userId=${unique_userId}`
    });
})

app.post("/signupauth", checkAuth, async (req, res) => {
    const unique_userId=await newUSer(req.body.userName,req.body.password);
    res.json({
        status: "success",
        redirectUrl: `http://172.20.16.237:3000/Todolist?userId=${unique_userId}`
    });
})


app.listen(5000, () => {
    console.log("Listening on port 5000");
});