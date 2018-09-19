/*global updateView*/
var recipes = [];
var recipeId = 0;

startSession();

function startSession(){
    if(window.localStorage.getItem("sessionStart") == null) {
        window.localStorage.setItem("sessionStart", 1);
        init();
    }
}

function init() {
    var cookieIngredients = 
        [
            {
            name: "butter",
            amount: "1 cup",
            },
            {
            name: "white sugar",
            amount: "1 cup",
            },
            {
            name: "brown sugar",
            amount: "1 cup",
            },
            {
            name: "eggs",
            amount: "2",
            },
            {
            name: "vanilla extract",
            amount: "2 teaspoons",
            },
            {
            name: "baking soda",
            amount: "1 teaspoon",
            },
            {
            name: "hot water",
            amount: "2 teaspoons",
            },
            {
            name: "salt",
            amount: "1/2 teaspoon",
            },
            {
            name: "flour",
            amount: "3 cups",
            },
            {
            name: "chocolate chips",
            amount: "2 cups",
            }
        ];
        
        var cookieDirections = "Preheat oven to 350 degrees F (175 degrees C)."
        + "Cream together the butter, white sugar, and brown sugar until smooth."
        + "Beat in the eggs one at a time, then stir in the vanilla. Dissolve"
        + "baking soda in hot water. Add to batter along with salt. Stir in flour,"
        + "chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans."
        + "Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.";
        
        updateStorage({
           id:getNewRecipeId(),
           name:"Chocolate Chip Cookies",
           ingredients: cookieIngredients,
           directions: cookieDirections
        });
        
        
        var pastaIngredients = [
            {
              name:"Spaghetti",
              amount: "1 pound"
            },
            {
              name:"Olive Oil",
              amount: "6 tablespoons"
            },
            {
              name:"garlic",
              amount: "2 cloves"
            },
            {
              name:"black pepper",
              amount: "2 teaspoons"
            },
            {
              name:"Pecorino Romano cheese",
              amount: "1 3/4 cups"
            }
            ];
        
        var pastaDirections = "Bring a large pot of lightly salted water to a boil."
        + " Cook spaghetti in the boiling water, stirring occasionally until "
        + "tender yet firm to the bite, about 10 minutes. Scoop out some of the"
        + "cooking water and reserve. Drain spaghetti. " 
        + "Heat oil in a large skillet over medium heat. Add garlic and pepper; "
        + "cook and stir until fragrant, 1 to 2 minutes. Add spaghetti and "
        + "Pecorino Romano cheese. Ladle in 1/2 cup of reserved cooking water; "
        + "stir until cheese is melted, about 1 minute. Add more cooking water "
        + "until sauce coats spaghetti, about 1 minute more. "
        
        updateStorage({
            id:getNewRecipeId(),
            name: "Spaghetti Cacio e Pepe",
            ingredients: pastaIngredients,
            directions: pastaDirections
        })
    
    
    var chickenIngredients = [
        {
          name:"frozen chicken breast halves",
          amount: "6"
        },
        {
          name:"barbeque sauce",
          amount: "12 ounces"
        },
        {
          name:"italian salad dressing",
          amount: "1/2 cup"
        },
        {
          name:"brown sugar",
          amount: "1/4 cup"
        },
        {
          name:"Worcestershire sauce",
          amount: "2 tablespoons"
        }
        ];
    
    var chickenDirections = "Place chicken in a slow cooker. In a bowl, mix the"
    + " barbecue sauce, Italian salad dressing, brown sugar, and Worcestershire"
    + " sauce. Pour over the chicken. Cover, and cook 3 to 4 hours on High or 6 to 8 hours on Low. "
    
    updateStorage({
        id:getNewRecipeId(),
        name: "Slow Cooker Chicken Barbecue",
        ingredients: chickenIngredients,
        directions: chickenDirections
    })
}
    
function addRecipe(event) {

    var name = document.getElementById("recipeName").value;
    var ingredientDivs = document.getElementsByClassName("ingredient");
    var ingredients = [];
    for(var i=0; i<ingredientDivs.length; i++) {
        var ingName = ingredientDivs[i].getElementsByClassName("ingredientName")[0].value;
        var ingAmount = document.getElementsByClassName("amount")[0].value;
        //var ingSelect = document.getElementsByClassName("unit")[0];
        //var ingUnit = ingSelect.options[ingSelect.selectedIndex].value;
        
        //Make sure the input field is full
        if(validateIngInput(ingName, ingAmount)) {
            ingredients.push({
               name: ingName,
               amount: ingAmount
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
        alert("Recipe added successfully!");
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
function validateIngInput(name, amount) {
    if(name == null || name=="" || amount==null || amount=="") {
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
        //var ingSelect = trim(ingredientDivs[i].getElementsByClassName("unit")[0]);
        //var ingUnit = trim(ingSelect.options[ingSelect.selectedIndex].value);
        
        var valid = true
        if(ingName==null||ingName==""||ingAmount==null||ingAmount=="") {
            valid = false
        }
        

        if(valid) {
            ingredients.push({
               name: ingName,
               amount: ingAmount,
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
    ingName.setAttribute("placeholder", "Ingredient Name e.g., flour");
    
    //.amount - a numerical value of how much of the ingredient
    var ingAmount = document.createElement("input");
    ingAmount.setAttribute("class", "amount");
    ingAmount.setAttribute("placeholder", "Amount e.g., 1/2 cup");
    
    //.unit - a dropdown to select which unit to use
    
    /*var ingSelect = document.createElement("select");
    ingSelect.setAttribute("class", "unit");
    
    var units = ["teaspoons", "tablespoons", "cups", "pounds", ""];
    for(var i=0; i<units.length; i++) {
        var ingOption = document.createElement("option");
        ingOption.setAttribute("value", units[i]);
        ingOption.innerHTML = units[i];
        ingSelect.appendChild(ingOption);
    }*/
    
    
    newIng.appendChild(ingAmount);
    newIng.appendChild(ingName);
    //newIng.appendChild(ingSelect);
    
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
        //var unit = ings[i].unit;
        var ingName = ings[i].name;
        ingList.innerHTML += "<li>" +  amount + " " + ingName + "</li>";

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
