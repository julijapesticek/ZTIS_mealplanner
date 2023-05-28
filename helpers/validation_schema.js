const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    gender: Joi.string().required(),
    height: Joi.number().min(1).max(300).required(),
    weight: Joi.number().min(1).max(500).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'si', 'org'] } }).lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'si', 'org'] } }).lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const recipeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    ingredients: Joi.string().min(2).required(),
    preparation: Joi.string().min(2).required(),
    calories: Joi.number().required(),
    protein: Joi.number().required(),
    fat: Joi.number().required(),
    carbs: Joi.number().required(),
});

const mealPlannerSchema = Joi.object({
    dayOfTheWeek: Joi.string().min(1).required(),
    idRecipe: Joi.string().min(1).required(),
    idUser: Joi.string().min(1).required(),
});

module.exports = {
    userSchema,
    loginSchema,
    recipeSchema,
    mealPlannerSchema
}