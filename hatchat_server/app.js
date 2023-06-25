import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose";
import users from './routes/users.js'
import authenticator from './routes/authenticator.js'
import chat from './routes/chat.js';
import customEnv from 'custom-env';
import {socketsArray} from "./models/socketsArray.js";
import {androidTokensArray} from "./models/androidTokens.js";



const app = express();
import {Server} from "socket.io";
import {createServer} from "http";


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ["GET", "POST", "DELETE"],
    },
});

import firebaseAdmin from 'firebase-admin';
import androidService from './config/firebaseKey.json';


firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(androidService)
});

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('join', (username) => {
        delete androidTokensArray[username];

        if (socketsArray[username] && socketsArray[username].connected) {
            const socketObject = socketsArray[username];
            socketObject.emit('alreadyConnected');
            return;
        }

        console.log(username + ' joined the chat');
        socketsArray[username] = socket;
        // Now you can access the socket using the username as the key
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

    });
});


customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);


const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(process.env.CONNECTION_STRING, connectOptions)
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });


app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/Users', users);
app.use('/api/Tokens', authenticator);
app.use('/api/Chats', chat);

httpServer.listen(process.env.PORT);
