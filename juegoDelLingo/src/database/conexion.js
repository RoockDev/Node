import mysql from 'mysql2';
import dotenv from 'dotenv';
import kleur from 'kleur';

dotenv.config();

class Conexion {
  constructor() {
    this.config = {
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: process.env.DB_MAXCONNECTIONS,
      port: process.env.DB_PORT,
    };

    try {
      this.pool = mysql.createPool(this.config);

      this.pool.getConnection((err, connection) => {
        if (err) {
          console.error(kleur.red().bold('Error en la conexión de la BD: '), err);
        } else {
          console.log(kleur.blue().bold(' Conexión con la BD establecida con éxito'));
          connection.release();
        }
      });
    } catch (error) {
      console.error(kleur.red().bold('Error creando el pool de la BD: '), error);
    }

    // Cerrar el pool al terminar el proceso
    process.on('SIGINT', async () => {
      try {
        await this.pool.end();
        console.log(kleur.cyan().bold('✅ Conexiones con la BD cerradas correctamente.'));
        process.exit(0);
      } catch (error) {
        console.error(kleur.red().bold('Error al cerrar el pool:'), error);
        process.exit(1);
      }
    });
  }

  query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  };
}

// Creamos una única instancia para usarla en todo el proyecto
const conexion = new Conexion();

export default conexion;
