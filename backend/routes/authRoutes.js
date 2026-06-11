const express = require("express");

const router = express.Router();
const { auth } = require("../middleware/authMiddleware");

const { isSuperAdmin } = require("../middleware/roleMiddleware");

const {
    signup,
    verifyOtp,
    createPassword,
    login,
    getUsers,
    deleteUser,
    updateUser,
    createUser
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/create-password", createPassword);
router.post("/login", login);
router.get("/users",auth,isSuperAdmin,getUsers);
router.put("/update/:id",auth,isSuperAdmin,updateUser);
router.delete("/delete/:id",auth,isSuperAdmin,deleteUser);
router.post("/create-user",createUser);
module.exports = router;