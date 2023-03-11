var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//////////////////////
//OD TU DALJE REST API:

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//UPORABNIK
// Sample data for our USER
let users = [
  { id: 1, name: 'John', surname: 'Doe', age: 30, gender: 'male', height: 180, weight: 75, email: 'john.doe@example.com' },
  { id: 2, name: 'Jane', surname: 'Smith', age: 25, gender: 'female', height: 165, weight: 60, email: 'jane.smith@example.com' }
];

// GET method to retrieve all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET method to retrieve a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// POST method to create a new user
app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
    email: req.body.email
  };
  users.push(user);
  res.json(user);
});

// PUT method to update a user by ID
app.put('/users/:id', (req, res) => {
  let user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.name = req.body.name;
  user.surname = req.body.surname;
  user.age = req.body.age;
  user.gender = req.body.gender;
  user.height = req.body.height;
  user.weight = req.body.weight;
  user.email = req.body.email;
  res.json(user);
});

// DELETE method to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('User not found');
  }
  users.splice(index, 1);
  res.sendStatus(204);
});


// RECIPE OF A MEAL
let recipes = [
  { 
    id: 1, 
    name: 'Spaghetti with Meat Sauce', 
    ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic', 'olive oil', 'salt', 'pepper'], 
    preparation: '1. Cook spaghetti according to package instructions.\n2. Heat olive oil in a large pan over medium heat. Add onion and garlic and cook until softened.\n3. Add ground beef and cook until browned. Drain any excess fat.\n4. Add tomato sauce and bring to a simmer.\n5. Season with salt and pepper to taste.\n6. Serve meat sauce over cooked spaghetti.', 
    calories: 350, 
    protein: 25, 
    fat: 12, 
    carbs: 30 
  },
  { 
    id: 2, 
    name: 'Grilled Chicken Salad', 
    ingredients: ['chicken breast', 'romaine lettuce', 'cherry tomatoes', 'cucumber', 'red onion', 'feta cheese', 'olive oil', 'red wine vinegar', 'salt', 'pepper'], 
    preparation: '1. Season chicken breasts with salt and pepper. Grill or bake until cooked through.\n2. Cut lettuce into bite-sized pieces and place in a large bowl.\n3. Add cherry tomatoes, sliced cucumber, sliced red onion, and crumbled feta cheese.\n4. Slice cooked chicken and add to the bowl.\n5. In a small bowl, whisk together olive oil, red wine vinegar, salt, and pepper to make the dressing.\n6. Drizzle dressing over salad and toss to combine.', 
    calories: 400, 
    protein: 40, 
    fat: 20, 
    carbs: 15 
  }
];

// GET method to retrieve all recipes
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

// GET method to retrieve a single recipe by ID
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }
  res.json(recipe);
});

// POST method to create a new recipe
app.post('/recipes', (req, res) => {
  const recipe = {
    id: recipes.length + 1,
    name: req.body.name,
    ingredients: req.body.ingredients,
    preparation: req.body.preparation,
    calories: req.body.calories,
    protein: req.body.protein,
    fat: req.body.fat,
    carbs: req.body.carbs
  };
  recipes.push(recipe);
  res.json(recipe);
});

// PUT method to update a recipe by ID
app.put('/recipes/:id', (req, res) => {
  let recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }
  recipe.name = req.body.name;
  recipe.ingredients = req.body.ingredients;
  recipe.preparation = req.body.preparation;
  recipe.calories = req.body.calories;
  recipe.protein = req.body.protein;
  recipe.fat = req.body.fat;
  recipe.carbs = req.body.carbs;
  res.json(recipe);
});

// DELETE method to delete a recipe by ID
app.delete('/recipes/:id', (req, res) => {
  const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Recipe not found');
  }
  recipes.splice(index, 1);
  res.sendStatus(204);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

