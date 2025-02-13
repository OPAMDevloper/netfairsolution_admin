const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt"); // Import bcrypt library
const router = express.Router();

const salt = bcrypt.genSaltSync(10);
const salt2 = "asdfe45we45w345wegw345werjktjwertkj";

// Authentication endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      console.log("no user");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("pass",password);
    console.log("user pass",user.password);

    // Compare passwords
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    console.log(isPasswordMatch);

    if (isPasswordMatch == false) {
      // Incorrect password
      console.log("OKOK");
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Passwords match
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
