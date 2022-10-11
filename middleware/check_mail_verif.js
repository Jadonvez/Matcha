const pool = require('../config/db');

module.exports = (req, res, next) => {
    try{
        console.log("----> middleware check_mail_verif");
        pool.query("SELECT * FROM users WHERE mail = $1", [req.body.mail], 
        (error, results) =>{
        if (error)
            res.status(401).json({ error : error })
        else if (results.rows.length)
            if (results.rows[0].mail_confirm == "false")
                res.send("Veuillez activer votre compte en cliquant sur le lien de verification dans vos e-mail.");
        else next();
        });
    }catch(error){
        res.status(401).json({ error : "middleware mail_verif" });
    }
}