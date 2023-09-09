const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


const checkUser = (req, res, next) => {
    const token = req.cookies['access-token'];
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, mailID) => {
            if (err) {
                console.log("erreur dans le checkUser");
                res.locals.user = null;
                //res.cookie('jwt', '', { maxAge: 1 });
                next();
            }
            else {
                let user = mailID.id;
                res.locals.user = user;
                //console.log("checkUser console log !!!!!!!!!!")
                //console.log(user);
                //console.log(res.locals.user);
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

const loginrequired = (req, res, next) => {
    const token = req.cookies['access-token'];
    //const authHeader = req.headers.authorization;
    //const token3 = req.headers['authorization'];
    //const token2 = authHeader.split(' ')[1]; 
    ////console.log("=====> token" ,token);
    //console.log("====> autHeader", authHeader);
    //console.log("====> auth2 Header", token3);
    //console.log("====> token auth[1]", token2);

    // if (token) {
    //     const validatetoken = jwt.verify(token, process.env.TOKEN_SECRET)
    //     if (error) {
    //         res.status(403).json('Invalid token');
    //     }
    //     else if (validatetoken) {
    //         //res.user = validatetoken.id
    //         console.log('req.body de jwtcheck');
    //         console.log(req.body);
    //         next()
    //     }
    //     else {
    //         res.send('token expires => jwtcheck');
    //         //console.log('token expires => jwtcheck');
    //     }
    // }
    // else {
    //     res.send('token not found => jwtcheck');
    //     //console.log('token not found => jwtcheck');
    //     // console.log('req.body de jwtcheck');
    //     // console.log(req.mail);
    // }
    if (!token) {
        return res.status(401).json('No token found');
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, mailID) => {
        if (err) {
            return res.status(403).json('Invalid Token');
        }
        //console.log(mailID.id);
        next();
    })
}

module.exports = { loginrequired, checkUser }