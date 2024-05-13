
const addRecipeForm = document.getElementById('addRecipeForm');
const title = document.getElementById('title')
const imageUrl = document.getElementById( 'imageUrl')
const ingredients = document.getElementById('ingredients')
const description = document.getElementById('description')
const time = document.getElementById('time')
const level = document.getElementById('level')
const chipsContainer = document.getElementById('chipsContainer')
const allRecipesContainer = document.getElementById('allRecipesContainer')
const clearRecipeBtn = document.getElementById('clearRecipeBtn')


function generateUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

// chip functionallity

let ingredientArr =[] 
const addChip = (ele) => {
    // cl(ele)
    let chipText = ingredients.value.trim()
    // cl(chipText);
    if(chipText != ''){
        let chip = document.createElement('div');
        chip.className = 'chip';
        chip.id = generateUUID();
        chip.innerHTML = `
        <p>${chipText} <span onclick="removeChip(this)">
        <i class="fa-solid fa-circle-xmark"></i></span></p>  `;
        // cl(chip)
        chipsContainer.prepend(chip);
        ingredientArr.push(chip);
        // cl(ingredientArr)
        ingredients.value = '';
    }
}

const removeChip = (ele) => {
    // cl(ele)
    let deleteId = ele.closest('.chip').id;
    // cl(deleteId)
    let deleteIndex = ingredientArr.findIndex(ele => ele.id === deleteId)
    // cl(deleteIndex)
    ingredientArr.splice(deleteIndex , 1);
    ele.closest('.chip').remove()
    // cl(ingredientArr);
}

const fileUploader = fileControl =>{
    return new Promise((resolve , reject) => {
        let selectedFile = fileControl.files[0]
        if(selectedFile){
            let reader = new FileReader();
            reader.onload = function(e){
            //   let fileObj = {
            //     fileName : selectedFile.name,
            //     fileUploadTime : selectedFile.lastModified,
            //     fileSize : selectedFile.size,
            //     fileBaseUrl : e.target.result
            //   }
              resolve(e.target.result)
            }
            reader.readAsDataURL(selectedFile)
        }else{
            reject('NO FILE SELECTED !!!')
        }
    })
}



const onRecipeAdd = async (e) => {
    e.preventDefault();
    let bannerImgObj = await fileUploader(imageUrl)
    let recipeObj = {
        title : title.value,
        imageUrl : bannerImgObj,
        ingredients : ingredientArr.map(ele => ele.innerText),
        description : description.value,
        time : time.value,
        level : level.value
    }
    // cl(recipeObj)
    try{
        if (ingredientArr.length > 0) {
    let data = await makeApiCall(RECIPE_URL , 'POST' , recipeObj)
    cl(data)
    snackBarMsg("Recipe added successfully!!! Check your Recipe in the Recipe Tab.", "success", 3000)
    }
      else{
        snackBarMsg("Please enter ingredients!!", "error", 2000)
      }
}
    catch(err){ 
        snackBarMsg("Something went wrong while adding recipe!!", "error", 2000)
    }
    finally{
        chipsContainer.innerHTML = "";
        ingredientArr = [];
        addRecipeForm.reset()
    }
}

const onClear = (eve) => {
    chipsContainer.innerHTML = "";
    ingredientArr = [];
    addRecipeForm.reset();
    snackBarMsg("Form Cleared!!", "success", 1500)
}


const addImageFile = async (eve) => {
    // cl(eve.target)
    // cl(eve.target.files)
    // let selectedFile = eve.target.files[0]
    // cl(selectedFile)
    // let reader = new FileReader();

    // reader.onload = function(e){
    //     cl(e)
    // }
    // reader.readAsDataURL(selectedFile)
   let data = await fileUploader(eve.target)
//    cl(data)
}

clearRecipeBtn.addEventListener('click' , onClear)
imageUrl.addEventListener('change', addImageFile)
addRecipeForm.addEventListener('submit', onRecipeAdd)