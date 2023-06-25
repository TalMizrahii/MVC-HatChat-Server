import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderMessageCount: {
        type: Number,
        default: 1,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    content: {
        type: String,
        required: true,
    },
});



const Message = mongoose.model('Message', messageSchema);

export default Message;
