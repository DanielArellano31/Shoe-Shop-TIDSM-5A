import { Schema, model } from "mongoose";


const Shoe = new Schema({
    name:{
        type: String,
        required: true
    },
    size:{
        type: Number,
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