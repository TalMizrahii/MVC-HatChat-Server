import authenticatorService from '../services/authenticator.js';
import {androidTokensArray} from "../models/androidTokens.js";
import {socketsArray} from "../models/socketsArray.js";

export const isLoggedIn = (req) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        try {
            // Verify the token is valid
            const data = authenticatorService.verifyToken(token);
            return data.username;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
};

const processLogin = async (req, res) => {
    // Check credentials
    const token = await authenticatorService.generateToken(req.body.username, req.body.password);
    if (!token) {
        // Incorrect username/password. The user should try again.
        return res.status(404).send('Incorrect username and/or password');
    } else {
        if (!req.headers.authorization) {
            if (androidTokensArray[req.body.username]) {
                delete androidTokensArray[req.body.username];
            }
        } else {
            for (let i = 0; i < androidTokensArray.length; i++) {
                if (androidTokensArray[i]['androidToken'] === req.headers.authorization) {
                    delete androidTokensArray[i];
                    break;
                }
            }
            androidTokensArray[req.body.username] = req.headers.authorization;
            delete socketsArray[req.body.username];
        }
        // Return the token to the browser
        return res.send(token);
    }
};

export default {isLoggedIn, processLogin}