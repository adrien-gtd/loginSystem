const User = require("./model")
const { hashData } = require('./../../util/hashData')

const createNewUser = async (data) => {
    try {
        const {name, email, password} = data;

        // Check for existing user
        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw Error("User already exists with the provided email");
        }

        // Hash password
        const hashPassword = await hashData(password);

        const newUser = new User ({
            name, 
            email, 
            password: hashPassword,
        })

        const createdUser = await newUser.save();
        return createdUser;

    } catch (error) {
        throw error
    }
};

module.exports = {createNewUser}