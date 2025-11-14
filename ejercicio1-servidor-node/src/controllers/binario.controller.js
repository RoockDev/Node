export const complemento = (req, res) => {
  const tipo = req.params.tipo;
  const binario = req.params.bin;

  // Validacion
  if (!/^[01]+$/.test(binario)) {
    return res.json({
      error: "El numero no es un binario válido (solo admite 0 y 1)",
    });
  }

  // complemento a1
  let complemento1 = "";
  for (let i = 0; i < binario.length; i++) {
    complemento1 += binario[i] === "0" ? "1" : "0";
  }

  // complemento a2
  let arr = complemento1.split("");
  let acarreo = 1;

  for (let i = arr.length - 1; i >= 0 && acarreo === 1; i--) {
    if (arr[i] === "1") {
      arr[i] = "0";
    } else {
      arr[i] = "1";
      acarreo = 0;
    }
  }

  const complemento2 = arr.join("");

  // respuesta segun tipo
  if (tipo === "1") {
    return res.json({
      original: binario,
      complemento1,
    });
  }

  if (tipo === "2") {
    return res.json({
      original: binario,
      complemento2,
    });
  }

  if (tipo === "ambos") {
    return res.json({
      original: binario,
      complemento1,
      complemento2,
    });
  }

  return res.json({
    error: "El tipo debe ser 1, 2 o ambos",
  });
};
