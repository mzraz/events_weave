const { generateJwt, verifyJwt } = require("../configs/jwt");
const { userDto } = require("../dtos/user");
const { userExists, registerUser, updateUserPassword, forgetPasswordEmail, VerifyEmail, userExistByEmail, updateUser } = require("../services/user");
const { handleResponse, InternalServerError, successfulResponse, createResponse } = require("../helpers/response");
const { compareUserPassword } = require("../helpers/user");
const { validateSchema } = require("../helpers/validate");
const { signUpSchema, signInSchema } = require("../validations/auth");
const axios = require('axios');
var nodemailer = require("nodemailer");

let myEmail = "kidsroversclothing@gmail.com"
let password = "szsfudfserhbzflk"
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: myEmail,
        pass: password,
    },
});

exports.getLocation = async(req, res) => {
    const ipAddress = req.ip; 
    try {
        const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        console.log(response);
      } catch (error) {
        console.error('Error:', error.message);
      }
  }

exports.signUp = async (req, res) => {
    const { email } = req.body
    try {
        const { error: schemaErrors } = validateSchema(signUpSchema, req.body);
        if (schemaErrors) return handleResponse(res, schemaErrors);

        const { error } = await userExists(email, type = 'signUp-Api')
        if (error) return handleResponse(res, error)
        const dto = await userDto(req.body)
        const newUser = await registerUser(dto)
        const accessToken = generateJwt({ email })
        const text = await VerifyEmail(accessToken);
        let mailDetail = {
            from: myEmail,
            to: email,
            subject: "EventWeave Verify Email",
            html: text,
        };
        mailTransporter.sendMail(mailDetail, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: "Internal Server Error " });
            } else {
                console.log("mail sent");
                return res.status(200).send({ msg: "Mail sent" });
            }
        })

        const responseObj = {
            data: newUser.user,
            accessToken
        }

        return createResponse(res, responseObj)
    } catch (error) {
        return InternalServerError(res, error)
    }
}

exports.verifyEmail = async (req, res) => {
    const { token } = req.params; 
  
    try {
      const decodedToken = verifyJwt(token); 
      const userEmail = decodedToken.data.email;
      const updatedUser = await updateUser(userEmail);
      if (updatedUser[0] === 1) {
        res.status(200).json({ message: 'Email verified successfully.' });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const { error: schemaErrors } = validateSchema(signInSchema, req.body);
        if (schemaErrors) return handleResponse(res, schemaErrors);

        const { error, user } = await userExists(email, undefined, type = 'signIn-Api')
        if (error) return handleResponse(res, error)

        const { error: passwordError } = await compareUserPassword(password, user.password)
        if (passwordError) return handleResponse(res, passwordError);

        const accessToken = generateJwt({ userId: user.userId })

        const responseObj = {
            data: user,
            accessToken
        }

        return createResponse(res, responseObj)
    } catch (error) {
        return InternalServerError(res, error)
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const { error, user } = await userExists(email, undefined, type = 'ForgetPassword-Api')
        if (error) return handleResponse(res, error)
        const username = user.username;

        const accessToken = generateJwt({ userId: user.userId })
        const text = await forgetPasswordEmail(accessToken);
       
        let mailDetail = {
            from: myEmail,
            to: email,
            subject: "EventWeave Reset Password",
            html: text,
        };
        mailTransporter.sendMail(mailDetail, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: "Internal Server Error " });
            } else {
                console.log("mail sent");
                return res.status(200).send({ msg: "Mail sent" });
            }
        });
    } catch (error) {
        return InternalServerError(res, error)
    }
}

exports.newPassword= async (req, res)=> {
    const { userId, password } = req.body
    try {
        await updateUserPassword(userId, password);
        return res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        return InternalServerError(res, error);
    }
} 

exports.verifyToken= async (req, res)=> {
    const token = req.header('Authorization');

    try {
        if (!token) {
            return handleResponse(res, { error: 'Token not found' });
        }
        const decodedToken = verifyJwt(token);
        const { email } = decodedToken;
        const user = await userExistByEmail(email);

        if (!user) {
            return handleResponse(res, { error: 'User not found' });
        }
        const responseObj = {
            data: user,
            token
        };
        return createResponse(res, responseObj);
    } catch (error) {
        console.error('Error:', error.message);
        return InternalServerError(res, error);
    }
}