// esto va a devolver un string de pistas
export const getClues = (secret,guess) => {
    let clues = '';

    for(let i = 0; i < secret.length; i++){
        const secretChar = secret[i];
        const guessChar = guess[i];

        if(!secret.includes(guessChar)){
            //la letra no esta en la palabra
            clues += '_';
        }else if(secretChar === guessChar){
            //la letra si esta en la palabra
            clues += guessChar;
        }else{
            //la letra en la palabra pero en otro lao
            clues += '*';
        };
    }

    return clues;
};