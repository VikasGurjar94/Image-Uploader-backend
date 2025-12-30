require("dotenv").config() ;
const express = require("express") ;
const path = require("path") ;
const mongoose = require("mongoose") ;
const upload = require("./middlewares/upload")
const cloudinary = require("cloudinary").v2;

const app = express() ;


// Configuration

cloudinary.config({ 
    cloud_name: process.env.cloud_name ,
    api_key: process.env.api_key ,
    api_secret: process.env.api_secret ,
});
 

app.use(express.static(path.join(path.dirname(__filename) , "public"))) ;
app.use(express.urlencoded({extended:true})) ;


mongoose.connect(process.env.MONGO_URI , {
    dbName :"imageUploads"
}).then(()=> console.log("mongodb connected successfully!!")).catch((err)=> console.log(err)) ;


app.get("/",(req , res)=>{
    res.render("index.ejs" , {url : null}) ;
})


app.post('/form-submit', upload.single('uploadedImg'), async (req, res)=>{
    
    const uploadResult = await cloudinary.uploader
 .upload(
     req.file.path,{
         folder : "ImageUploaderImages",
     }
 )
 .catch((error) => {
     console.log(error);
 });

    console.log(uploadResult);

    const public_id = uploadResult.public_id ;

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl =  cloudinary.url(public_id, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    

    res.render("index.ejs" , {url : autoCropUrl}) ;

      })



const port = process.env.PORT || 8000;

app.listen(port , ()=>{
    console.log(`Server is running on the port : ${port}` ) ;
})