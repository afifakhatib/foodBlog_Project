
const titleInfo = document.getElementById('titleInfo');
const bannerImg = document.getElementById('bannerImg');
const headingInfo = document.getElementById('headingInfo');
const descriptionInfo = document.getElementById('descriptionInfo');
const listContanier = document.getElementById('listContanier')


const recipeTitle = eve => {
    titleInfo.innerHTML = 
     `
        <h1>brasie menu</h1>
        <h2>${eve.title}</h2>
        <hr>
        <p class="icon"><i class="far fa-clock"></i>${eve.time} Needs To Ready Recipe</p>
        <p class="icon"><i class="far fa-thumbs-up"></i>${eve.level}</p>
        `
}

const recipeimg = eve => {
    bannerImg.innerHTML = `
    <img src="${eve.imageUrl}" 
    alt="foodImg">
         `
}

const recipeIngredient = arr => {
    // headingInfo.innerHTML = 
    //    ` 
    //         <h1>
    //           ingredients:
    //         </h1>
    //         <p>${eve.ingredients}</p>
    //       `

    let data = arr.ingredients
    cl(data)
    let result = ``
    data.forEach((ele , index) => {
       result += `
           <li>
             <input type="checkbox" id="${index+1}">
             <label for="${index+1}">${ele} </label>
           </li>
                  `
    })
    listContanier.innerHTML = result;
}

const recipedescription = eve =>{
    descriptionInfo.innerHTML = `
    <h1> Description and recipes</h1>
    <p>${eve.description}</p>    
                      `
}

document.addEventListener('DOMContentLoaded', async() => {
    let currentUrl = new URL(window.location.href);
    let queryparams = new URLSearchParams(currentUrl.search);
    let getrecipeid = queryparams.get('recipeid');
    let recipeUrl = `${BASE_URL}/newRecipe/${getrecipeid}.json`;
    let trendingUrl = `${BASE_URL}/trending/${getrecipeid}.json`;


    // let data = await makeApiCall(recipeUrl , 'GET')
    // cl(data)
    // recipeTitle(data);
    // recipeimg(data);
    // recipeHeading(data);
    // recipedescription(data);

    
    // let data1 = await makeApiCall(trendingUrl , 'GET')
    // cl(data1)
    // recipeTitle(data1);
    // recipeimg(data1);
    // recipeHeading(data1);
    // recipedescription(data1);

    let apiArr = [makeApiCall(recipeUrl , 'GET') , makeApiCall(trendingUrl , 'GET')]
    let [data , data1] = await Promise.all(apiArr)
    cl(data , data1)

    if(data != null){
        recipeTitle(data);
        recipeimg(data);
        recipeIngredient(data);
        recipedescription(data);
    }else{
        recipeTitle(data1);
        recipeimg(data1);
        recipeIngredient(data1);
        recipedescription(data1);
    }
})