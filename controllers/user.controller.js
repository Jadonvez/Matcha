const pool = require('../config/db');
const queries = require('../queries');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    console.log('on chope les users');
    pool.query(queries.getUsers, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUsersById = (req, res) => {
    console.log('on chope un user par son id');
    const id = parseInt(req.params.id);
    pool.query(queries.getUsersById, [id],(error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addUser = (req, res) => {
    const { name, firstname, mail, password, dob, gender } = req.body;

    // check le mail si il exist
    pool.query(queries.checkMailExists, [mail], (error, results) => {
        if (results.rows.length) {
            res.send("Le mail existe deja.");
        }
        else {
    // ajout du user dans la db
            
        pool.query(queries.addUser, [name, firstname, mail, bcrypt.hashSync(password, 10), dob, gender], (error, results) => {
            if (error) throw error;
            res.status(201).send("Ajout du user reussie.");
        })};
    });
};

const removeUser =  (req, res) => {
    console.log("on supprime le user par le id");
    const id = parseInt(req.params.id);
    pool.query(queries.getUsersById, [id], (error, results) =>{
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send("User n'existe pas dans la db");
        }
        else {
        pool.query(queries.removeUser, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Suppression du user reussies");
        })};
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getUsersById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send("User n'existe pas dans la db");
        }
        else {
        pool.query(queries.updateUser, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("User update reussie.");
        })};
    });
};


//const followUser = (req, res) => {
//    const id = parseInt(req.params.id);
//    const { Ilike } = req.body; 

//    pool.query(queries.getUsersById, [id], (error, results) => {
//        const noUserFound = !results.rows.length;
//        if (noUserFound) {
//            res.send("User n'existe pas dans la db");
//        }
//        else {
//            pool.query(queries.follow, [id], (error, results) => {
//                if (error) throw error;
//                res.status(200).send("Ajout du follow reussie.");
//            })};
//    })
//}

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    removeUser,
    updateUser,
    //followUser,
};