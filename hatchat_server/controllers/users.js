import userService from '../services/users.js'
import authenticatorService from "../services/authenticator.js";


const addNewUser = async (req, res) => {
    try {
        const newUser = await userService.addNewUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic);
        if (newUser) {
            return res.send(newUser);
        } else {
            return res.status(409).json({errors: ['Conflict']});
        }
    } catch (err) {
        return res.status(500).json({errors: ['Internal server error']});
    }
};

const getUserByUsername = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = await authenticatorService.verifyToken(token);
        try {
            if (data) {
                const user = await userService.getUserByUsername(data.username);
                if (user) {
                    return res.send(user);
                } else {
                    return res.status(401).json({errors: ['Unauthorized']});
                }
            } else {
                return res.status(401).json({errors: ['Unauthorized']});
            }
        } catch (err) {
            return res.status(401).json({errors: ['Unauthorized']});
        }
    } else {
        return res.status(401).json({errors: ['Unauthorized']});
    }
};


export default {addNewUser, getUserByUserName: getUserByUsername};
