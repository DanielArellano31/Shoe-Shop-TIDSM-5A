import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
  try {
      //Validamos que existan todos los datos
      const name = req.body.name
      const email = req.body.email
      const password = req.body.password
      const rol = req.body.rol
  
      
      //definir que los administradores no pueden crear clientes
      if (req.user?.rol === "administrator" && rol === "client" ){
          res.status(400).json({msg:"Los adminstradores no pueden crear clientes"})
          return
      }
  
      //validamos que los datos brindados por el usuario esten completos 
      if (!name || !email || !password || !rol) {
          res.status(400).json({msd:"Faltan datos para crear un usuario"}) 
          return
      }
      //validamos que el usuario sea admin si el usuario a crear es admin
      if (req.user?.rol == "administrator" && req.user?.rol != "administrator"){
          res.status(400).json({msg:"Si quieres crear un admin debes ser uno"})
          return
      }

      //creamos user apartir de su modelo
      const user = await UserModel.create({
          name,
          email,
          password,
          rol
        })
        //asignamos un token de registro a cada usuario
    
        
        res.status(200).json({msg:"Usuario registrado con exito", })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Hubo un error al crear el usuario"})
        return
    }
}

export const logIn = async(req, res)=>{
    try {
        const user = await UserModel.findOne({email: req.body.email, password: req.body.password})
        
        if (!user){
            res.status(400).json({msg:"Este usuario no esta registrado"})
            return
        };
        
        const token = jwt.sign(JSON.stringify(user), Shoeee);
        res.status(200).json({msg:"sesion iniciada con exito", token, user})
        return
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Hubo un error al iniciar sesion"}) 
        return
    }
}

export const test = () =>{
    console.log("Si funciona el controlador")
}
