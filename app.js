const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const recipesRoutes = require('./routes/recipes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const PORT = process.env.PORT || 3001;
const mongoURL = 'mongodb+srv://root:root@atlascluster.wwedndy.mongodb.net/STdb?retryWrites=true&w=majority';

async function connectMongoDb() { 
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectMongoDb();

app.use(express.urlencoded({ extended: false }));

app.use('/users',usersRoutes);
app.use('/recipes', recipesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});


// //USERS
// var users = "models/users.json"

// //IZPIŠI VSE UPORABNIKE
// app.get('/listUsers', function (req, res) {
//    fs.readFile("models/users.json", 'utf8', function (err, data) {
//       console.log( data );
//       res.end( data );
//    });
// })

// //IZPIŠI DOLOČENEGA UPORABNIKA
// app.get('/user/:id', (req, res) => {
//    const userId = req.params.id; // Get the user ID from the request parameter
//    fs.readFile('models/users.json', 'utf8', (err, data) => {
//      if (err) {
//        // If there is an error reading the file, return an error message
//        res.status(500).json({error: "Error reading user data"});
//        return;
//      }
//      const users = JSON.parse(data).users;
//      const user = users.find(user => user.id == userId); // Find the user with the matching ID
 
//      // Check if the user exists
//      if (user) {
//        // If the user exists, return their data
//        res.json(user);
//      } else {
//        // If the user does not exist, return an error message
//        res.status(404).json({error: "User not found"});
//      }
//    });
//  });

//  //DODAJ UPORABNIKA
//  app.post('/addUser', (req, res) => {
//   const newUser = req.body; // Get the new user data from the request body

//   // Read the current users data from the file
//   fs.readFile('models/users.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading user data"});
//       return;
//     }

//     // Parse the current users data from the file
//     const users = JSON.parse(data).users;

//     // Generate a new ID for the user
//     const newUserId = users.length + 1;

//     // Create a new user object with the new ID
//     const newUserWithId = {
//       id: newUserId,
//       name: newUser.name,
//       surname: newUser.surname,
//       gender: newUser.gender,
//       height: newUser.height,
//       weight: newUser.weight,
//       email: newUser.email,
//       password: newUser.password
//     };

//     // Add the new user to the users array
//     users.push(newUserWithId);

//     // Write the updated users data back to the file
//     fs.writeFile('models/users.json', JSON.stringify({ users }), 'utf8', (err) => {
//       if (err) {
//         // If there is an error writing the file, return an error message
//         res.status(500).json({error: "Error writing user data"});
//         return;
//       }

//       // If the write is successful, return the new user data
//       res.json(newUserWithId);
//     });
//   });
// });

// //UREDI DOLOČENEGA UPORABNIKA
// app.put('/updateUser/:id', (req, res) => {
//   const userId = parseInt(req.params.id); // Get the user ID from the request URL
//   const updatedUser = req.body; // Get the updated user data from the request body

//   // Read the current users data from the file
//   fs.readFile('models/users.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading user data"});
//       return;
//     }

//     // Parse the current users data from the file
//     const users = JSON.parse(data).users;

//     // Find the index of the user with the specified ID
//     const userIndex = users.findIndex(user => user.id === userId);

//     if (userIndex === -1) {
//       // If the user with the specified ID is not found, return a 404 error
//       res.status(404).json({error: "User not found"});
//       return;
//     }

//     // Update the user with the new data
//     const updatedUserWithId = {
//       id: userId,
//       name: updatedUser.name,
//       surname: updatedUser.surname,
//       gender: updatedUser.gender,
//       height: updatedUser.height,
//       weight: updatedUser.weight,
//       email: updatedUser.email,
//       password: updatedUser.password
//     };

//     users[userIndex] = updatedUserWithId;

//     // Write the updated users data back to the file
//     fs.writeFile('models/users.json', JSON.stringify({ users }), 'utf8', (err) => {
//       if (err) {
//         // If there is an error writing the file, return an error message
//         res.status(500).json({error: "Error writing user data"});
//         return;
//       }

//       // If the write is successful, return the updated user data
//       res.json(updatedUserWithId);
//     });
//   });
// });

// //IZBRIŠI UPORABNIKA
// app.delete('/deleteUser/:id', (req, res) => {
//   const userId = req.params.id; // Get the user ID from the request parameter
//   fs.readFile('models/users.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading user data"});
//       return;
//     }
//     const users = JSON.parse(data).users;
//     const userIndex = users.findIndex(user => user.id == userId); // Find the user index with the matching ID

//     // Check if the user exists
//     if (userIndex > -1) {
//       // If the user exists, remove it from the array
//       users.splice(userIndex, 1);

//       // Write the updated users data back to the file
//       fs.writeFile('models/users.json', JSON.stringify({users}), 'utf8', (err) => {
//         if (err) {
//           // If there is an error writing the file, return an error message
//           res.status(500).json({error: "Error writing user data"});
//           return;
//         }

//         // If the write is successful, return a success message
//         res.json({message: "User deleted successfully"});
//       });
//     } else {
//       // If the user does not exist, return an error message
//       res.status(404).json({error: "User not found"});
//     }
//   });
// });


// //RECEPTI
// //IZPIŠI VSE RECEPTE
// app.get('/listRecipes', function (req, res) {
//   fs.readFile("models/recipes.json", 'utf8', function (err, data) {
//      console.log( data );
//      res.end( data );
//   });
// })

// //IZPIŠI DOLOČEN RECEPT
// app.get('/recipe/:id', (req, res) => {
//   const recipeId = req.params.id; // Get the user ID from the request parameter
//   fs.readFile('models/recipes.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading recipe data"});
//       return;
//     }
//     const recipes = JSON.parse(data).recipes;
//     const recipe = recipes.find(recipe => recipe.id == recipeId); // Find the recpie with the matching ID

//     // Check if the recipe exists
//     if (recipe) {
//       // If the recipe exists, return their data
//       res.json(recipe);
//     } else {
//       // If the recipe does not exist, return an error message
//       res.status(404).json({error: "Recipe not found"});
//     }
//   });
// });

// //DODAJ RECEPT
// app.post('/addRecipe', (req, res) => {
//   const newRecipe = req.body; // Get the new recipe data from the request body

//   // Read the current recipes data from the file
//   fs.readFile('models/recipes.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading recipe data"});
//       return;
//     }

//     // Parse the current recipes data from the file
//     const recipes = JSON.parse(data).recipes;

//     // Generate a new ID for the recipe
//     const newRecipeId = recipes.length + 1;

//     // Create a new recipe object with the new ID
//     const newRecipeWithId = {
//       id: newRecipeId,
//       name: newRecipe.name,
//       ingredients: newRecipe.ingredients,
//       preparation: newRecipe.preparation,
//       calories: newRecipe.calories,
//       protein: newRecipe.protein,
//       fat: newRecipe.fat,
//       carbs: newRecipe.carbs
//     };

//     // Add the new recipe to the recipes array
//     recipes.push(newRecipeWithId);

//     // Write the updated recipes data back to the file
//     fs.writeFile('models/recipes.json', JSON.stringify({ recipes }), 'utf8', (err) => {
//       if (err) {
//         // If there is an error writing the file, return an error message
//         res.status(500).json({error: "Error writing recipe data"});
//         return;
//       }

//       // If the write is successful, return the new recipe data
//       res.json(newRecipeWithId);
//     });
//   });
// });

// //UREDI RECEPT
// app.put('/updateRecipe/:id', (req, res) => {
//   const recipeId = parseInt(req.params.id); // Get the recipe ID from the request URL
//   const updatedRecipe = req.body; // Get the updated recipe data from the request body

//   // Read the current recipes data from the file
//   fs.readFile('models/recipes.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading recipe data"});
//       return;
//     }

//     // Parse the current recipes data from the file
//     const recipes = JSON.parse(data).recipes;

//     // Find the index of the recipe with the specified ID
//     const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);

//     if (recipeIndex === -1) {
//       // If the recipe with the specified ID is not found, return a 404 error
//       res.status(404).json({error: "Recipe not found"});
//       return;
//     }

//     // Update the recipe with the new data
//     const updatedRecipeWithId = {
//       id: recipeId,
//       name: updatedRecipe.name,
//       ingredients: updatedRecipe.ingredients,
//       preparation: updatedRecipe.preparation,
//       calories: updatedRecipe.calories,
//       protein: updatedRecipe.protein,
//       fat: updatedRecipe.fat,
//       carbs: updatedRecipe.carbs
//     };
//     recipes[recipeIndex] = updatedRecipeWithId;

//     // Write the updated recipes data back to the file
//     fs.writeFile('models/recipes.json', JSON.stringify({ recipes }), 'utf8', (err) => {
//       if (err) {
//         // If there is an error writing the file, return an error message
//         res.status(500).json({error: "Error writing recipe data"});
//         return;
//       }

//       // If the write is successful, return the updated recipe data
//       res.json(updatedRecipeWithId);
//     });
//   });
// });

// //IZBRIŠI RECEPT
// app.delete('/deleteRecipe/:id', (req, res) => {
//   const recipeId = req.params.id; // Get the recipe ID from the request parameter
//   fs.readFile('models/recipes.json', 'utf8', (err, data) => {
//     if (err) {
//       // If there is an error reading the file, return an error message
//       res.status(500).json({error: "Error reading recipe data"});
//       return;
//     }
//     const recipes = JSON.parse(data).recipes;
//     const recipeIndex = recipes.findIndex(recipe => recipe.id == recipeId); // Find the recipe index with the matching ID

//     // Check if the recipe exists
//     if (recipeIndex > -1) {
//       // If the recipe exists, remove it from the array
//       recipes.splice(recipeIndex, 1);

//       // Write the updated recipes data back to the file
//       fs.writeFile('models/recipes.json', JSON.stringify({recipes}), 'utf8', (err) => {
//         if (err) {
//           // If there is an error writing the file, return an error message
//           res.status(500).json({error: "Error writing recipe data"});
//           return;
//         }

//         // If the write is successful, return a success message
//         res.json({message: "Recipe deleted successfully"});
//       });
//     } else {
//       // If the recipe does not exist, return an error message
//       res.status(404).json({error: "Recipe not found"});
//     }
//   });
// });


// app.listen(3001, () => {
//   console.log('Server started on port 3001');
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address
// //   var port = server.address().port
//   console.log("Example app listening at http://%s:%s", host, port)
// })