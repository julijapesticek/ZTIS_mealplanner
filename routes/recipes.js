const Recipe = require('../models/recipes');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { recipeSchema } = require('../helpers/validation_schema');
const { verifyAccessToken } = require('../helpers/jwt_helper');

// FIND ALL RECIPES
router.route('/listRecipes').get(async (req, res) => {
    try {
        const recipe = await Recipe.find({});
        res.json(recipe);
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});


// FIND ONE RECIPE BY NAME
router.route('/findRecipe/:name').get(async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ name: req.params.name });

        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ msg: 'Recipe not found' });
        }
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});

// FIND RECIPES BY DAY OF THE WEEK
router.route('/getDailyRecipe/:dayOfTheWeek').get(async (req, res) => {
    try {        
        const recipes = await Recipe.find({ dayOfTheWeek: req.params.dayOfTheWeek });
        if (recipes.length > 0) {
            res.json(recipes);
        } else {
            res.status(404).json({ msg: 'Recipes not found for the specified day' });
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
});




// FIND ONE RECIPE BY ID
router.route('/recipe/:id').get(async (req, res) => {
    const najdirecipe = await Recipe.findOne({
        _id: req.params.id
    });
    if (najdirecipe) {
        res.json(najdirecipe);
    } else {
        res.status(404).json({ msg: `Recipe z id=${req.params.id} ni bil najden` });
    }
});



// ADD RECIPE
router.route('/addRecipe').post(verifyAccessToken, async (req, res) => {
    try {
        const result = await recipeSchema.validateAsync(req.body);
        const recipe = new Recipe(result);
        await recipe.save();
        let recipeUri =
            `${req.protocol}://${req.headers.host}${req.originalUrl}/${recipe._id}`;
        res.location(recipeUri).json(recipe);
    } catch (err) {
        if (err.isJoi === true) err.status = 422;
        res.status(500).send(err);
    }
});

// PUT RECIPE
router.route('/updateRecipe/:id').put(async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(req.body)
        console.log(updatedRecipe)
        if (updatedRecipe) {
          res.status(200).json({ msg: 'Recipe je bil posodobljen', recipe: updatedRecipe });
        } else {
          res.status(404).json({ msg: `Recipe z id=${req.params.id} ni bil najden` });
        }
      } catch (err) {
        res.status(500).send(err);
      }

    // if (req.params.id !== req.body._id) {
    //     res.status(400).json('IDja nista enaka!')
    // } else {
        
    //     try {
    //         const najdirecipe = await Recipe.findOne({
    //             _id:
    //                 req.params.id
    //         });
    //         if (najdirecipe) {
    //             await Recipe.findByIdAndUpdate(req.params.id,
    //                 req.body);
    //             res.status(201).json({ msg: 'Recipe je bil posodobljen' });
    //         } else {
    //             res.status(404).json({
    //                 msg: `Recipe z id=${req.params.id} ni bil najden`
    //             });
    //         }
    //     } catch (err) {
    //         res.status(500).send(err)
    //     }
    // }
});



// DELETE RECIPE
router.route('/deleteRecipe/:id').delete(verifyAccessToken, async (req, res) => {
    try {
        const brisi = await
            Recipe.findByIdAndDelete(req.params.id);
        if (!brisi) {
            res.status(404).json({
                msg: `Recipe z id=${req.params.id} ni bil najden` });
        } else {
            res.status(200).json({ msg: 'Recipe je bil izbrisan' });
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = router;