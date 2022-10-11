const pool = require('../config/db');

module.exports = (req, res, next) => {
    try{
        console.log("----> middleware check_mail");
        console.log(req.body.mail);
        //console.log(req.body.login);
        pool.query("SELECT * FROM users WHERE mail = $1", [req.body.mail], 
        (error, results) =>{
        if (error)
            res.status(401).json({ error : error })
        else if (results.rows.length)
            res.send("Le mail existe deja.");
        else next();
        });
    }catch(error){
        res.status(401).json({ error : "middleware mail" });
    }
}