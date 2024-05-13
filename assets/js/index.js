
const allRecipesContainer = document.getElementById('allRecipesContainer');
const trendingContainer = document.getElementById('trendingContainer');
const bannerContanier = document.getElementById('bannerContanier');
const newsletterForm = document.getElementById('newsletterForm')
const newsletterEmail = document.getElementById('newsletterEmail')


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
    trendingtemplating(data.reverse())
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
            <button class="btn btn-danger b-color" data-id="${obj.id}" onclick="loadQparams(this)">View Recipe</button>
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


const onNewsLetterSubmit = async (eve)=>{
    eve.preventDefault();
    cl("buttonclicked")
    let newEmail = {
        email : newsletterEmail.value
    }
    cl(newEmail)
    try{
    let res = await makeApiCall(NEWSLETTEREMAIL_url,"POST",newEmail);
    cl(res);
    snackBarMsg("Thank You for Subscribing Braise!!!","success",2000)
    }
    catch(err){
        cl(err);
    }
    finally{
        newsletterForm.reset();
    }
}

newsletterForm.addEventListener("submit",onNewsLetterSubmit);
