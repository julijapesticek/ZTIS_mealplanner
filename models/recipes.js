const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }],
  preparation: [{
    type: String,
    required: true,
  }],
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  dayOfTheWeek: {
    type: String,
    required: false,
  },
  
  
});

const Recipe = mongoose.model('recipe', recipeSchema, 'Recipes');
module.exports = Recipe;