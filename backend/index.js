const express=require("express")
const mongoose=require("mongoose")
const bodyParser = require('body-parser');

const app=express()
const cors=require("cors")

app.use(cors())

app.use(bodyParser.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/lunchmate").then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("not connected to database")
})

const Details=mongoose.model("Details",{
    userName:String,
    emailId:String,
    password:String,
    confirmPassword:String,
    phoneNumber:String
},"details")

app.post("/login",function(req,res){
    Details.find().then(function(retdata){
        console.log(retdata)
        res.send(retdata)
    })
})

app.post("/User/SignUp",function(res,req){
    console.log(req.body)

    var userName=req.body.userName
    var emailId=req.body.emailId
    var password=req.body.password
    var confirmPassword=req.body.confirmPassword
    var phoneNumber=req.body.phoneNumber

    var newData=new Data({
        userName:userName,
        emailId:emailId,
        password:password,
        confirmPassword:confirmPassword,
        phoneNumber:phoneNumber

    }
)
    newData.save().then(function(){
        console.log("user created successfully")
    })

    
})


app.listen(3001,function(){
    console.log("server is running on port 3001")
})