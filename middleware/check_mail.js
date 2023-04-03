const pool = require('../config/db');

module.exports = (req, res, next) => {
    try{
        console.log("----> middleware check_mail");
        console.log(req.body.mail);
        pool.query("SELECT * FROM users WHERE mail = $1", [req.body.mail], 
        (error, results) =>{
        if (error)
        {
            console.log("erreur 401 check mail middleware");
            res.status(401).json({ error : error })
        }
        else if (results.rows.length)
            res.status(401).json({ error: "Le mail existe deja" });
        else
        {
            console.log("ca passe le check mail middleware");
            next();
        }
        });
    }catch(error){
        res.status(401).json({ error : "middleware mail" });
    }
}