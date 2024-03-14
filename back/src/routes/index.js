const express = require("express");
const router = express.Router();

const userRoutes = require("./../domain/user");
const OTPRoutes = require("./../domain/otp")
const emailVerificationRoutes = require("./../domain/email_verification")

router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email_verification", emailVerificationRoutes);

module.exports = router;