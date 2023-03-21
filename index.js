import express from "express";
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json())

const SECRET_KEY = "pinks-rtc"

const verifyJWT = async(req, res, next)=>{
    const { token } = req.headers;
   try{
    const decoded = jwt.verify(token, SECRET_KEY)
    next();
   }
   catch(err){
    return res.json({
        success: false,
        message: e.message
    })
   }
}

app.post("/login", async(req,res) => {

    const { email } = req.body;

    const token = jwt.sign({email: email, isAdmin: true}, SECRET_KEY, {expiresIn: '1h'})

    res.json({
        success: true,
        data: {
            email: email,
            jwt_token: token
        },
        message: 'logged in successfully!!'
    })
})

app.post('/deleteLecture', verifyJWT, (req, res)=>{
    res.json({
        success: true,
        message: 'Lecture deleted successfully!!'
    })
})

app.listen(5000, () => {
    console.log("app is sunning on 5000 port");
})