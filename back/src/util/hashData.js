const bcrypt = require("bcrypt");

const hashData = async (data, saltRounds = 10) => {
    try {
        const hashData = await bcrypt.hash(data, saltRounds);
        return hashData
    } catch (error) {
        throw error;
    }   
} 

const veryfyHashData = async (unhashed, hashed) => {
    try {
        const match = bcrypt.compare(unhashed, hashed);
        return match;
    } catch (error) {
        throw error;
    }
}

module.exports = { hashData, veryfyHashData }