const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const corsOptions = {
    domain: "http://172.20.16.237:60699/"//
};

app.use(cors(corsOptions));
let regUsers = [
    {
        userName:"Harsha",
        password:"harsha123"
    },
    {
        userName:"WhyShu",
        password:"whyshu"
    }
];
let userName = "";
let isNew = true;
//If the user is already present
const checkAuth = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const isExist = regUsers.find((item) => (item.userName === userName || item.password === password));
    if (isExist) {
        console.log("You should sign in");
        res.status(400).json({ message: "You already have an account" });
    } else {
        const newUser = {
            userName,
            password
        }
        regUsers.push(newUser);
        next();
    }
}

const checkAuthSignin = (req, res, next) => {
    userName = req.body.userName;
    const password = req.body.password;
    const signType = req.body.Signtype;
    const isExist = regUsers.find((item) => item.userName === userName && item.password === password);
    if (isExist) {
        isNew = false;
        next();
    } else if (signType == "Signup") {
        res.status(400).json({ message: "Please create an account." });
    }
    else {
        res.status(200).json({ message: "Invalid Credentials" });
    }

}


app.post("/signinauth", checkAuthSignin, (req, res) => {
    res.json({
        status: "success",
        redirectUrl: `http://172.20.16.237:54995/Todolist?userName=${userName}`
    });
})

app.post("/signupauth", checkAuth, (req, res) => {
    res.json({
        status: "success",
        redirectUrl: `http://172.20.16.237:54995/Todolist?userName=${userName}`
    });
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
});