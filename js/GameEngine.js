function GameEngine(playfield) {
    var canvasContext = playfield.getContext('2d');

    // Anti aliasing fix. This makes the lines look crisp and sharp and means that rounding to the
    // nearest half pixel is not needed. If you don't mind slightly thicker lines you can do without this
    // http://www.rgraph.net/blog/2013/january/html5-canvas-dashed-lines.html#introduction
    canvasContext.translate(0.5, 0.5);

    this.map = {};

    this.currentGame = {
        sector: 1,
        view: 'map'
    };

    this.newGame = function() {
        this.map = new Map(playfield, canvasContext).generate(this.currentGame.sector);
    };

    playfield.addEventListener('mouseover', function(e) {
        this.hoverAction(e);
    }.bind(this));

    playfield.addEventListener('mousemove', function(e) {
        this.hoverAction(e);
    }.bind(this));

    this.hoverAction = function(e) {
        if (this.currentGame.view === 'map') {
            this.map.showPositionInfo(e);
        }
    };
}
