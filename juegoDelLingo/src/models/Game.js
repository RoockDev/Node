class Game {
    constructor(id, secret, maxAttempts = 5){
        this.id = id;
        this.secret = secret;  //palabra secreta
        this.attempts = 0;       //intentos realizados
        this.maxAttempts = maxAttempts;
        this.history = []; 
        this.isFinished = false;      //historial palabras intentos
    }
}

export { Game };