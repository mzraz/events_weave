const Joi = require("joi");

const complexityOptions = {
    min: 8,
    max: 128,
    lowerCase: 1,
    upperCase: 1,
    numeric: 2,
    symbol: 1,
    requirementCount: 4,
};


const signUpSchema = Joi.object({
    role_id: Joi.string().uuid().required().messages({
    }),
    username: Joi.string().min(2).max(64).required().messages({
        "string.empty": "name is not allowed to be empty",
        "any.required": "name is required",
        "string.min": "name must be at least 2 characters long",
        "string.max": "name cannot exceed 64 characters",
        "string.base": "name must be a string",
    }),
    email: Joi.string()
        .lowercase()
        .regex(/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .email()
        .trim(true)
        .required()
        .messages({
            "string.pattern.base": "Sorry, Only letters (a-z),numbers(0-9),and periods(.) are allowed.",
            "string.empty": "Email is not allowed to be empty",
            "string.email": "Invalid email format",
            "any.required": "Email is required",
            "string.base": "Email must be a string",
        }),
    password: Joi.string()
        .trim(true)
        .min(complexityOptions.min)
        .max(complexityOptions.max)
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])/)
        .required()
        .messages({
            "string.min": "Password must be at least {{#limit}} characters long",
            "string.max": "Password cannot exceed {{#limit}} characters",
            "string.pattern.base": "Password must contain at least 1 numeric character 1 uppercase letter 1 special symbol",
            "any.required": "Password is required",
            "string.empty": "Password is not allowed to be empty",
        }),
    passwordConfirmation: Joi.string()
        .valid(Joi.ref("password"))
        .messages({
            "any.only": "Password does not match",
            "any.required": "Password confirmation is required",
            "string.empty": "Password confirmation is not allowed to be empty",
        })
});

const signInSchema = Joi.object({
    email: Joi.string()
        .max(255)
        .lowercase()
        .regex(/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .email()
        .trim(true)
        .required()
        .messages({
            "string.pattern.base":
                "Sorry, Only letters (a-z),numbers(0-9),and periods(.) are allowed.",
            "string.empty": "Email is not allowed to be empty",
            "string.email": "Invalid email format",
            "string.max": "Email cannot exceed 255 characters",
            "any.required": "Email is required",
            "string.base": "Email must be a string",
        }),
    password: Joi.string().min(8).max(128).trim(true).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
    }),
});

module.exports = { signInSchema, signUpSchema }