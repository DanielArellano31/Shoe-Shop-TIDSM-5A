import { Schema, model}  from "mongoose";

const Cart = new Schema({
    Shoes:{
        name: String,
        size: Number,
        price: Number,
        description: String
    },
    TotalPrice:{
        price: Number
    }
    

})

export const CartModel = model("cartModel",Cart)