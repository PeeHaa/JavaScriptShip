function GameEngine(playfield) {
    var canvasContext = playfield.getContext('2d');

    this.audioPlayer = new AudioPlayer().play();
    this.settings = new Settings().initialize();
    this.map = {};

    this.currentGame = {
        sector: 1,
        turns: 0,
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

    playfield.addEventListener('click', function(e) {
        if (this.currentGame.view === 'map') {
            if (this.map.isActiveJumpValid()) {
                this.map.moveToActiveJump();
                this.turns++;
            }
        }
    }.bind(this));
}
