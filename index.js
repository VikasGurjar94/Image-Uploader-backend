const express = require("express") ;

const app = express() ;

app.get("/",(req , res)=>{
    res.send("hello image uploader") ;
})

const port = 1000 ;

app.listen(port , ()=>{
    console.log(`Server is running on the port : ${port}` ) ;
})