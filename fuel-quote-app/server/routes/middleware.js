const jwt = require('jsonwebtoken');
const secret = 'group23secret';

const withAuth = function(req,res,next) {
    const token = req.cookies.token;

    console.log('Token on middleware.js: ');
    console.log(JSON.stringify(token));

    if (!token) {
        res.status(801).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: invalid token');
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

module.exports = withAuth;