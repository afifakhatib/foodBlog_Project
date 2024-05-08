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
                items:1
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

const allRecipesContainer = document.getElementById('allRecipesContainer');
const trendingContainer = document.getElementById('trendingContainer');
const bannerContanier = document.getElementById('bannerContanier');
const loader = document.getElementById('loader');
// const loadQparams = document.getElementById("loadQparams");

let BASE_URL = 'https://braise-attempt-01-default-rtdb.asia-southeast1.firebasedatabase.app';
let RECIPE_URL = `${BASE_URL}/recipeArr.json`;
let TRENDINGRECIPE_URL = `${BASE_URL}/trendingRecipe.json`;

const loadertoggle = () =>{
     loader.classList.toggle('d-none')
}

const objToArr = (obj) =>{
    let recipeArr = [];
    for (const key in obj) {
        recipeArr.push({...obj[key] , id : key})
    }
    return recipeArr;
}

const loadQparams = (ele) => {
    // let id = ele.getAttribute("data-id")
    let id = ele.dataset['id']
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search)
    queryParams.set("recipeid" , id)
    currentUrl.search = queryParams.toString();

    let recipieRedirectUrl = `${currentUrl.origin}/recipeInfo.html${currentUrl.search}`
    window.location.href = recipieRedirectUrl;
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

// const fetchAllCards = async () => {
//     let res = await makeApiCall(RECIPE_URL , 'GET')
//     let data = objToArr(res)
//     cl(data)
//     allRecipeTemplating(data)
// }
// fetchAllCards()

// const allRecipeTemplating = (arr) =>{
//     allRecipesContainer.innerHTML = arr.map(obj => {
//         return `
//         <div class="col-lg-3 col-md-6 col-12">
//         <div  class="card mt-4 mb-4">
//         <figure class="foodCard">
//            <img src="${obj.imageUrl}" 
//             alt="${obj.title}">
//             <div class="onRecipeHover">
              
//             </div>
//             <div class="hover-drop">
//               <a href="recipeInfo.html">View Recipe</a>
//             </div>
//             <figcaption>
//               <h5>Brasie Special Menu</h5>
//               <p>${obj.title}</p>
//               <hr>
//               <p class="icon"><i class="far fa-clock"></i>${obj.time}</p>
//               <p class="icon"><i class="far fa-thumbs-up"></i>${obj.level}</p>
//             </figcaption>
//         </figure>
//         </div>
//      </div>
//               `
//     }).join('')
// }

const fetchTrendingCards = async () => {
    let res = await makeApiCall(TRENDINGRECIPE_URL , 'GET')
    let data = objToArr(res)
    trendingtemplating(data)
}
fetchTrendingCards()

const trendingtemplating = (arr) => {
    trendingContainer.innerHTML = arr.map(obj => {
        return `
        <div class="col-lg-3 col-md-6 col-12">
        <div  class="card mt-4 mb-4">
        <figure class="foodCard">
           <img src="${obj.imageUrl}" 
            alt="${obj.title}">
            <div class="onRecipeHover">
              
            </div>
            <div class="hover-drop">
            <button class="btn btn-secondary" data-id="${obj.id}" onclick="loadQparams(this)">View Recipe</button>
            </div>
            <figcaption>
              <h5>Menu</h5>
              <p>${obj.title}</p>
              <hr>
              <p class="icon"><i class="far fa-clock"></i>${obj.time}</p>
              <p class="icon"><i class="far fa-thumbs-up"></i>${obj.level}</p>
            </figcaption>
        </figure>
        </div>
     </div>
             
             `
    }).join('')
}


