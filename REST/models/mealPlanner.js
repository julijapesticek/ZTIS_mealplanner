const mongoose = require('mongoose');

const mealPlannerSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  dayOfTheWeek: {
    type: String,
    required: true,
  },
  idRecipe: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  }
  
},
{
  versionKey: false // Disable versioning
});

const MealPlanner = mongoose.model('mealPlanner', mealPlannerSchema, 'MealPlanner');
module.exports = MealPlanner;