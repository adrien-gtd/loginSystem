const User = require("./model");
const { hashData, veryfyHashData } = require('./../../util/hashData');
const createToken = require("./../../util/createToken");

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

const authenticateUser = async (data) => {
    try {
        const { email, password } = data;
        const fetchUser  = await User.findOne({email});
        if (!fetchUser) {
            throw Error("Invalid email!");
        }

        const hashPassword = fetchUser.password;
        const passwordMatch = await veryfyHashData(password, hashPassword);
        if (!passwordMatch) {
            throw Error("Invalid password provided");
        }

        // Create user token 
        const tokenData = { userID: fetchUser._id, email};
        const token = await createToken(tokenData);
        
        fetchUser.token = token;
        return fetchUser;
    } catch (error) {
        throw error
    }
}

module.exports = { createNewUser, authenticateUser }