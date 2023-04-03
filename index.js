const express = require('express');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const email = require('./mail');
const { checkUser, loginrequired } = require('./middleware/jwtcheck');

const cors = require('cors');
const app = express();

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use(cookieparser("secret"));


// La page d'acceuil

app.get("/", loginrequired, (req, res) =>{
    res.send("Page d'accueil bg.");
});

app.get("/confirm_email", email.confirmEmail);

// routes

app.use('/api/user', userRoutes);

//jwt
app.get("*", checkUser);
app.get("/jwtid", loginrequired, (req, res) => {
    res.status(200).send(res.locals.user);
    //console.log("l'id a l'index ??????????")
    //console.log(res.locals.user);
});

// server
app.listen(process.env.PORT, () => {
    console.log(`serveur sur le port ${process.env.PORT}`);
});
