import conexion from "../database/conexion.js";
import { generarJWT } from "../helpers/generate_jwt.js";

//POST /api/auth/login
export const login = async (req, res) =>{
    const {dni,clave} = req.body;

    //validación basica que vengan los dos campos
    if (!dni || !clave) {
        return res.status(400).json({
            message: "dni y clave son obligatorios",
        });
    }

    try{
        //buscar usuario en la bd
        const sql = "SELECT dni, nombre, tfno FROM usuarios WHERE dni = ? AND clave = ?";
        const rows = await conexion.query(sql, [dni, clave]);

        if (!rows|| rows.length === 0) {
            return res.status(401).json({
                message: "Login incorrecto",
            });
        }

        const usuario = rows[0]; // {dni,nombre,tfno}

        //Generar token JWT con el dni como uid
        const token = generarJWT(usuario.dni);

        return res.status(200).json({
            message: "login correcto",
            usuario,
            token
        });

    }catch(error){
        console.error("error de login",error);
        return res.status(500).json({
            message: "Error en el servidor",
        });
    }
};