const { hashPassword } = require("../configs/bcrypt")

// User data object
const userDto = async (payload) => {
    const { password, confirmPassword, ...data } = payload
    // hashing the password
    const hashedPassword = await hashPassword(password)
    return {
        password: hashedPassword,
        ...data
    }
}

module.exports = { userDto }