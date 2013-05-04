function Map(canvasElement, canvasContext) {
    this.sector = 1;
    this.position = null;
    this.jumps = [];

    this.settings = {
        width: canvasElement.width,
        height: canvasElement.height,
        minJumps: 20,
        maxJumps: 30
    };

    this.generate = function(sector) {
        this.sector = sector;

        this.generateJumps();

        this.draw();

        return this;
    };

    this.draw = function() {
        this.addBackground();
        this.addHeader();
        this.addPaths();
        this.addJumps();
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
        canvasContext.fillText('Sector ' + this.sector, 10, 25);
    };

    this.generateJumps = function() {
        var max = ExtendedMath.rand(this.settings.minJumps, this.settings.maxJumps);

        for (var i = 0; i < max; i++) {
            this.addRandomJump();
        }

        this.addJumps();
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
        canvasContext.fillStyle = jump.info.hasPlayer ? '#000000' : '#ffffff';
        canvasContext.fill();
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = jump.info.isActive ? '#ffd1e4' : '#00d1e4';
        canvasContext.stroke();
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
}

Map.MINIMUM_DISTANCE_BETWEEN_JUMPS = 30;
Map.MINIMUM_DISTANCE_TO_BORDERS = 15;
