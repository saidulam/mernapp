const express = require("express");
const router = express.Router();
const { getUserById, getUser, updateUser,userPurchaseList } = require("../controllers/user");
const {isSignedin, isAuthenticated, isAdmin} = require("../controllers/auth.js");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedin, isAuthenticated, getUser);
router.put("/user/:userId", isSignedin, isAuthenticated, updateUser);
router.get("/orders/user/:userId",isSignedin, isAuthenticated, userPurchaseList )



module.exports = router;
