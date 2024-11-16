import {  Schema } from "mongoose";
import mongoose from "../Database";

export interface MessageInterface {
    _id ?:string 
    subject:string ,
    body: string,
    sender:string,
    email:string,
    treated: boolean,
    phoneNumber:string,
    __v?:number
}

const MessageSchema : Schema = new mongoose.Schema<MessageInterface>({
     subject:{type: String , required : true},
     body: {type :String ,required : true},
     sender:{type:String , required :true},
     email:{type:String , required:true},
     treated:{type: Boolean , required:true , default :false},
     phoneNumber:{type:String , required :true }
})


const Message = mongoose.model("Message" , MessageSchema)

export default Message;