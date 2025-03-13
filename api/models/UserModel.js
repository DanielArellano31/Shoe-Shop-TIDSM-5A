import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        enum:["administrator","client"],
        default:"client"
    }
})

export const UserModel = new model("UserModel", UserSchema)