const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const checkMailExists = "SELECT s FROM users s WHERE s.mail = $1";

const checkMailPasswordExists = "SELECT * FROM users WHERE mail = $1 AND password = $2";

const addUser = "INSERT INTO users (name, firstname, mail, password, dob, gender) VALUES ($1, $2, $3, $4, $5, $6)";
const removeUser = "DELETE FROM users WHERE id = $1";
const updateUser = "UPDATE users SET name = $1 WHERE id = $2";

module.exports = {
    getUsers,
    getUsersById,
    checkMailExists,
    addUser,
    removeUser,
    updateUser,
    checkMailPasswordExists,
    //checkPasswordExists,
};