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

const recipeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    ingredients: Joi.array().items(Joi.string()).min(1).required(),
    preparation: Joi.array().items(Joi.string()).min(1).required(),
    calories: Joi.number().required(),
    protein: Joi.number().required(),
    fat: Joi.number().required(),
    carbs: Joi.number().required(),
});

module.exports = {
    userSchema,
    recipeSchema
}