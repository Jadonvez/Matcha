const router = require('express').Router();
const controller = require('../controllers/user.controller');
const authcontroller = require('../controllers/auth.controller');
const uploadController = require('../controllers/upload.controller');
const matchaController = require('../controllers/matcha.controller');
//const email = require("../mail");
const check_mail = require('../middleware/check_mail');
const check_login = require('../middleware/check_login');
const check_mail_verif = require('../middleware/check_mail_verif');
//multer
const multer = require('multer');
const upload = multer();

// auth

router.post('/register', check_mail, check_login, authcontroller.register);
router.post('/login', check_mail_verif, authcontroller.signIn);
router.get('/logout', authcontroller.logOut);
//router.get('/jwtid', jwtcheck.requireAuth);

// user
router.get('/', controller.getUsers);
router.get("/:id", controller.getUsersById);
router.get("/uid/:uid", controller.getUsersByUid);
router.post("/new_user", controller.addUser);
router.delete("/:id", controller.removeUser);
router.put("/:id", controller.updateUser);
router.put("/change_name/:id", controller.updateName);
router.put("/change_firstname/:id", controller.updateFirstname);
router.put("/change_mail/:id", controller.updateMail);
router.put("/change_gender/:id", controller.updateGender);
router.put("/change_orientation/:id", controller.updateOrientation);
//router.put("/update_profil", controller.updateProfil);

// matcha

router.post("/creatematch", matchaController.createMatch);
router.post("/deletematch", matchaController.deleteMatch);
router.get("/getmatchs/:uid", matchaController.getMatchs);
router.get("/checkmatch/:uid1/:uid2", matchaController.checkMatch);
router.post("/like", matchaController.like);
router.get("/getliker/:uid", matchaController.getLiker);
router.get("/getliked/:uid", matchaController.getLiked);


// upload

router.post('/upload', uploadController.uploadProfil);

// mail 

//router.get("/confirm_email", email.confirmEmail);

module.exports = router;