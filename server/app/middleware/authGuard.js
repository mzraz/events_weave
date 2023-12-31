// const { findUserById } = require("../services/user");
const { handleResponse, unAuthenticateResponse } = require("../helpers/response");
const { verifyJwt } = require("../configs/jwt");

const authGuard = async (req, res, next) => {
    try {
        // Check if authorization header is present or not
        const header = req.headers['authorization'];
        // console.log("header-----",header)
        if (!header) return res.status(401).json({ message: 'Access denied, no token provided.' });

        const token = header.includes('Bearer') ? header.split(' ')[1] : header;
        // validating if token is expired or the user is valid or not
        const { error: tokenErrors, data: verifiedUser } = verifyJwt(token);
        if (tokenErrors) return handleResponse(res, tokenErrors);

        const id = verifiedUser.userId
        console.log("id-------",id)

        req.id = id;
        return next();
    } catch (error) {
        return unAuthenticateResponse(res, error)
    }
};


module.exports = { authGuard }