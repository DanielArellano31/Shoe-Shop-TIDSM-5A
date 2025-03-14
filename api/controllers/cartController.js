import { CartModel } from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { user_id, shoe_id } = req.body;

    // Validación de datos
    if (!user_id || !shoe_id) {
      res.status(400).json({ msg: "Faltan datos para agregar un producto al carrito" });
      return;
    }

    // Creación de la relación
    const cartItem = await CartModel.create({ user_id, shoe_id });
    res.status(201).json({ msg: "Producto agregado al carrito", cartItem });
  } catch (error) {
    console.error("Error en addToCart:", error);
    res.status(500).json({ msg: "Hubo un error al agregar el producto al carrito" });
  }
};

export const getCart = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            res.status(400).json({ msg: "Falta el ID de usuario" });
            return;
        }

        const cartItems = await CartModel.find({ user_id }).populate("shoe_id");
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error en getCart:", error);
        res.status(500).json({ msg: "Hubo un error al obtener los productos del carrito" });
    }
};