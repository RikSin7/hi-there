import { Document, Types } from "mongoose";

export interface User {
    name: string;
    username: string;
    avatar: string;
    email: string;
    password: string;
    role: "user" | "admin";
    gender: "male" | "female";
}

export interface Message {
    senderId: Types.ObjectId; 
    receiverId: Types.ObjectId; 
    message: string;
}

export interface Conversation {
    participants: Types.ObjectId[];
    messages: Types.ObjectId[];
}

export interface UserDocument extends User, Document {}

export interface MessageDocument extends Message, Document {}

export interface ConversationDocument extends Conversation, Document {}