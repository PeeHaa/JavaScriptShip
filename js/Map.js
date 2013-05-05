function Map(canvasElement, canvasContext) {
    this.sector = 1;
    this.position = null;
    this.jumps = [];

    // used to move the border of the exit jump
    this.exitJumpDrawOffset = 0;

    this.drawEnabled = true;

    this.settings = {
        width: canvasElement.width,
        height: canvasElement.height,
        minJumps: 20,
        maxJumps: 30
    };

    this.generate = function(sector) {
        this.sector = sector;

        this.generateJumps();

        this.setStartingPosition();
        this.setExitPosition();

        this.draw();
        this.exitSpinner();

        return this;
    };

    this.draw = function() {
        this.addBackground();
        this.addHeader();
        this.addPaths();
        this.addJumps();
    };

    this.setStartingPosition = function() {
        var mostLeftJump = null,
            mostLeftJumpsInRange = [];

        for (var i = 0, l = this.jumps.length; i < l; i++) {
            var jump = this.jumps[i];

            if (mostLeftJump === null || jump.info.x < mostLeftJump.info.x) {
                mostLeftJump = jump;
            }

            if (jump.info.x <= Map.STARTING_POINT_RANGE) {
                mostLeftJumpsInRange.push(jump);
            }

            if (mostLeftJumpsInRange.length === 3) {
                break;
            }
        }

        if (mostLeftJumpsInRange.length > 0) {
            var startingJump = mostLeftJumpsInRange[ExtendedMath.rand(0, (mostLeftJumpsInRange.length - 1))];
        } else {
            var startingJump = mostLeftJump;
        }

        startingJump.info.environment = [];
        startingJump.info.events = [];
        startingJump.info.ships = [];
        startingJump.info.hasPlayer = true;

        this.position = startingJump;
    };

    this.setExitPosition = function() {
        var mostRightJump = null,
            mostRightJumpsInRange = [];

        for (var i = 0, l = this.jumps.length; i < l; i++) {
            var jump = this.jumps[i];

            if (mostRightJump === null || jump.info.x > mostRightJump.info.x) {
                mostRightJump = jump;
            }

            if (jump.info.x >= (this.settings.width - Map.EXIT_POINT_RANGE)) {
                mostRightJumpsInRange.push(jump);
            }

            if (mostRightJumpsInRange.length === 3) {
                break;
            }
        }

        if (mostRightJumpsInRange.length > 0) {
            var exitJump = mostRightJumpsInRange[ExtendedMath.rand(0, (mostRightJumpsInRange.length - 1))];
        } else {
            var exitJump = mostRightJump;
        }

        exitJump.info.isExit = true;
    };

    this.addBackground = function() {
        var linearGradient = canvasContext.createLinearGradient(0,0,0,150);

        linearGradient.addColorStop(0, '#203060');
        linearGradient.addColorStop(1, '#0F153C');

        canvasContext.fillStyle = linearGradient;
        canvasContext.fillRect(0, 0, this.settings.width, this.settings.height);
    };

    this.addHeader = function(sector) {
        canvasContext.fillStyle = '#ffffff';
        canvasContext.font = 'bold 16px Verdana';
        canvasContext.fillText('JShip v0.2: Sector ' + this.sector, 10, 25);
    };

    this.generateJumps = function() {
        var max = ExtendedMath.rand(this.settings.minJumps, this.settings.maxJumps);

        for (var i = 0; i < max; i++) {
            this.addRandomJump();
        }
    };

    this.addRandomJump = function() {
        //do {
            var x = ExtendedMath.rand(Map.MINIMUM_DISTANCE_TO_BORDERS, (this.settings.width - Map.MINIMUM_DISTANCE_TO_BORDERS)),
                y = ExtendedMath.rand(Map.MINIMUM_DISTANCE_TO_BORDERS, (this.settings.height - Map.MINIMUM_DISTANCE_TO_BORDERS));
        //} while (!this.isValidJump(x, y));

        this.jumps.push(new Jump(x, y));
    };

    this.isValidJump = function(x, y) {
        for (var i = 0, l = this.jumps.length; i < l; i++) {
            var jumpInfo = this.jumps[i].info;

            if (x > (jumpInfo.x - Map.MINIMUM_DISTANCE_BETWEEN_JUMPS) && x < (jumpInfo.x + Map.MINIMUM_DISTANCE_BETWEEN_JUMPS)) {
                return false;
            }

            if (y > (jumpInfo.y - Map.MINIMUM_DISTANCE_BETWEEN_JUMPS) && y < (jumpInfo.y + Map.MINIMUM_DISTANCE_BETWEEN_JUMPS)) {
                return false;
            }
        }

        return true;
    };

    this.addPaths = function() {
        this.jumps.forEach(function(jump) {
            if (jump.info.isActive) {
                this.showPaths(jump);
            }
        }.bind(this));
    };

    this.addJumps = function() {
        this.jumps.forEach(function(jump) {
            this.addJump(jump);
        }.bind(this));
    };

    this.addJump = function(jump) {
        canvasContext.beginPath();
        canvasContext.arc(jump.info.x, jump.info.y, 5, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = jump.info.visited ? '#e3e3e3' : '#ffffff';
        canvasContext.fillStyle = jump.info.hasPlayer ? '#000000' : canvasContext.fillStyle;
        canvasContext.fill();
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = jump.info.isActive ? '#ffd1e4' : '#00d1e4';
        canvasContext.strokeStyle = jump.info.visited ? '#3e3e3e' : canvasContext.strokeStyle;
        if (jump.info.isExit) {
            canvasContext.setLineDash([3, 2]);
            canvasContext.lineDashOffset = this.exitJumpDrawOffset;
        }
        canvasContext.stroke();
        canvasContext.setLineDash([]);
    };

    this.showPositionInfo = function(e) {
        this.jumps.forEach(function(jump) {
            if (jump.isInRange(e.x, e.y)) {
                jump.info.isActive = true;
            } else {
                jump.info.isActive = false;
            }
        });

        this.draw();
    };

    this.showPaths = function(activeJump) {
        this.jumps.forEach(function(jump) {
            if (jump.isInRangeForPath(activeJump.info.x, activeJump.info.y)) {
                this.addPath(activeJump, jump);
            }
        }.bind(this));
    };

    this.addPath = function(fromJump, toJump) {
        canvasContext.beginPath();
        canvasContext.lineWidth = 1;
        canvasContext.setLineDash([10, 2]);
        canvasContext.strokeStyle = '#22ff66';
        canvasContext.moveTo(fromJump.info.x, fromJump.info.y);
        canvasContext.lineTo(toJump.info.x, toJump.info.y);
        canvasContext.stroke();

        canvasContext.setLineDash([]);
    };

    this.isActiveJumpValid = function() {
        for (var i = 0, l = this.jumps.length; i < l; i++) {
            if (!this.jumps[i].info.isActive) {
                continue;
            }

            return this.position.isInRangeForPath(this.jumps[i].info.x, this.jumps[i].info.y);
        }

        return false;
    };

    this.moveToActiveJump = function() {
        for (var i = 0, l = this.jumps.length; i < l; i++) {
            var jump = this.jumps[i];

            if (jump.info.hasPlayer) {
                jump.info.visited = true;
            }

            jump.info.hasPlayer = false;

            if (this.jumps[i].info.isActive) {
                jump.info.hasPlayer = true;
                this.position = jump;
            }
        }

        this.draw();
    };

    this.exitSpinner = function() {
        setTimeout(function() {
            if (this.drawEnabled) {
                this.exitJumpDrawOffset++;
                this.draw();
            }
            this.exitSpinner();
        }.bind(this), 50);
    };

    this.pause = function() {
        this.drawEnabled = false;
    };

    this.resume = function() {
        this.drawEnabled = true;
    };
}

Map.MINIMUM_DISTANCE_BETWEEN_JUMPS = 30;
Map.MINIMUM_DISTANCE_TO_BORDERS = 15;
Map.STARTING_POINT_RANGE = 100;
Map.EXIT_POINT_RANGE = 100;
