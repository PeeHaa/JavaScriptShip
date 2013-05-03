function GameEngine(playfield) {
    this.playfield = playfield;
    this.canvasContext = playfield.getContext('2d');
    this.map = {};

    this.currentGame = {
        sector: 1
    };

    this.newGame = function() {
        this.map = new Map(this.canvasContext).generate(this.currentGame.sector);
    };
}
