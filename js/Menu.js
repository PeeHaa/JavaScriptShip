function Menu(canvasContext, settings, gameEngine, audioPlayer) {
    this.menuItems = {
        newGame: {
            name: 'New game',
            enabled: true,
            active: false,
            type: 'button',
            click: function() {
                this.hideMenu();
                gameEngine.newGame();
            }.bind(this)
        },
        music: {
            name: 'Music: {state}',
            enabled: true,
            active: false,
            type: 'toggler',
            states: ['off', 'on'],
            state: settings.values.music.enabled ? 1 : 0,
            click: function() {
                console.log(this.state);
                if (this.state === 0) {
                    this.state = 1;
                    settings.values.music.enabled = true;
                    audioPlayer.play();
                } else {
                    this.state = 0;
                    settings.values.music.enabled = false;
                    audioPlayer.stop();
                }

                settings.persist();
            }
        }
    };

    this.isActive = false;

    this.ticker = 0;

    this.showMenu = function() {
        this.isActive = true;

        this.drawMenu();

        this.drawTicker();
    };

    this.drawMenu = function() {
        if (!this.isActive) {
            return;
        }

        var linearGradient = canvasContext.createLinearGradient(0,0,0,100);
        linearGradient.addColorStop(0, '#e2e2e2');
        linearGradient.addColorStop(1, '#d1d1d1');

        canvasContext.fillStyle = linearGradient;
        canvasContext.fillRect(300, 150, 200, 250);
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = '#ffffff';
        canvasContext.strokeRect(300, 150, 200, 250);

        var position = 0;
        for (var key in this.menuItems) {
            if (!this.menuItems.hasOwnProperty(key)) {
                continue;
            }

            var linearGradient = canvasContext.createLinearGradient(0,0,0,10);
            linearGradient.addColorStop(0, '#e2e2e2');
            linearGradient.addColorStop(1, '#d1d1d1');

            canvasContext.fillStyle = linearGradient;
            canvasContext.fillRect(310, (160 + (position * 30)), 180, 25);
            canvasContext.lineWidth = 3;
            if (this.menuItems[key].active) {
                canvasContext.setLineDash([30, 2]);
                canvasContext.lineDashOffset = this.ticker;
            }
            canvasContext.strokeStyle = '#ffffff';
            canvasContext.strokeRect(310, (160 + (position * 30)), 180, 25);
            canvasContext.setLineDash([]);

            switch (this.menuItems[key].type) {
                case 'button':
                    this.drawButtonContent(this.menuItems[key], position);
                    break;

                case 'toggler':
                    this.drawTogglerContent(this.menuItems[key], position);
                    break;
            }

            position++;
        }
    };

    this.drawButtonContent = function(menuItem, position) {
        canvasContext.fillStyle = '#ffffff';
        canvasContext.font = 'bold 16px Verdana';
        canvasContext.fillText(menuItem.name, 340, (178 + (position * 30)));
    };

    this.drawTogglerContent = function(menuItem, position) {
        canvasContext.fillStyle = '#ffffff';
        canvasContext.font = 'bold 16px Verdana';
        canvasContext.fillText(menuItem.name.replace('{state}', menuItem.states[menuItem.state]), 340, (178 + (position * 30)));
    };

    this.hideMenu = function() {
        this.isActive = false;
    };

    this.hover = function(e) {
        this.deActivateAll();

        var element = this.elementInRange(e.x, e.y);
        if (element !== null) {
            element.active = true;
        }

        this.drawMenu();
    };

    this.deActivateAll = function() {
        for (var key in this.menuItems) {
            if (!this.menuItems.hasOwnProperty(key)) {
                continue;
            }

            this.menuItems[key].active = false;
        };
    };

    this.click = function(e) {
        var element = this.elementInRange(e.x, e.y);
        if (element !== null) {
            element.click();
        }

        this.drawMenu();
    };

    this.elementInRange = function(x, y) {
        var position = 0;
        for (var key in this.menuItems) {
            if (x >= 310 && x <= 490 && y >= (166 + (position * 30)) && y <= (197 + (position * 30)) && this.menuItems[key].enabled) {
                return this.menuItems[key];
            }

            position++;
        }

        return null;
    };

    this.drawTicker = function() {
        setTimeout(function() {
            this.ticker--;
            this.drawMenu();
            this.drawTicker();
        }.bind(this), 50);
    };
}
