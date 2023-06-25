import ChatServices from "../services/chat.js";
import authenticatorService from "../services/authenticator.js";


const addNewChat = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                const chat = await ChatServices.addNewChat(req.body.username, data.username);
                if (chat) {
                    return res.send(chat);
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

const getAllChats = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                const chats = await ChatServices.getAllChats(data.username);
                if (chats) {
                    return res.send(chats);
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

const getChatByID = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                const chat = await ChatServices.getChatByID(data.username, req.params.id);
                if (chat) {
                    return res.send(chat);
                } else {
                    return res.status(401).json({errors: ['Chat not Found']});
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
}

const deleteChatByID = async (req, res) => {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(' ')[1];
        const data = authenticatorService.verifyToken(token);
        try {
            if (data) {
                const chat = await ChatServices.deleteChatByID(data.username, req.params.id);
                if (chat) {
                    return res.sendStatus(204);
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
}

export default {addNewChat, getAllChats, getChatByID, deleteChatByID}