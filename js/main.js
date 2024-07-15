//declaration & loading screen
let showData = document.getElementById('showData');
let searchData = document.getElementById('searchData');
let submit;
$(document).ready(() => {
    showMeals("").then(() => {
        $(".loading-screen").fadeOut(700)
        $("body").css("overflow", "visible")
    })
})
//start nav 
function closeNav(){
    let width = $(".open").outerWidth()
    $(".open").css("left",`-${width}px`)
    $(".nav-header").css("left", `-${width}px`)
    $(".open-icon").addClass(".fa-solid fa-bars")
    $(".open-icon").removeClass(".fa-solid fa-xmark")
    $(".links li").animate({top:300},500)
}  
function openNav(){
    $(".open").css("left",`0px`)
    $(".open-icon").removeClass(".fa-solid fa-bars")
    $(".open-icon").addClass(".fa-solid fa-xmark")
    $(".nav-header").css("left", "0px")
    $(".links li").eq(0).animate({top:0},500)
    $(".links li").eq(1).animate({top:0},700)
    $(".links li").eq(2).animate({top:0},900)
    $(".links li").eq(3).animate({top:0},1100)
    $(".links li").eq(4).animate({top:0},1300)
}
closeNav()
$(".open-icon").click(()=>{
    if ($(".open").css("left")==`0px`){
        closeNav()
    }else{
        openNav()
    }
})
//end nav
// Start home page
function displayMeals(arr) {
let mealsData = "";
for (let i = 0; i < arr.meals.length; i++) {
mealsData += `<div class="col-md-3">
    <div onclick="getMeals('${arr.meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
    <img class="w-100" src="${arr.meals[i].strMealThumb}">
    <div class="layer position-absolute d-flex align-items-center">
        <h3 class="text-black">${arr.meals[i].strMeal}</h3>
    </div>
    </div>
</div>`;
}
showData.innerHTML = mealsData;
}
showMeals("");
// End home page
//start categories 
async function showCategories(){
    searchData.innerHTML = "";
let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
data = await data.json();
displayCategories(data.categories)
}
function displayCategories(arr){
    let mealsData = "";
for (let i = 0; i < arr.length; i++) {
mealsData += `<div class="col-md-3">
    <div onclick="getCategoriesMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
    <img class="w-100" src="${arr[i].strCategoryThumb}">
    <div class="layer position-absolute text-center">
        <h3 class="text-black">${arr[i].strCategory}</h3>
        <p class="text-black"> ${arr[i].strCategoryDescription}</p>
    </div>
    </div>
</div>`;
}
showData.innerHTML = mealsData;
}
async function getCategoriesMeals(category){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`) 
    data = await data.json();
    displayMeals(data)
}
//end categories 
//start categories
//start area
async function showArea(){
    searchData.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    data = await data.json();
    displayArea(data.meals)
}
function displayArea(arr){
    let mealsData = "";
for (let i = 0; i < arr.length; i++) {
    mealsData += `<div class="col-md-3 text-center text-white">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].strArea}</h3>
        </div>
    </div>`;
}
showData.innerHTML = mealsData;
}
async function getAreaMeals(area){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`) 
    data = await data.json();
    displayMeals(data)
}
//end area 
//start Ingredients
async function showIngredients(){
    searchData.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    data = await data.json();
    displayIngredients(data.meals.slice(0,20))
}
function displayIngredients(arr){
    let mealsData = "";
for (let i = 0; i < arr.length; i++) {
    mealsData += `<div class="col-md-3 text-center text-white">
        <div onclick="getIngredirntMeals('${arr[i].strIngredient}')" class="meal">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>`;
}
showData.innerHTML = mealsData;
}
async function getIngredirntMeals(ingredirnt){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredirnt}`) 
    data = await data.json();
    displayMeals(data)
}
//end Ingredients
//start meals 
async function getMeals(showMeal) {
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${showMeal}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
}
function displayMealDetails(meal) {
    searchData.innerHTML = "";
    let mealsData = "";
        mealsData += `
        <div class="col-md-3 text-center text-white">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area:</span> ${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category:</span> ${meal.strCategory}</h3>
            <ul class="list-unstyled d-flex flex-wrap ">
                <li style="width: fit-content;" class="alert-info alert m-2 p-1">2 Chicken Breasts</li>
                <li style="width: fit-content;" class="alert-info alert m-2 p-1">2 Chicken Breasts</li>
                <li style="width: fit-content;" class="alert-info alert m-2 p-1">2 Chicken Breasts</li>
                <li style="width: fit-content;" class="alert-info alert m-2 p-1">2 Chicken Breasts</li>
                <li style="width: fit-content;" class="alert-info alert m-2 p-1">2 Chicken Breasts</li>
            </ul>
            <h3 class="pb-2"><span class="fw-bolder">Tags :</span></h3>
            <button class="btn btn-success">Source</button>
            <button class="btn btn-danger">Youtube</button>
        </div>`
                showData.innerHTML = mealsData;
}
//end meals 
// Start search
function displaySearch(){
    searchData.innerHTML = `
        <form class="row d-flex mt-5">
            <div class="col-12 col-md-6 py-2">
            <div class="form-group">
            <input onkeyup="showMeals(this.value)" type="text" class="form-control bg-black border-white text-white" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search By Name">
            </div>
            </div>
            <div class="col-12 col-md-6 py-2">
            <div class="form-group">
            <input onkeyup="showMealsByLetter(this.value)" maxlength="1" type="text" class="form-control bg-black border-white text-white " id="exampleInputPassword1" placeholder="Search By Letter">
            </div>
            </div>
        </form>`
    showData.innerHTML="";
}
async function showMeals(x) {
    let data = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${x}`);
    let response = await data.json();
    displayMeals(response);
}
async function showMealsByLetter(x) {
    let data = await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${x}`);
    let response = await data.json();
    displayMeals(response);
}
// End search
//start contact 
function displayContact() {
    showData.innerHTML = `
        <form class="text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input onkeyup="inputsValidation()" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="inputsValidation()" id="emailInput" type="email" class="form-control" placeholder="Enter Your Mail">
                </div>
                <div class="col-md-6">
                    <input onkeyup="inputsValidation()" id="phoneInput" type="number" class="form-control" placeholder="Enter Your Phone">
                </div>
                <div class="col-md-6">
                    <input onkeyup="inputsValidation()" id="ageInput" type="tel" class="form-control" placeholder="Enter Your Age">
                </div>
                <div class="col-md-6">
                    <input onkeyup="inputsValidation()" id="passwordInput" type="password" class="form-control" placeholder="Enter Your Password">
                </div>
                <div class="col-md-6">
                    <input onkeyup="inputsValidation()" id="repasswordInput" type="password" class="form-control" placeholder="Re-enter Your Password">
                </div>
            </div>
            <button type="submit" id="submit" disabled class="btn btn-danger my-3">Submit</button>
        </form>`
        submit = document.getElementById("submit");
}

function inputsValidation() {
    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()
    ) {
        submit.removeAttribute("disabled")
    } else {
        submit.setAttribute("disabled", true)
    }
    }

function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        document.getElementById("emailInput").value
    );
}

function phoneValidation() {
    return /^01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
    return /^([3-9]|[1-6][0-9])$/.test(document.getElementById("ageInput").value);
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}