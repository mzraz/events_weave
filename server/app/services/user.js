const { findUser, makeUser, userExistsById, userExistsByEmail } = require("../dal/user")
const { hashPassword } = require("../configs/bcrypt");
const db = require("../models");
const { users } = db

const userExists = async (email, type) => {
    const user = await findUser(email)
    let error;
    if (type === 'signUp-Api') {
        if (user) {
            if (user.email === email) {
                error = { statusCode: 409, status: "Failed", error: "Email is Already in use" }
            }
        }
    }
    if (type === 'signIn-Api') {
        if (!user) {
            error = { statusCode: 400, status: "Failed", error: "Invalid Credentials" }
        }
    }
    if (type === 'ForgetPassword-Api') { 
        if (!user) {
            error = { statusCode: 400, status: "Failed", error: "User not Exist with this Email" }
        }
    }
    if (error) return { error }
    return { user }
}
const userExistByEmail = async (email) => {
    const user = await userExistsByEmail(email)
    return user;
}

const registerUser = async (dto) => {
    const user = await makeUser(dto)
    return { user }
}

const findUserById = async (id) => {
    const user = await userExistsById(id)
    let error;
    if (!user) {
        error = { statusCode: 400, status: "Failed", error: "User Does not Exists" }
    }
    if (error) return { error }
    return { user }
}

const updateUser = async (userEmail) => {

    const user = await users.update({ is_active: 1 }, {
        where: { email: userEmail }
    })
    return user;
}

const updateUserPassword = async (userId, newPassword) => {
    const hashedPassword = await hashPassword(newPassword);
    
    const updatedUser = await users.update(
        { password: hashedPassword },
        { where: { userId: userId, is_active:1 } }
    );

    return updatedUser;
};

const forgetPasswordEmail = async (accessToken) => {
    const text = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.5;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 4px;
            }
    
            h2 {
                color: #333;
                margin-bottom: 20px;
            }
    
            p {
                margin-bottom: 10px;
            }
    
            a {
                display: inline-block;
                padding: 10px 20px;
                background-color: #BEE94C;
                color: #fff;
                text-decoration: none;
                border-radius: 4px;
            }
    
            a.white {
                color: #fff;
            }
    
            .logo {
                display: block;
                max-width: 150px;
                margin: 0 0 0px -5px;
            }
    
            .stripdiv {
                padding: 10px 20px;
                background-color: #BEE94C;
                margin: 0 0 5px 0px;
            }
            .header_class{
                background-color: white;
                box-shadow: 4px 8px 6px -8px rgba(0,0,0,0.75);
    
            }
            .footer_class{
                    padding: 1px 10px;
                background-color: #f9f9f9;
              display:flex;
              justify-content: space-between;
               align-items: center;
            }
            .footer_class p {
                  font-size: 12px;
                  color:#6B7280;
            }
            .hr_class{
                margin-top:25px;
            }
            .voucherdiv{
              background-color: white;
              padding: 5px 5px;
              width:"100%";
              max-width:"30px";
              margin:"auto";
              text-align: center;
             }
            .voucherdiv h1 h2 p{
              background-color: white;
              padding: 5px 5px;
              width:"100%";
              max-width:"100px";
              margin:"auto";
              text-align: center;
              color: black !important;
            }
           
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class='stripdiv'></div>
            <div class='header_class'>
                <img class="logo" src="https://s3.us-west-2.amazonaws.com/www.mystoryvault.co/production/StoryBookImages/Complete+Logo.png" alt="Logo" />
            </div>
         
            <div class='voucherdiv'>
            <h1> <strong>Forget Password </strong> </h1>
            <div class='hr_class'>
            <hr/>
            </div>
            <p>To reset the password please follow link below:</p>
            <p><a class="white" href="${`http://localhost:5173/newPassword/${accessToken}`}"">Click here to Reset your Password</a></p>
            </div>
            <p>Best regards,</p>
            <p>Team EventsWeave</p>
            
            <div class='hr_class'>
                 <hr/>
            </div>
            <div class='footer_class'>
                <p>
                &copy; 2024 Events Weave, LLC. All rights reserved.
                </p>  
            </div>
        </div>
    </body>
    </html>
        `;

    return text;
};


const VerifyEmail = async (accessToken) => {
    const text = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.5;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 4px;
            }
    
            h2 {
                color: #333;
                margin-bottom: 20px;
            }
    
            p {
                margin-bottom: 10px;
            }
    
            a {
                display: inline-block;
                padding: 10px 20px;
                background-color: #BEE94C;
                color: #fff;
                text-decoration: none;
                border-radius: 4px;
            }
    
            a.white {
                color: #fff;
            }
    
            .logo {
                display: block;
                max-width: 150px;
                margin: 0 0 0px -5px;
            }
    
            .stripdiv {
                padding: 10px 20px;
                background-color: #BEE94C;
                margin: 0 0 5px 0px;
            }
            .header_class{
                background-color: white;
                box-shadow: 4px 8px 6px -8px rgba(0,0,0,0.75);
    
            }
            .footer_class{
                    padding: 1px 10px;
                background-color: #f9f9f9;
              display:flex;
              justify-content: space-between;
               align-items: center;
            }
            .footer_class p {
                  font-size: 12px;
                  color:#6B7280;
            }
            .hr_class{
                margin-top:25px;
            }
            .voucherdiv{
              background-color: white;
              padding: 5px 5px;
              width:"100%";
              max-width:"30px";
              margin:"auto";
              text-align: center;
             }
            .voucherdiv h1 h2 p{
              background-color: white;
              padding: 5px 5px;
              width:"100%";
              max-width:"100px";
              margin:"auto";
              text-align: center;
              color: black !important;
            }
           
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class='stripdiv'></div>
            <div class='header_class'>
                <img class="logo" src="https://s3.us-west-2.amazonaws.com/www.mystoryvault.co/production/StoryBookImages/Complete+Logo.png" alt="Logo" />
            </div>
         
            <div class='voucherdiv'>
            <h1> <strong>Email Verification </strong> </h1>
            <div class='hr_class'>
            <hr/>
            </div>
            <p>To verify email please follow link below:</p>
            <p><a class="white" href="${`http://localhost:5173/verifyEmail/${accessToken}`}"">Click here to verify your Email</a></p>
            </div>
            <p>Best regards,</p>
            <p>Team EventsWeave</p>
            
            <div class='hr_class'>
                 <hr/>
            </div>
            <div class='footer_class'>
                <p>
                &copy; 2024 Events Weave, LLC. All rights reserved.
                </p>  
            </div>
        </div>
    </body>
    </html>
        `;

    return text;
};

module.exports = { userExists, registerUser, findUserById, updateUserPassword, forgetPasswordEmail, VerifyEmail, userExistByEmail, updateUser }