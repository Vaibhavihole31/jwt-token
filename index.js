import express from "express";
import jwt from 'jsonwebtoken';

const secretKey = "pinks-rtc"
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "a simple api"
    })
})

app.post("/login", (req,res) => {
    const user = {
        id: 1,
        username: "pinks",
        email: "pinks@gmail.com"
    }

    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/profile",verifyToken,(req,res)=>{
jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
        res.send({result: "invalid token"})
    }
    else{
        res.json({
            message: "profile accessed",
            authData
        })
    }
})
})

function verifyToken(req, res, next){
const bearerHeader = req.headers['authorization'];

if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
}
else{
    res.send({
        result: "Token Is Not Valid"
    })
}
}

app.listen(5000, () => {
    console.log("app is sunning on 5000 port");
})