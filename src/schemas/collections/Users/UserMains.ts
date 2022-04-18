import { model, Schema } from "mongoose";

export interface User {
    userId: string;
    tag: string;
    avatar_url: string;
}

export default model("Users/Main", new Schema<User>({
    userId: { type: String },
    avatar_url: { type: String },
    tag: { type: String },
}))