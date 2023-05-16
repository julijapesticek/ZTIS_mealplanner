const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = "ST_AccessSecret";
            const options = {
                expiresIn: '1h',
                issuer: 'Mealplanner',
                audience: userId,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {
        // if (!req.headers['authorization']) return next(createError.Unauthorized());
        // const authHeader = req.headers['authorization'];
        // const bearerToken = authHeader.split(' ');
        // const token = bearerToken[1];
        // JWT.verify(token, 'ST_AccessSecret', (err, payload) => {
        //     if (err) {
        //         const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        //         return next(createError.Unauthorized(message));
        //     }
        //     req.payload = payload;
        //     next();
        // });

        const token = req.cookies.accessToken;
        JWT.verify(token, 'ST_AccessSecret', (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = "ST_RefreshSecret";
            const options = {
                expiresIn: '1y',
                issuer: 'Mealplanner',
                audience: userId,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, 'ST_RefreshSecret', (err, payload) => {
                if (err) return reject(createError.Unauthorized());
                const userId = payload.aud;
                resolve(userId);
            });
        });
    }
}