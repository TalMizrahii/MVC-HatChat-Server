import Chat from "../models/chat.js";
import User from "../models/users.js";
import Message from "../models/message.js";
import {socketsArray} from "../models/socketsArray.js";

const deleteChat = async (username, deleteChatID) => {
    try {
        const socketObject = socketsArray[username];
        await socketObject.emit('deleteChat', {'id': deleteChatID});
        return;
    } catch (err) {
        console.log("Sending delete signal failed!");
    }
}
const addNewChat = async (username, connectedUsername) => {
    try {
        if (username !== connectedUsername) {
            // Find the user by username and select specific fields
            const user = await User.findOne({"username": username}).populate('username displayName profilePic');
            const receiver = await User.findOne({"username": username})
            const sender = await User.findOne({"username": connectedUsername});
            // User not found
            if (!user || !sender) {
                return false;
            }
            const maxChatID = await Chat.findOne().sort('-id').limit(1).exec();
            let chatID = 1;
            if (maxChatID && maxChatID.id) {
                chatID = maxChatID.id + 1;
            }
            const newChat = await new Chat({
                id: chatID,
                users: [receiver, sender],
                messages: []
            });


            // Save the new chat
            const savedChat = await newChat.save();

            if (savedChat) {
                // Construct the desired response object
                return {
                    "id": savedChat.id,
                    "user": {
                        "username": user.username,
                        "displayName": user.displayName,
                        "profilePic": user.profilePic
                    }
                };
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }
};
const getAllChats = async (username) => {
    try {
        const jsonArray = [];
        const chats = await Chat.find();

        if (chats === null) {
            return jsonArray;
        } else {
            for (const chat of chats) {
                const user1 = await User
                    .findOne({"_id": chat.users[0]})
                    .populate("username displayName profilePic")
                    .lean();
                const user2 = await User
                    .findOne({"_id": chat.users[1]})
                    .populate("username displayName profilePic")
                    .lean();

                if (user1.username === username || user2.username === username) {
                    let lastMessage = null;

                    if (chat.messages.length > 0) {
                        const message = await Message.findOne({"_id": chat.messages[chat.messages.length - 1]}).lean();

                        lastMessage = {
                            id: message.senderMessageCount,
                            created: message.created,
                            content: message.content
                        };
                    }

                    let otherUser;
                    if (user1.username === username) {
                        otherUser = {
                            username: user2.username,
                            displayName: user2.displayName,
                            profilePic: user2.profilePic
                        };
                    } else {
                        otherUser = {
                            username: user1.username,
                            displayName: user1.displayName,
                            profilePic: user1.profilePic
                        };
                    }

                    const jsonObject = {
                        id: chat.id,
                        user: otherUser,
                        lastMessage: lastMessage
                    };
                    jsonArray.push(jsonObject);
                }
            }
        }
        return jsonArray;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return false;
    }
};
const chatValidation = async (username1, username2, connectedUsername) => {
    return username1 === connectedUsername || username2 === connectedUsername;

}


const getChatByID = async (username, id) => {
    try {
        const chat = await Chat.findOne({"id": id}).lean();
        if (!chat) {
            return false;
        } else {
            const user0 = await User.findOne({"_id": chat.users[0]}).lean();
            const user1 = await User.findOne({"_id": chat.users[1]}).lean();

            if (!await chatValidation(await user0.username, await user1.username, username)) {
                return false;
            }
            const users = [];
            const messages = [];
            for (const specificUser of chat.users) {
                const user = await User.findOne({"_id": specificUser});
                users.push({
                    "username": user.username,
                    "displayName": user.displayName,
                    "profilePic": user.profilePic
                });
            }
            for (const msg of chat.messages) {
                const message = await Message.findOne({"_id": msg});
                const sender = await User.findOne(message.sender).populate("username displayName profilePic");
                messages.push({
                    "id": message.senderMessageCount,
                    "created": message.created,
                    "sender": {
                        "username": sender.username,
                        "displayName": sender.displayName,
                        "profilePic": sender.profilePic
                    },
                    "content": message.content
                });
            }
            return {
                "id": id,
                "users": users,
                "messages": messages
            };

        }
    } catch (error) {
        console.error("Error fetching chat:", error);
        return false;
    }
};

const deleteChatByID = async (username, id) => {
    try {
        const chat = await Chat.findOne({"id": id}).lean();
        if (!chat) {
            return false;
        }
        const user0 = await User.findOne({"_id": chat.users[0]}).lean();
        const user1 = await User.findOne({"_id": chat.users[1]}).lean();
        if (!await chatValidation(await user0.username, await user1.username, username)) {
            return false;
        }
        for (const msg of chat.messages) {
            await Message.deleteOne({'_id': msg}).exec();
        }
        if (user0.username === username) {
            await deleteChat(user1.username, id);
        } else {
            await deleteChat(user0.username, id);
        }

        return Chat.deleteOne({id})
    } catch (error) {
        console.error("Error fetching chat:", error);
        return false;
    }
};


export default {addNewChat, getAllChats, getChatByID, deleteChatByID, chatValidation};
