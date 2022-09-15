// Importing the necessary modules 
const express = require("express"); 
const path = require("path"); 
const { base_path } = require("../base.js"); 

// creating the router object 
const router = express.Router(); 

// Creating the first route 
router.get("/", async(req, res) => {
    // Sending the home page 
    let full_path = path.join(base_path, 'static', 'templates', 'home.ejs'); 
    res.render(full_path); 
})


// Exporing the router 
module.exports = router; 