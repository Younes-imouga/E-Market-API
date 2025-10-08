class validationMiddleware {

    // npm install yup

    validate = (schema) => async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            res.status(400).json({ errors: error.errors });
        }
    };

}

module.exports = new validationMiddleware;