const express = require('express') 
const  mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./router/auth')
const userRoute = require('./router/user')
const app = express()

dotenv.config()

mongoose.set("useNewUrlParser",true)
mongoose.set("useCreateIndex",true)
mongoose.set("useFindAndModify",false)
mongoose.set("useUnifiedTopology",true)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB sucessfull connection!")
}).catch((error)=>{
    console.log(error)
})



app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)


app.listen(process.env.PORT,()=>{
    console.log("Running server in port 5000")
})