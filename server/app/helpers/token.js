const { verifyJwt } = require("../configs/jwt");

const verifyToken = (token) => {
    const verify = verifyJwt(token);
    if (!verify) return { error: { statusCode: 401, status: "Failed", error: "Cant Proceed, because you are Unauthorized." } };
    return { data: verify }
}

module.exports = {
    verifyToken,
}