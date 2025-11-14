export const obtenerFecha = (req,res) => {
    const numero = parseInt(req.params.num);
     
    if (isNaN(numero) || numero < 1 || numero > 365) {
        return res.json({error: 'El numero debe estar entre 1 y 365'});
    }

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let mes = 0;
    let dia = numero;
    for(let i = 0; i < diasPorMes.length && mes == 0; i++){
        if (dia > diasPorMes[i]) {
            dia -= diasPorMes[i];
        }else{
            mes = i + 1;
        }
    }

    return res.json({
        numeroIntroducido: numero,
        mes,
        dia
    });



};