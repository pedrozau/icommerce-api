const User = require('../model/User')
const bcrypt = require('bcryptjs')
const  jwt  = require('jsonwebtoken')
const  dotenv = require('dotenv')
dotenv.config()

const Register = async (req,res)=> {
    const user = new User({
       username: req.body.username,
       email: req.body.email,
       password: bcrypt.hashSync(req.body.password,8)
    })

   try {

     const userSave = await user.save()
     res.status(200).json(userSave)
 

   }catch(error){
    res.status(500).json(error)
   }
}

const Login  = async (req, res)=> {
  message = {
     info:""
  }

  const name = req.body.username  
  const userpassword = req.body.password

    try{
      if (name.length == 0  || userpassword.length == 0){
               message.info = "filds username or password empty!"
               res.send(message)
      }else{
         const user = await User.findOne({username:req.body.username})
         if(!user){
          message.info = "User not found!"
           res.send(message)
         }else{
             if(bcrypt.compareSync(req.body.password, user.password)){
                  const token = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                  },process.env.SECRET_KEY,{expiresIn:"1d"})
                  const {password,...other} = user._doc
                  res.send({...other,token})
             }else {  
              message.info = "password is incorrect try again!"
              res.send(message)
             }
 
       }

       }
    }catch(error){
     res.status(500).json(error)
    }
}



module.exports = {
    Login,
    Register,
}