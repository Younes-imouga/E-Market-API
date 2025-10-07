
const { body, validationResult } = require('express-validator');

class validationMiddleware {
    
    //npm install express-validator
    validateUser = async (req, res, next) => {
    await body('fullname')
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long')
        .run(req);

    await body('email')
        .isEmail().withMessage('Invalid email address')
        .run(req);

    await body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
    };

    // npm install yup

    // validate = (schema) => async (req, res, next) => {
    //     try {
    //         await schema.validate(req.body, { abortEarly: false });
    //         next();
    //     } catch (error) {
    //         res.status(400).json({ errors: error.errors });
    //     }
    // };

}

module.exports = validationMiddleware;