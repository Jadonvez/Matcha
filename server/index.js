const express = require("express");
const routes = require("./api/routes");
require("dotenv").config({ path: "../.env" });

const cors = require("cors");
const app = express();

app.use(express.json());

const corsOptions = {
	origin: `http://localhost:${process.env.PORT_REACT}`,
	credentials: true,
	//allowedHeaders: ["bearer", "Content-Type"],
	//exposedHeaders: ["bearer"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
};

app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//app.use(cookieparser);

// La page d'acceuil

/*app.get("/", loginrequired, (req, res) => {
	res.send("Page d'accueil bg.");
});*/

//app.get("/confirm_email", email.confirmEmail);

// routes

app.use("/api", routes);

//jwt
/*app.get("*", checkUser);
app.get("/jwtid", loginrequired, (req, res) => {
	res.status(200).send(res.locals.user);
	//console.log("l'id a l'index ??????????")
	//console.log(res.locals.user);
});*/

// server
app.listen(process.env.PORT_EXPRESS, () => {
	console.log(`serveur sur le port ${process.env.PORT_EXPRESS}`);
});
