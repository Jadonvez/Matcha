const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const loginrequired = async (req, res, next) => {
    const token = req.cookies['acces-token']
    if (token) {
        const validatetoken = await jwt.verify(token, process.env.TOKEN_SECRET)
        if (validatetoken) {
            //res.user = validatetoken.id
            console.log('req.body de jwtcheck');
            console.log(req.body);
            next()
        }
        else {
            console.log('token expires => jwtcheck');
        }
    }
    else {
        console.log('token not found => jwtcheck');
    }
}

module.exports = { loginrequired }