const express = require("express");
const routes = require("./api/routes");
require("dotenv").config({ path: "../.env" });

const cors = require("cors");
const app = express();

app.use(express.json());

const corsOptions = {
	origin: `http://localhost:${process.env.PORT_REACT}`,
	credentials: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
};

app.use(cors(corsOptions));

app.use("/api", routes);

app.listen(process.env.PORT_EXPRESS, () => {
	console.log(`server available on port ${process.env.PORT_EXPRESS}`);
});
