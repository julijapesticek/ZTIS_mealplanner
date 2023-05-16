const User = require('../models/users');
const express = require('express');
const router = express.Router();
const emailRoutes = require('./emailRegistration');
const { userSchema, loginSchema } = require('../helpers/validation_schema');
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper');

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
        //const user = new User(req.body);
        const result = await userSchema.validateAsync(req.body);

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist)
            return res.status(404).json({ msg: `${result.email} je že zaseden.` });

        // const accessToken = await signAccessToken(user.id);
        // const refreshToken = await signRefreshToken(user.id);

        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        // });
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        // });

        const user = new User(result);
        await user.save();

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });

        //LARA TO POPRAVIIIIII
        //emailRoutes.sendEmail(user);

        let userUri =
            `${req.protocol}://${req.headers.host}${req.originalUrl}/${user._id}`;
        res.location(userUri).json(user);
    } catch (err) {
        if (err.isJoi === true) err.status = 422;
        res.status(500).send(err);
    }
});

//LOGIN OF USER
router.route('/login').post(async (req, res) => {
    try {
        const result = await loginSchema.validateAsync(req.body);
        const user = await User.findOne({ email: result.email });
        if (!user) {
            return res.status(401).json({ error: 'User not registered' });
        }
        const isMatch = await user.comparePassword(result.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });


        res.json({ message: 'Login successful', 'AccessToken:': accessToken, 'RefreshToken:': refreshToken });
    } catch (err) {
        if (err.isJoi === true) err.status = 422;
        res.status(500).send(err);
    }
});

// REFRESH TOKEN
router.route('/refreshToken').post(async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) throw res.status(400).json({ error: 'Bad request' });
        const userId = await verifyRefreshToken(token);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);

        res.cookie('refreshToken', refToken, {
            httpOnly: true,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });

        res.json({ 'AccessToken:': accessToken, 'RefreshToken:': refToken });
    } catch (err) {
        next(err);
    }
});

// LOGOUT OF USER
router.route('/logout').post(async (req, res, next) => {
    try {
        res.cookie('accessToken', '', {maxAge: 1});
        res.cookie('refreshToken', '', {maxAge: 1});

        res.status(201).json({ msg: 'Logout successful' });
    } catch (err) {
        next(err);
    }
});

// PUT USER
router.route('/updateUser/:id').put(verifyAccessToken, async (req, res) => {
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
                //await najdiuserja.save();
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
router.route('/deleteUser/:id').delete(verifyAccessToken, async (req, res) => {
    try {
        const brisi = await
            User.findByIdAndDelete(req.params.id);
        if (!brisi) {
            res.status(404).json({
                msg: `User z id=${req.params.id} ni bil najden`
            });
        } else {
            res.status(200).json({ msg: 'User je bil izbrisan' });
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = router;