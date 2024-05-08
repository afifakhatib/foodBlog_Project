let cl = console.log;

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

