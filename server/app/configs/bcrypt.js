const bcrypt = require('bcrypt');

// Hash Password using bcrypt
const hashPassword = async (password) => {
    try {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

// Compare Password using bcrypt
const comparePasswords = async (providedPassword, storedHashedPassword) => {
    try {
        const trimmedProvidedPassword = providedPassword.trim();
        const match = await bcrypt.compare(trimmedProvidedPassword, storedHashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};

module.exports = { hashPassword, comparePasswords }
