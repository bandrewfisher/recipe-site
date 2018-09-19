/*global updateView*/
var recipes = [];
var recipeId = 0;
//appendRecipeField();
//updateView();
function addRecipe(event) {

    var name = document.getElementById("recipeName").value;
    var ingredientDivs = document.getElementsByClassName("ingredient");
    var ingredients = [];
    for(var i=0; i<ingredientDivs.length; i++) {
        var ingName = ingredientDivs[i].getElementsByClassName("ingredientName")[0].value;
        var ingAmount = document.getElementsByClassName("amount")[0].value;
        var ingSelect = document.getElementsByClassName("unit")[0];
        var ingUnit = ingSelect.options[ingSelect.selectedIndex].value;
        
        //Make sure the input field is full
        if(validateIngInput(ingName, ingAmount, ingUnit)) {
            ingredients.push({
               name: ingName,
               amount: ingAmount,
               unit: ingUnit
            });
        } 
    }
    
    var ingDirections = document.getElementById("directions").value;
    
    var warnings = "";
    if(name==null||name=="") {
        warnings += "Please give a recipe name.\n";
    }
    
    if(ingredients.length < 1) {
        warnings += "Please provide at least one ingredient and amount.\n";
    }
    
    if(ingDirections==null || ingDirections == "") {
        warnings += "Please provide some directions.";
    }
    
    if(warnings == "") {
        /*recipes.push({
            id: recipeId,
            name: name,
            ingredients: ingredients,
            directions: ingDirections
        });*/
        updateStorage({
           id: getNewRecipeId(),
           name: name,
           ingredients: ingredients,
           directions: ingDirections
        });
    } else {
        alert(warnings);
    }
    
    

    /*var newRecipeValues = getNewRecipeValues();
    console.log(JSON.stringify(newRecipeValues));
    var recipes = JSON.parse(window.localStorage.getItem("recipes"));
    recipes.append(newRecipeValues)
    if(newRecipeValues != null) {
        window.localStorage.setItem("recipes", JSON.stringify(recipes));
        alert(window.localStorage.getItem("recipes"))
    } else {
        alert("Fill in all the fields")
    }
    event.preventDefault();
    //alert(window.localStorage.getItem("recipes"))*/
}

//Push values (dictionary) to local storage
function updateStorage(values) {
    var recipes = getCurrRecipes();
    
    recipes.push(values);
    window.localStorage.setItem("recipes", JSON.stringify(recipes));
}

function resetRecipes(newRecipes) {
    window.localStorage.setItem("recipes", JSON.stringify(newRecipes));
}
function validateIngInput(name, amount, unit) {
    if(name == null || name=="" || amount==null || amount=="" || unit==null || unit=="") {
        return false;
    }
    return true;
}

function getNewRecipeValues() {
    var name = document.getElementById("recipeName").value;
    
    if(name==null||name=="") {
        return null
    }
    var ingredientDivs = document.getElementsByClassName("ingredient");
    var ingredients = [];
    
    for(var i=0; i<ingredientDivs.length; i++) {
        var ingName = ingredientDivs[i].getElementsByClassName("ingredientName")[0].value;
        var ingAmount = trim(ingredientDivs[i].getElementsByClassName("amount")[0].value);
        var ingSelect = trim(ingredientDivs[i].getElementsByClassName("unit")[0]);
        var ingUnit = trim(ingSelect.options[ingSelect.selectedIndex].value);
        
        var valid = true
        if(ingName==null||ingName==""||ingAmount==null||ingAmount==""
            ||ingUnit==null||ingUnit=="") {
            valid = false
        }
        

        if(valid) {
            ingredients.push({
               name: ingName,
               amount: ingAmount,
               unit: ingUnit
            });
        }
    }
    
    var ingDirections = document.getElementById("directions").value;
    if(ingDirections ==null || ingDirections=="") {
        return null;
    }
    
    if(ingredients.length > 0) {
        return {id: getNewRecipeId(), name: name, ingredients: ingredients, directions: ingDirections}
    } else {
        return null;
    }
    
    
}

function trim(value) {
    return value.replace(/^\s+|\s+$/g,"");
}

function getCurrRecipes() {
    var currRecipes = window.localStorage.getItem("recipes");
    if(currRecipes == null) {
        return [];
    } else {
        //alert("here's local: " + window.localStorage.getItem("recipes"));
        return JSON.parse(window.localStorage.getItem("recipes"));
    }
}

