require('dotenv').config();
const mariadb = require ('mariadb');

const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT} = process.env;

const connectToDB = async () => {
    try {
        const pool = mariadb.createPool({host: DB_HOST, user: DB_USER, password: DB_PASSWORD, port: DB_PORT, connectionLimit: 5});
        console.log("Connected to the database");
    } catch (error) {
        console.log(error)
    }
}

connectToDB();