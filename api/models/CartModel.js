import { Schema, model}  from "mongoose";

const Cart = new Schema({
    user_id: {type: Schema.Types.ObjectId, required: true, ref: "userModel"},
    shoe_id: {type: Schema.Types.ObjectId, required: true, ref: "shoeModel"},

})

export const CartModel = model("cartModel", Cart)