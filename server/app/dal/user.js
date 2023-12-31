const db = require("../models");
const { users } = db

// Find an Existing user
const findUser = async (email) => {
    let where;
 
        where = {
            where: { email }
        }

    const user = await users.findOne({
        ...where
    });
    return user;
}

// Create a user
const makeUser = async (dto) => {
    const user = await users.create({ ...dto, is_active: 1 })
    return user;
}

// Create a user
const userExistsById = async (userId) => {
    const user = await users.findOne({
        where: { userId, is_active: 1 }
    })
    return user;
}

const userExistsByEmail = async (email) => {
    const user = await users.findOne({
        where: { email, is_active: 1 }
    })
    return user;
}

const checkRole = async (userId) => {
    const user = await users.findByPk(userId,
        { include: [{ 
               model: roles,
                as: 'role'
           }]
        });
        if (!user) {
            throw new Error('User not found');
          }
        return user.role.title;
}

module.exports = { makeUser, findUser, userExistsById, userExistsByEmail, checkRole }

