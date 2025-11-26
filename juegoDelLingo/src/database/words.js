import conexion from './conexion.js';

//devuelve una palabra aleatoria de la tabla palabras
export const getRandomWord = async () => {
    const sql = 'SELECT palabra FROM palabras ORDER BY RAND() LIMIT 1';
  
  const rows = await conexion.query(sql); // rows será algo como [ { palabra: 'hueso' } ]

  if (!rows || rows.length === 0) {
    throw new Error('No hay palabras en la BD');
  }

  return rows[0].palabra; // devolvemos solo el string
};
