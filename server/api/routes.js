const router = require("express").Router();
const UserController = require("./controllers/user.controller");
const LikeController = require("./controllers/like.controller");
const MatchController = require("./controllers/match.controller");

const authentication = require("./middlewares/authentication");
const upload = require("./middlewares/upload");
const PictureController = require("./controllers/picture.controller");
const TagController = require("./controllers/tag.controller");

// user
router.get("/user/all", authentication, UserController.getAll);
router.get("/user/current", authentication, UserController.getCurrent);
router.get("/user/:uid", authentication, UserController.getByUid);
router.get("/user/:uid/confirm_email/:token", UserController.confirmEmail);
router.post("/user/", UserController.create);
router.post("/user/login", UserController.login);
router.post("/user/profile", authentication, upload, UserController.profile);
router.delete("/user/", authentication, UserController.delete);
router.patch("/user", authentication, UserController.patch);

// pictures
router.get("/picture/:uid", authentication, PictureController.getByUser);

// tags
router.get("/tag/", TagController.getAll);

/*
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
*/

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
