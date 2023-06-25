import Chat from "../models/chat.js";
import User from "../models/users.js";
import Message from "../models/message.js";
import chatService from "./chat.js"
import {socketsArray} from "../models/socketsArray.js";
import {androidTokensArray} from "../models/androidTokens.js";
import firebaseAdmin from "firebase-admin";
import {response} from "express";

const sendMessage = async (username, fullMsg) => {
    try {
        const socketObject = socketsArray[username];
        await socketObject.emit('userReceiveMessage', fullMsg);
    } catch (err) {
        console.log("Sending message failed!");
    }
}

const sendMessageAndroid = async (username, fullMsg) => {
    for (let i = 0; i < fullMsg.content.length; i += 2500) {
        const msg = {
            notification: {
                title: 'Message from ' + fullMsg.sender.username.toString(),
                body: fullMsg.content.substring(i, i + 2500),
            },
            data: {
                senderUsername: fullMsg.sender.username.toString(),
                displayName: fullMsg.sender.displayName.toString(),
                profilePic: fullMsg.sender.profilePic.toString(),
                created: fullMsg.created.toISOString(),
                chatID: fullMsg.id.toString(),
                content: fullMsg.content.toString(),
            },
            token: androidTokensArray[username]
        };
        await firebaseAdmin.messaging.send(msg)
            .then((response) => {
                console.log('Message sent!');
            }).catch((err) => {
                console.log('Error: ', err);
            });
    }

    const addMessage = async (id, content, connectUsername) => {
        try {
            const chat = await Chat.findOne({"id": id});

            if (chat) {
                const user0 = await User.findOne({"_id": chat.users[0]}).lean();
                const user1 = await User.findOne({"_id": chat.users[1]}).lean();
                if (!await chatService.chatValidation(await user0.username, await user1.username, connectUsername)) {
                    return false;
                }
                const sender = await User.findOne({"username": connectUsername})
                const maxMessageID = await Message.findOne().sort('-id').limit(1).exec();
                let messageID = 1;
                if (maxMessageID && maxMessageID.senderMessageCount) {
                    messageID = maxMessageID.senderMessageCount + 1;
                }

                const newMessage = await new Message({
                    "senderMessageCount": messageID,
                    "sender": sender,
                    "content": content
                });

                const returnVal = {
                    "id": messageID,
                    "created": new Date(),
                    "sender": {
                        "username": sender.username,
                        "displayName": sender.displayName,
                        "profilePic": sender.profilePic
                    },
                    "content": content
                }
                const fullMsg = {
                    "id": id,
                    "message": {
                        "id": messageID,
                        "created": new Date(),
                        "sender": {
                            "username": sender.username,
                            "displayName": sender.displayName,
                            "profilePic": sender.profilePic
                        },
                        "content": content
                    }
                }

                if (androidTokensArray[user0.username] === connectUsername) {
                    await sendMessageAndroid(user1.username, fullMsg);
                } else if (androidTokensArray[user1.username] === connectUsername) {
                    await sendMessageAndroid(user0.username, fullMsg);
                } else {
                    if (user0.username === connectUsername) {
                        await sendMessage(user1.username, fullMsg);
                    } else {
                        await sendMessage(user0.username, fullMsg);
                    }
                }


                await newMessage.save();
                chat.messages.push(newMessage);
                await chat.save();
                return returnVal;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const getMessages = async (id, connectUsername) => {
        try {
            const chatArray = []
            const chat = await Chat.findOne({"id": id});
            if (chat) {
                const user0 = await User.findOne({"_id": chat.users[0]}).lean();
                const user1 = await User.findOne({"_id": chat.users[1]}).lean();
                if (!await chatService.chatValidation(await user0.username, await user1.username, connectUsername)) {
                    return false;
                }
                for (const msg of chat.messages) {
                    const getMsg = await Message.findOne({"_id": msg});
                    const sender = await User.findOne(msg.sender).populate('username')
                    chatArray.push({
                        "id": getMsg.senderMessageCount,
                        "created": getMsg.created,
                        "sender": {
                            "username": sender.username
                        },
                        "content": getMsg.content
                    });
                }
                return chatArray;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }


    };

    export default {addMessage, getMessages}