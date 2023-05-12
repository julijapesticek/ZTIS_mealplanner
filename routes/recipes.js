const Recipe = require('../models/recipes');
const express = require('express');
const router = express.Router();
const { recipeSchema } = require('../helpers/validation_schema');

// FIND ALL RECIPES
router.route('/listRecipes').get(async (req, res) => {
    try {
        const recipe = await Recipe.find({});
        res.json(recipe);
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});

// FIND ONE RECIPE
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
router.route('/addRecipe').post(async (req, res) => {
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
    if (req.params.id !== req.body._id) {
        res.status(400).json('IDja nista enaka!')
    } else {
        try {
            const najdirecipe = await Recipe.findOne({
                _id:
                    req.params.id
            });
            if (najdirecipe) {
                await Recipe.findByIdAndUpdate(req.params.id,
                    req.body);
                res.status(201).json({ msg: 'Recipe je bil posodobljen' });
            } else {
                res.status(404).json({
                    msg: `Recipe z id=${req.params.id} ni bil najden`
                });
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
});

// DELETE RECIPE
router.route('/deleteRecipe/:id').delete(async (req, res) => {
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