import express from "express";
import cors from 'cors';
import { router as gameRouter } from "./src/routes/game.routes.js";
import { router as authRouter } from "./src/routes/auth.routes.js"
import conexion from "./src/database/conexion.js";

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;

    this.app.use(cors());
    
    this.app.use(express.static('public'));


    //middlewares
    this.app.use(express.json());

    //rutas
    this.app.use('/api/games', gameRouter);
    this.app.use('/api/auth', authRouter);

  }

  listen(){
    this.app.listen(this.port, () => {
        console.log(`Servidor escuchando en http://localhost:${this.port}`);

    });
  }

}

export default Server;
