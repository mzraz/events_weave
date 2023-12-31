const jwt = require('jsonwebtoken');

const generateJwt = (payload) => {
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    // Creating jwt token with specific user id
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};

const verifyJwt = (token) => {
    const secretKey = process.env.JWT_SECRET;
    try {
         // Verifying jwt token with specific user id
         
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        return {data: decoded};
    } catch (error) {
        throw error;
    }
};

module.exports = { generateJwt, verifyJwt }
