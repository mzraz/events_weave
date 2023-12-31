const { comparePasswords } = require("../configs/bcrypt");

// Function to compare the user password
const compareUserPassword = async (current_password, password) => {
    // comparing the paswored
    const passwordsMatch = await comparePasswords(current_password, password)
    // Throwing error if the password is wrong
    if (!passwordsMatch) return { error: { statusCode: 400, status: "Failed", error: "Invalid Credentials" } };
    return { passwordsMatch }
}

module.exports = { compareUserPassword }