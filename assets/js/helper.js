

let cl = console.log;


const owlCarousel = async () => {
    let res = await $('.owl-carousel').owlCarousel({
         loop:true,
         margin:10,
         nav:false,
         dots : false,
         autoplay : true,
         autoplayTimeout : 1500,
         responsive:{
             0:{
                 items:2
             },
             600:{
                 items:3
             },
             1000:{
                 items:4
             }
         }
     })
     
 }
 owlCarousel()

const footerForm = document.getElementById("footerForm");
const footerEmail = document.getElementById("footerEmail");
const loader = document.getElementById("loader");

let BASE_URL = 'https://braise-attempt-01-default-rtdb.asia-southeast1.firebasedatabase.app'
let RECIPE_URL = `${BASE_URL}/newRecipe.json`;
let TRENDINGRECIPE_URL = `${BASE_URL}/trending.json`;
let NEWSLETTEREMAIL_url = `${BASE_URL}/emails.json`;


const loadertoggle = () =>{
    loader.classList.toggle('d-none')
}

const snackBarMsg = (msg , icon , timer) => {
   swal.fire({
       title : msg,
       icon : icon ,
       timer : timer 
   });
}

const objToArr = (obj) =>{
   let recipeArr = [];
   for (const key in obj) {
       recipeArr.push({...obj[key] , id : key})
   }
   return recipeArr;
}


const makeApiCall = async (apiUrl , methodName , msgbody) => {
   try{
       loadertoggle()
   msgbody = msgbody ? JSON.stringify(msgbody) : null
    let res = await fetch(apiUrl , {
       method : methodName,
       body : msgbody
    })
    return res.json()
   }
   catch(err){
       cl(err)
   }
   finally{
       loadertoggle()
   }
}



const onFooterFormSubmit =async (eve)=>{
    try{
        eve.preventDefault();
        cl('clicked')
    let newEmail = {
        email : footerEmail.value
    }
    let res = await makeApiCall(NEWSLETTEREMAIL_url,"POST",newEmail);
    cl(res);
    snackBarMsg("Thank You for Subscribing Braise!!!","success",2000)
    }
    catch(err){
        cl(err);
    }
    finally{
        footerForm.reset();
    }
}


footerForm.addEventListener("submit",onFooterFormSubmit);