function getNewRecipeId() {
    var id = window.localStorage.getItem("recipeId");
    if(id == null) {
        id = 0
    }
     else {
    id++
     }
    window.localStorage.setItem("recipeId", id);
    return id
    
}

function appendRecipeField(event) {
    
    //#ingredientsDiv - all the input fields are inside this div
    var ingDiv = document.getElementById("ingredientsDiv");
    
    //.ingredient - a div for each row containing 2 inputs and a select
    var newIng = document.createElement("div");
    newIng.setAttribute("class", "ingredient");
    
    //.ingrdientName - input for the name of the ingredient
    var ingName = document.createElement("input");
    ingName.setAttribute("class", "ingredientName");
    ingName.setAttribute("placeholder", "Ingredient Name");
    
    //.amount - a numerical value of how much of the ingredient
    var ingAmount = document.createElement("input");
    ingAmount.setAttribute("class", "amount");
    ingAmount.setAttribute("placeholder", "Amount");
    
    //.unit - a dropdown to select which unit to use
    var ingSelect = document.createElement("select");
    ingSelect.setAttribute("class", "unit");
    
    var units = ["teaspoons", "tablespoons", "cups", "pounds", ""];
    for(var i=0; i<units.length; i++) {
        var ingOption = document.createElement("option");
        ingOption.setAttribute("value", units[i]);
        ingOption.innerHTML = units[i];
        ingSelect.appendChild(ingOption);
    }
    
    newIng.appendChild(ingName);
    newIng.appendChild(ingAmount);
    newIng.appendChild(ingSelect);
    
    ingDiv.appendChild(newIng);
    
    if(event != null) {
        event.preventDefault();
    }
}

function displayRecipes() {
    var sidebarDiv = document.getElementById("ingSidebar");
    var ulRecipes = document.createElement("ul");
    for(var i=0; i<recipes.length; i++) {
        var li = document.createElement("li")
        li.innerHTML = recipes[i].name;
        ulRecipes.appendChild(li)
    }
    sidebarDiv.appendChild(ulRecipes)
}

function updateView() {
    console.log('hello')
    var displayDiv = document.getElementById("displayRecipes")
    var title = document.getElementById("title")
    var ingUl = document.getElementById("ingUl");
    while(ingUl.firstChild) {
        ingUl.removeChild(ingUl.firstChild);
    }
    var recipes = getCurrRecipes();
    
    //Print out the recipes you've already made
    for(var i=0; i<recipes.length; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:showRecipeDetails(" + recipes[i].id + ");");
        a.setAttribute("data-recipeId", recipes[i].id);
        a.innerHTML = recipes[i].name;
        li.appendChild(a);
        
        var removeButton = document.createElement("button");
        removeButton.setAttribute("style", "margin-left: 15px");
        removeButton.setAttribute("onclick", "removeRecipe(" + recipes[i].id + ");");
        removeButton.innerHTML = "Remove Recipe";
        li.appendChild(removeButton);
        ingUl.appendChild(li)
        console.log(i.name);
    }
}

function showRecipeDetails(recipeId) {
    //var id = recipe.getAttribute("data-id");
    //alert("id is " + id);
    var recipes = getCurrRecipes();
    var displayRecipe;
    for(var i=0; i<recipes.length; i++) {
        if(recipes[i].id == recipeId) {
            displayRecipe = recipes[i];
            break;
        }
    }
    
    document.getElementById("displayRecipeName").innerHTML = displayRecipe.name;
    var ings = displayRecipe.ingredients;
    var ingList = document.getElementById("displayIngredients");
    ingList.innerHTML = "";
    for(var i=0; i<ings.length; i++) {
        var amount = ings[i].amount;
        var unit = ings[i].unit;
        var ingName = ings[i].name;
        ingList.innerHTML += "<li>" +  amount + " " + unit + " " + ingName + "</li>";

    }
    
    var directions = displayRecipe.directions;
    var p = document.getElementById("displayDirections");
    p.innerHTML = directions;
    
}

function removeRecipe(recipeId) {
    if(confirm("Do you really want to remove this recipe?")) {
       var recipes = getCurrRecipes();
        var index = 0;
        for(var i=0; i<recipes.length; i++) {
            if(recipes[i].id == recipeId) {
                index = i;
                break;
            }
        }
        
        recipes.splice(i, 1);
        resetRecipes(recipes);
        updateView();

    }
}

