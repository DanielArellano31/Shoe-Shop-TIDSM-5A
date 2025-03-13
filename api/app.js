import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logIn, registerUser, test } from "./controllers/UserController.js";

dotenv.config();
mongoose.connect(process.env.urlbase)
  .then(() =>{
    console.log("funciona la base de datos");
  })
  .catch((error) => {
    console.log("No funciona ya salio");
  });

const app = express();
app.use(express.json());
app.use(cors());
app.listen(4000, () => {
  console.log("se escucha el servidor");
});

app.post("/register", registerUser)
app.post("/login", logIn)
test();