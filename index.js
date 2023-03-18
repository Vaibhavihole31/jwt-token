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

app.listen(5000, () => {
    console.log("app is sunning on 5000 port");
})