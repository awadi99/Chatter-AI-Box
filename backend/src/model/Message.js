import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"NewUser",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"NewUser",
        required:true
    },
    text:{
        type:String,
    },
    image:{
      type:String,
    },
        
},{timestamps:true});

const MessageData = mongoose.model("MessageData",MessageSchema);

export default MessageData;