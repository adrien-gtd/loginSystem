require('dotenv').config();
const mongoose = require ('mongoose');

const { DB_URI } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to the database");
    } catch (error) {
        console.log(error)
    }
}

connectToDB();