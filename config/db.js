const Pool = require('pg').Pool;

const pool = new Pool({
    user: "Polcito",
    host: "localhost",
    database: "matcha",
    password: "root",
    port: 5432,
});

module.exports = pool;