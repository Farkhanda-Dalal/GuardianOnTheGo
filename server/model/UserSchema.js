import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema=new Schema({
    role:String,
    fname:String,
    lname:String,
    phone:{
        type: String,
        unique: String
    },
    password:String

})

const User=mongoose.model('User',userSchema);

export default User

