const User = require('../model/User')
const bcrypt = require('bcryptjs')


const userUpdate = async (req,res) => {
   
           
          if (req.body.password) {
             req.body.password = bcrypt.hashSync(req.body.password,8)
          }

         try{
          const user = await User.findByIdAndUpdate(req.params.id, {
           $set: req.body,
         
          },{new:true})
        
          res.send(user)
    
         }catch(error){
            res.status(500).json(error)
         }
    }


const userDelete = async (req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(user)

    }catch(errr){
        res.status(500).json(errr)
    }
}

const userGetAll = async (req,res) =>{
    
    try {
      const user = await User.find({})
      res.status(200).send(user)
    }catch(error){
        res.status(500).json(error)
    }
}


const userGet = async (req,res) =>{
    
       try{

           const user = await User.findById(req.params.id)
           res.status(200).send(user)
       }catch(error){
         res.status(500).json(error)
       }
}


module.exports = {
    userUpdate,
    userDelete,
    userGetAll,
    userGet,
}


