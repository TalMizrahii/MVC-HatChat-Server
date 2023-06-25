import jwt from 'jsonwebtoken';
import Users from '../models/users.js';


const key = 'y6SNjgPbm3X^x2jgX5nG@8dT2T!D9X';
const generateToken = async (username, password) => {
    try {
        // Find the user in the database based on the provided username
        const user = await Users.findOne({"username": username}).populate('username password')

        // Check if a user with the provided username exists and verify the password
        if (user.username === username && user.password === password) {
            const data = {username};
            // Generate the token and return the token
            return  jwt.sign(data, key);
        } else {
            // Invalid username/password
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};


const verifyToken =  (token) => {
    try {
        return  jwt.verify(token, key);
    } catch (err) {
        console.error(err);
        return false;
    }
};

export default {generateToken, verifyToken}