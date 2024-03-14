const OTP = require("./model");
const generateOTP = require("./../../util/generateOTP");
const sendEmail = require("./../../util/sendEmail");
const { hashData, verifyHashData } = require("./../../util/hashData")
const { EMAIL_USER } = process.env;

const verifyOTP = async ({email, otp}) => {
    try {
        if (!(email && otp)) {
            throw Error("Provide values for email, otp");
        }

        // ensure otp record exists
        const matchedOTPRecord = await OTP.findOne({
            email,
        });
        
        if (!matchedOTPRecord) {
            throw Error("No OTP record found.");
        }

        const { expiresAt } = matchedOTPRecord;

        // checking for expiring code
        if (expiresAt < Date.now()) {
            await OTP.deleteOne({email});
            throw Error("Code has expired. Request for a new one.")
        }

        // not expired yet, verify value
        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = await verifyHashData(otp, hashedOTP);

        return validOTP
    } catch (error) {
        throw error;
    }
}

const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({email});
    } catch (error) {
        throw error;
    }
};


const sendOTP = async ({email, subject, message, duration = 1}) => {
    try {
        if (!(email && subject && message)) {
            throw Error("provide values for email, subject, message");
        }

        // clear any old recrod
        await OTP.deleteOne({email}); 

        // generate pin
        const generatedOTP = await generateOTP();

        // send email
        const mailOptions = {
            from: EMAIL_USER,
            to: email, 
            subject,
            html: `<p>${message}<p/><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        }
        await sendEmail(mailOptions);

        // save OTP record
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email, 
            otp: hashedOTP,
            createAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        
    }
}

module.exports = { sendOTP, verifyOTP, deleteOTP };