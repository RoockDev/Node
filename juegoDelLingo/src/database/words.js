//listado de palabra base de datos ficticia
const words = [
    'hueso',
    'suelo',
    'terco',
    'cosas',
    'ruede'
];

export const getRandomWord = () =>{
    const palabra = Math.floor(Math.random() * words.length);
    return words[palabra];
};

