var express = require('express');
var router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory}= require("../controllers/category")
const {isSignedin,isAdmin,isAuthenticated}= require("../controllers/auth")
const {getUserById}= require("../controllers/user")

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Actuall Routes
//create
router.post("./category/create/:userId", isSignedin, isAuthenticated, isAdmin, createCategory)

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put("./category/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, updateCategory);




//delete

router.delete("./category/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, removeCategory);






module.exports = router;