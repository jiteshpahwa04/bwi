const express = require("express");
const router = express.Router();

const {
    login,
    signup,
} = require("../controllers/Auth");

const { 
    updateDisplayPicture, 
    updateName, 
    deleteAccount 
} = require("../controllers/userController");

const { auth } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// ********************************************************************************************************
//                                      Updation routes
// ********************************************************************************************************

// Route to update display picture
router.put("/updateDP", auth, updateDisplayPicture)

// Route to update name
router.put("/updateName", auth, updateName)

// Route to delete account
router.delete("/deleteAccount", auth, deleteAccount)

// Export the router for use in the main application
module.exports = router