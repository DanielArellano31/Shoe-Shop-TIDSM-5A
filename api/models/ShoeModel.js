import { Schema, model } from "mongoose";


const Shoe = new Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
         type: Number,
        required: true
    },
    description:{
        type: String,
         required: true
   }
})
export const ShoeModel = model("ShoeModel",Shoe)