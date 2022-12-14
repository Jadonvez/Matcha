const router = require('express').Router();
const controller = require('../controllers/user.controller');
const authcontroller = require('../controllers/auth.controller');
//const email = require("../mail");
const check_mail = require('../middleware/check_mail');
const check_login = require('../middleware/check_login');
const check_mail_verif = require('../middleware/check_mail_verif');

// auth

router.post('/register', check_mail, check_login, authcontroller.register);
router.post('/login', check_mail_verif, authcontroller.signIn);
router.get('/logout', authcontroller.logOut);

// user
router.get('/', controller.getUsers);
router.get("/:id", controller.getUsersById);
router.post("/new_user", controller.addUser);
router.delete("/:id", controller.removeUser);
router.put("/:id", controller.updateUser);

// mail 

//router.get("/confirm_email", email.confirmEmail);

module.exports = router;