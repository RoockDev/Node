export const calcularFormaciones = (req, res) => {
  const soldados = parseInt(req.params.soldados);

  if (isNaN(soldados) || soldados <= 0) {
    return res.json({ error: "Debes enviar un numero valido de legionarios" });
  }

  // Se calcula el lado del primer cuadrado
  // Math.sqrt() saca la raíz cuadrada, Math.floor() redondea hacia abajo
  // Ejemplo: si soldados = 35, sqrt(35) = 5.91., floor = 5
  const lado = Math.floor(Math.sqrt(soldados));

  // Se calcula los soldados entran en el primer cuadrado
  // Ejemplo: 5 × 5 = 25 soldados
  const primerCuadrado = lado * lado;

  // Se calcula cuántos soldados nos sobran después del primer cuadrado
  // Ejemplo: 35 - 25 = 10 soldados restantes
  let restantes = soldados - primerCuadrado;

  let cuadrados = [];
  cuadrados.push(primerCuadrado);

  // Bucle que se repite mientras queden soldados sin formar
  while (restantes > 0) {
    // se Calcula el lado del siguiente cuadrado
    // con los soldados que quedan
    const ladoActual = Math.floor(Math.sqrt(restantes));

    const cuadradoActual = ladoActual * ladoActual;
    cuadrados.push(cuadradoActual);

    restantes -= cuadradoActual;
  }

  let totalEscudos = 0;

  for (let cuadrado of cuadrados) {
    const lado = Math.sqrt(cuadrado);

    // Se calcula los escudos necesarios para este cuadrado
    // cuadrado: 1 escudo arriba por cada soldado
    // 4 × lado: escudos laterales del perímetro
    const escudos = cuadrado + 4 * lado;

    // Sumamos los escudos de este cuadrado al total
    totalEscudos += escudos;
  }

  return res.json({
    soldados,
    cuadrados,
    totalEscudos,
  });
};
