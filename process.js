var recipes = [];
var recipeId = 0;
appendRecipeField();
function addRecipe() {
    var name = document.getElementById("recipeName");
    var ingredientDivs = document.getElementsByClassName("ingredient");
    var ingredients = [];
    for(var i=0; i<ingredientDivs.length; i++) {
        var ingName = ingredientDivs[i].getElementsByClassName("ingredient")[0].value;
        var ingAmount = ingredientDivs[i].getElementsByClassName("amount")[0].value;
        var ingSelect = ingredientDivs[i].getElementsByClassName("unit")[0];
        var ingUnit = ingSelect.options[ingSelect.selectedIndex].value;
        
        ingredients.push({
           name: ingName,
           amount: ingAmount,
           unit: ingUnit
        });
    }
    
    var ingDirections = document.getElementById("directions").value;
    recipes.push({
        id: recipeId,
        name: name,
        ingredients: ingredients,
        directions: ingDirections
    });
    recipeId++;
}

function appendRecipeField() {
    var ingDiv = document.getElementById("ingredientsDiv");
    var newIng = document.createElement("div");
    newIng.setAttribute("class", "ingredients");
    
    var ingName = document.createElement("input");
    ingName.setAttribute("class", "ingredient");
    
    var ingAmount = document.createElement("input");
    ingAmount.setAttribute("class", "amount");
    
    var ingSelect = document.createElement("select");
    ingSelect.setAttribute("class", "unit");
    
    var units = ["teaspoon", "tablespoon", "quartercup", "halfcup", "cup"]
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

function updateView(id) {
    var displayDiv = document.getElementById("displayDiv")
    var title = displayDiv.getElementById("title")
    var ingUl = displayDiv.getElementById("ingUl");
    while(ingUl.firstChild) {
        ingUl.removeChild(ingUl.firstChild);
    }
    
}

