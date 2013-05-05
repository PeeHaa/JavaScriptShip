function GameEngine(playfield) {
    var canvasContext = playfield.getContext('2d');

    this.settings = new Settings().initialize();
    this.audioPlayer = new AudioPlayer(this.settings).play();
    this.menu = new Menu(canvasContext, this.settings, this.audioPlayer);
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
        if (this.menu.isActive) {
            this.menu.hover(e);
            return;
        }

        if (this.currentGame.view === 'map') {
            this.map.showPositionInfo(e);
        }
    };

    playfield.addEventListener('click', function(e) {
        if (this.menu.isActive) {
            this.menu.click(e);
            return;
        }

        if (this.currentGame.view === 'map') {
            if (this.map.isActiveJumpValid()) {
                this.map.moveToActiveJump();
                this.turns++;
            }
        }
    }.bind(this));

    document.addEventListener('keyup', function(e) {
        if (e.keyCode !== 27) {
            return;
        }

        if (!this.menu.isActive) {
            if (this.currentGame.view === 'map') {
                this.map.pause()
            }

            this.menu.showMenu();
        } else {
            if (this.currentGame.view === 'map') {
                this.map.resume()
            }

            this.menu.hideMenu();
        }
    }.bind(this));
}
