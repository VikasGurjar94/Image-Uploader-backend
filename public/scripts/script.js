const form = document.querySelector("form");
const uploadInput = document.querySelector("#uploadInput") ;
const submitBtn = document.querySelector("#submit-btn")

const img = document.querySelector("img")


form.addEventListener("submit" , (e)=>{

   
         if(!uploadInput.value){
            e.preventDefault() ;
            alert("Upload image first !")
        }
    
})



