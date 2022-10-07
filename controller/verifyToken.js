const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token 
    if(authHeader){
           const token = authHeader.split(" ")[1]
           jwt.verify(token,process.env.SECRET_KEY,(err,user)=> {
            if(err) res.status(403).json("token is not vaild")
            req.user = user
            next()
           })
    }else {
        res.status(401).json("you are not authenticated")
    }
}


const authorization = (req,res,next) =>  {
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alowed to do that!")
        }
    })
}

const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else {
            res.status(403).json("You are not alowd to do that!")
        }
    })
}
module.exports = {verifyToken,authorization, verifyAdmin}