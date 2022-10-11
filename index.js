const express = require('express');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const email = require('./mail');
const { loginrequired } = require('./middleware/jwtcheck');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

// La page d'acceuil

app.get("/", (req, res) =>{
    res.send("Page d'accueil bg.");
});

app.get("/confirm_email", email.confirmEmail);

// routes

app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`serveur sur le port ${process.env.PORT}`);
})