// GET ALL RECIPES
const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:3001/recipes/listRecipes');
xhr.onload = function() {
  if (xhr.status === 200) {
    const recipes = JSON.parse(xhr.responseText);
     {
      // Display the data in the window
      console.log(recipes);
      // const ul = document.createElement('ol');
      // recipes.forEach(recipe => {
      //   const li = document.createElement('li');
      //   li.innerHTML = recipe.name;
      //   ul.appendChild(li);
      // });
      // document.body.appendChild(ul);
    };
  } else {
    console.log('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();


const recipeForm = document.getElementById('recipeForm');
const recipeIdInput = document.getElementById('recipeId');
const recipeNameInput = document.getElementById('recipeName');
const ingredientsInput = document.getElementById('ingredients');
const preparationInput = document.getElementById('preparation');
const caloriesInput = document.getElementById('calories');
const proteinInput = document.getElementById('protein');
const fatInput = document.getElementById('fat');
const carbsInput = document.getElementById('carbs');

const cancelButton = document.getElementById('cancelButton');
const deleteButton = document.getElementById('deleteButton');
const submitButton = document.getElementById('submitButton');


// SUBMIT FORM -> ADD OR UPDATE RECIPE
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
if (recipeId) {
  fetch(`http://localhost:3001/recipes/recipe/${recipeId}`)
    .then(response => response.json())
    .then(recipe => {
      recipeNameInput.value = recipe.name;
      ingredientsInput.value = recipe.ingredients;
      preparationInput.value = recipe.preparation;
      caloriesInput.value = recipe.calories;
      proteinInput.value = recipe.protein;
      fatInput.value = recipe.fat;
      carbsInput.value = recipe.carbs;
      recipeIdInput.value = recipe._id;
      submitButton.innerText = 'Update Recipe';
    })
    .catch(error => console.error(error));
}

recipeForm.addEventListener('submit', event => {
  event.preventDefault();
  const recipeName = recipeNameInput.value;
  const recipeIngredients = ingredientsInput.value;
  const recipePreparation = preparationInput.value;
  const recipeCalories = caloriesInput.value;
  const recipeProtein = proteinInput.value;
  const recipeFat = fatInput.value;
  const recipeCarbs = carbsInput.value;
  const recipeId = recipeIdInput.value;

  if (recipeId) {
    updateRecipe(recipeId, recipeName, recipeIngredients, recipePreparation, recipeCalories, recipeProtein, recipeFat, recipeCarbs);
  } else {
    addRecipe(recipeName, recipeIngredients, recipePreparation, recipeCalories, recipeProtein, recipeFat, recipeCarbs);
  }
});

// POST RECIPE
const addRecipe = (name, ingredients, preparation, calories, protein, fat, carbs) => {
  fetch('http://localhost:3001/recipes/addRecipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      ingredients,
      preparation,
      calories,
      protein,
      fat,
      carbs
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Recipe added successfully');
      // Redirect to the recipe list page
      window.location.reload();
    } else {
      throw new Error('Failed to add recipe');
    }
  })
  .catch(error => console.error(error));
};

// UPDATE RECIPE
const updateRecipe = (recipeId, name, ingredients, preparation, calories, protein, fat, carbs) => {
  fetch(`http://localhost:3001/recipes/updateRecipe/${recipeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: recipeId,
      name,
      ingredients,
      preparation,
      calories,
      protein,
      fat,
      carbs
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Recipe updated successfully');
      // Redirect to the recipe list page
      window.location.reload();
    } else {
      throw new Error('Failed to update recipe');
    }
  })
  .catch(error => console.error(error));
};


// DELETE RECIPE
function deleteRecipe() {
  const recipeId = document.getElementById("recipeId").value;
  fetch(`http://localhost:3001/recipes/deleteRecipe/${recipeId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      alert("Recipe deleted successfully");
      window.location.reload();
    } else {
      console.error("Error deleting recipe");
    }
  })
  .catch(error => {
    console.error("Error deleting recipe: ", error);
  });
}

deleteButton.addEventListener('click', deleteRecipe);