import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generarJWT = (uid = '') => {
    //se crea el token con un payload {uid} y una expiracion de 4 horas

    const token = jwt.sign(
        { uid }, //payload
        process.env.SECRETORPRIVATEKEY, //clave secreta del .env
        { expiresIn: '4h' }     // duración del token
    );

    return token;
};