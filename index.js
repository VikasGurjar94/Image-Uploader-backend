const express = require("express") ;
const path = require("path") ;
require("dotenv").config() ;
const mongoose = require("mongoose") ;


const app = express() ;

app.use(express.static(path.join(path.dirname(__filename) , "public"))) ;
app.use(express.urlencoded({extended:true})) ;

mongoose.connect(process.env.MONGO_URI , {
    dbName :"imageUploads"
}).then(()=> console.log("mongodb connected successfully!!")).catch((err)=> console.log(err)) ;

app.get("/",(req , res)=>{
    res.render("index.ejs" , {url : null}) ;
})

const port = process.env.PORT || 8000;

app.listen(port , ()=>{
    console.log(`Server is running on the port : ${port}` ) ;
})