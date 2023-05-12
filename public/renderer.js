document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle();
})

// Get all recipes from the server

const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:3001/recipes/listRecipes');
xhr.onload = function() {
  if (xhr.status === 200) {
    const recipes = JSON.parse(xhr.responseText);
    // Display the recipes on the frontend
     {
      // Display the data in the window
      const ul = document.createElement('ul');
      recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.innerHTML = recipe.name;
        ul.appendChild(li);
      });
      document.body.appendChild(ul);
    };
  } else {
    console.log('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();

// Search for recipes by name

// const searchInput = document.getElementById('searchInput');
// const searchButton = document.getElementById('searchButton');
// const recipeTableBody = document.getElementById('recipeTableBody');

// searchButton.addEventListener('click', () => {
//   const recipeName = searchInput.value.trim(); // Get the search query from the input field

//   if (recipeName.length > 0) {
//     // Send a GET request to the server to search for recipes with the given name
//     fetch(`http://localhost:3001/recipeName/${recipeName}`, {
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Clear the existing table rows
//       recipeTableBody.innerHTML = '';

//       if (data && data.length > 0) {
//         // If filtered recipes are found, add them to the table
//         data.forEach(recipe => {
//           const row = recipeTableBody.insertRow();
//           row.insertCell().textContent = recipe.id;
//           row.insertCell().textContent = recipe.name;
//           row.insertCell().textContent = recipe.ingredients.join(', ');
//           row.insertCell().textContent = recipe.preparation;
//           row.insertCell().textContent = recipe.calories;
//           row.insertCell().textContent = recipe.protein;
//           row.insertCell().textContent = recipe.fat;
//           row.insertCell().textContent = recipe.carbs;
//         });
//       } else {
//         // If no matching recipe is found, display an alert message
//         alert('No matching recipes found');
//       }
//     })
//     .catch(error => {
//       console.error(`Error searching for recipe with name ${recipeName}:`, error);
//     });
//   } else {
//     alert('Please enter a recipe name to search for');
//   }
// });


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
    // Update an existing recipe
    updateRecipe(recipeId, recipeName, recipeIngredients, recipePreparation, recipeCalories, recipeProtein, recipeFat, recipeCarbs);
  } else {
    // Add a new recipe
    addRecipe(recipeName, recipeIngredients, recipePreparation, recipeCalories, recipeProtein, recipeFat, recipeCarbs);
  }
});

// PUT

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
      console.log('Recipe added successfully');
      // Redirect to the recipe list page
      window.location.reload();
    } else {
      throw new Error('Failed to add recipe');
    }
  })
  .catch(error => console.error(error));
};

// UPDATE

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
      console.log('Recipe updated successfully');
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
      console.log("Recipe deleted successfully");
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