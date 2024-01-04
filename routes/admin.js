const express = require("express");
const router = express.Router();

const {
    adminSignup,
} = require("../controllers/Auth");

const { 
    updateDisplayPicture, 
    updateName, 
    deleteAccount 
} = require("../controllers/adminController");

const { adminAuth } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/signup", adminSignup)

// ********************************************************************************************************
//                                      Updation routes
// ********************************************************************************************************

// Route to update display picture
router.put("/updateDP", adminAuth, updateDisplayPicture)

// Route to update name
router.put("/updateName", adminAuth, updateName)

// Route to delete account
router.delete("/deleteAccount", adminAuth, deleteAccount)

// Export the router for use in the main application
module.exports = router