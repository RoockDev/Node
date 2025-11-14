import express from 'express';
import fechaRouter from './src/routes/fechas.routes.js';
import binarioRouter from './src/routes/binario.routes.js';



class Server {
    constructor(){
        this.app = express();
        this.port = 3000;
        this.app.use('/fecha', fechaRouter);
        this.app.use('/binario',binarioRouter);
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}
export default Server;