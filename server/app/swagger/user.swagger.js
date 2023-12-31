/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints
 */

/**
 * @swagger
 * /api/user/signIn:
 *   post:
 *     summary: Sign In 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 role:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Bad request, validation error, or invalid credentials
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/signUp:
 *   post:
 *     summary: User Sign 
 *     description: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_type:
 *                 type: number
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirmation:
 *                 type: string
 *             required:
 *               - user_type
 *               - first_name
 *               - last_name
 *               - phone_number
 *               - email
 *               - password
 *               - password_confirmation
 *     responses:
 *       201:
 *         description: Successfully signed up a new user
 *       400:
 *         description: Bad request. Validation or user exists errors
 *       401:
 *         description: Unauthorized. Invalid token or authentication failed
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email sent for password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. Validation error or user not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/verifyToken:
 *   post:
 *     summary: Verify Token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       401:
 *         description: Unauthorized. Invalid token or authentication failed
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/newPassword:
 *   post:
 *     summary: Set New Password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - userId
 *               - password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request. Validation error or user not found
 *       401:
 *         description: Unauthorized. Invalid token or authentication failed
 *       500:
 *         description: Internal server error
 */
