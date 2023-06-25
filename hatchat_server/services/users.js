import Users from "../models/users.js";
import defaultProfilePic from '../defaultProfilePic.js';

const isValidBase64 = (value) => {
    try {
        Buffer.from(value, 'base64');
        return true;
    } catch (error) {
        return false;
    }
};

const addNewUser = async (username, password, displayName, profilePic) => {
    try {
        if (profilePic && !isValidBase64(profilePic)) {
            throw new Error('Invalid base64 string for profilePic');
        }
        const newUser = new Users({
            username: username,
            password: password,
            displayName: displayName,
            profilePic: profilePic || defaultProfilePic,
        });
        // Handle successful save
        return await newUser.save();
    } catch (error) {
        // Handle the error
        console.error(error);
        return false;

    }
};


const getUserByUsername = async (id) => {

    const user = await Users.findOne({"username": id});
    if (!user) {
        console.error('User not found');
        return false;
    }
    const {username, displayName, profilePic} = user;
    return {
        username,
        displayName,
        profilePic
    };

};


export default {addNewUser, getUserByUsername};