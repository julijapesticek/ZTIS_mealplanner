const User = require('../models/users');
const express = require('express');
const router = express.Router();
const emailRoutes = require('./emailRegistration');

// FIND ALL USERS
router.route('/listUsers').get(async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (err) {
        res.status(500).send({ msg: err });
    }
});

// FIND ONE USER
router.route('/user/:id').get(async (req, res) => {
    const najdiuserja = await User.findOne({
        _id: req.params.id
    });
    if (najdiuserja) {
        res.json(najdiuserja);
    } else {
        res.status(404).json({ msg: `User z id=${req.params.id} ni bil najden` });
    }
});

// ADD USER
router.route('/addUser').post(async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        //console.log('User', user);
        emailRoutes.sendEmail(user);
        let userUri =
            `${req.protocol}://${req.headers.host}${req.originalUrl}/${user._id}`;
        res.location(userUri).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});


// PUT USER
router.route('/updateUser/:id').put(async (req, res) => {
    if (req.params.id !== req.body._id) {
        res.status(400).json('IDja nista enaka!')
    } else {
        try {
            const najdiuserja = await User.findOne({
                _id: req.params.id
            });
            if (najdiuserja) {
                await User.findByIdAndUpdate(req.params.id,
                    req.body);
                res.status(201).json({ msg: 'User je bil posodobljen' });
            } else {
                res.status(404).json({
                    msg: `User z id=${req.params.id} ni bil najden`
                });
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
});


// DELETE USER
router.route('/deleteUser/:id').delete(async (req, res) => {
    try {
        const brisi = await
            User.findByIdAndDelete(req.params.id);
        if (!brisi) {
            res.status(404).json({
                msg: `User z id=${req.params.id} ni bil najden` });
        } else {
            res.status(200).json({ msg: 'User je bil izbrisan' });
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = router;