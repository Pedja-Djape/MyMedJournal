const jwt = require('jsonwebtoken');

const authorizeUser = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN");
        req.user = decodedToken;
        next()
    } catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}


module.exports = authorizeUser;