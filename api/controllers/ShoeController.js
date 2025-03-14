import { ShoeModel } from "../models/ShoeModel.js";

export const createShoe = async (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;

    // Validación de datos
    if (!name || !category || !price || !description || !image) {
      res.status(400).json({ msg: "Faltan datos para crear un zapato" });
      return;
    }

    // Creación del zapato
    const shoe = await ShoeModel.create({
      name,
      category,
      price,
      description,
      image,
    });
    res.status(201).json({ msg: "Zapato registrado con éxito", shoe });
  } catch (error) {
    console.error("Error en createShoe:", error);
    res.status(500).json({ msg: "Hubo un error al crear el zapato" });
  }
};

export const getShoes = async (req, res) => {
    try {
      const shoes = await ShoeModel.find();
      if (shoes.length === 0) {
        return res.status(404).json({ msg: "No se encontraron zapatos" });
      }
      res.status(200).json(shoes);
    } catch (error) {
      console.error("Error en getShoes:", error);
      res.status(500).json({ msg: "Hubo un error al obtener los zapatos" });
    }
  };