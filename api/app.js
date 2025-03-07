import express from express;
import cors from cors;
import mongoose from mongoose;
import dotenv from dotenv;

dotenv.config();

mongoose.connect(process.env.urlbase)

.then(()=>{
    console.log("Funciona correctamente")
})

.catch((error)=>{
    console.log("Algo salio mal", error)
})

const app = express();
app.use(cors());
app.listen(400,()=>[
    console.log("Se escucha correctamente")
])

test()