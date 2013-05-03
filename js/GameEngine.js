function GameEngine(playfield) {
    var canvasContext = playfield.getContext('2d');

    this.map = {};

    this.currentGame = {
        sector: 1
    };

    this.newGame = function() {
        this.map = new Map(playfield, canvasContext).generate(this.currentGame.sector);
    };
}
