import authenticatorService from '../services/authenticator.js';

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
        // Return the token to the browser
        return res.send(token);
    }
};

export default {isLoggedIn, processLogin}