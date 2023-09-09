const router = require("express").Router();
const UserController = require("./user.controller");
//multer
const multer = require("multer");
const LikeController = require("./like.controller");
const MatchController = require("./match.controller");
const upload = multer();
const auth = require("../middlewares/auth");

// auth

//router.post("/register", check_mail, check_login, authcontroller.register);
//router.post("/register", UserController.create);
//router.post("/login", check_mail_verif, authcontroller.signIn);
//router.get("/logout", authcontroller.logOut);
//router.get('/jwtid', jwtcheck.requireAuth);

// Authentication

//router.get("/authentication/");

// user
router.get("/user/", UserController.getAll);
router.get("/user/:uid", UserController.getByUid);
router.get("/user/:uid/confirm_email/:token", UserController.confirmEmail);
router.post("/user/", UserController.create);
router.post("/user/login", UserController.login);
router.delete("/user/:uid", UserController.delete);
router.patch("/user/:uid", auth, UserController.patch);

// like
router.get("/like/", LikeController.getAll);
router.get("/like/:uid", LikeController.getByUid);
router.post("/like/", LikeController.create);
router.delete("/like/:uid", LikeController.delete);

// match
router.get("/match/", MatchController.getAll);
router.get("/match/:uid", MatchController.getByUid);
router.get("/match/user/:uid", MatchController.getAllByUserUid);
router.delete("/match/:uid", MatchController.delete);

// matcha
/*
router.post("/creatematch", matchaController.createMatch);
router.post("/deletematch", matchaController.deleteMatch);
router.get("/getmatchs/:uid", matchaController.getMatchs);
router.get("/checkmatch/:uid1/:uid2", matchaController.checkMatch);
router.post("/like", matchaController.like);
router.get("/getliker/:uid", matchaController.getLiker);
router.get("/getliked/:uid", matchaController.getLiked);
*/
// upload

//router.post("/upload", uploadController.uploadProfil);

// mail

//router.get("/confirm_email", email.confirmEmail);

module.exports = router;
