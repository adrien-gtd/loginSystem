const User = require("./../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("./../otp/controller"); 

const verifyUserEmail = async ({email, otp}) => {
    try {
        const validOTP = await verifyOTP({email, otp})
        if (!validOTP) {
            throw Error("Invalid code passed. Check your inbox");
        }
        // ueser is verified
        await User.updateOne({email}, {verified: true});

        await deleteOTP(email);
        return;
    } catch (error) {
        throw error;
    }
}

const sendVerificationOTPEmail = async (email) => {
    try {
        // check if an account exist
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw Error ("There is no user for the provided email.");
        }

        const otpDetails = {
            email,
            subject: "Email verification",
            message: "Verify your email with the code below",
            duration: 1,
        }

        const createdOtp = await sendOTP(otpDetails);
        return createdOtp
    } catch (error) {
        throw error;
    }
}

module.exports = { sendVerificationOTPEmail, verifyUserEmail }