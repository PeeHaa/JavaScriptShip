function Jump(x, y) {
    this.info = {
        x: x,
        y: y,
        environment: [],
        events: [],
        ships: [],
        hasPlayer: false,
        isActive: false
    };

    this.randomItemGenerator = new RandomItemGenerator();

    this.initialize = function() {
        this.setRandomEnvironment();
        this.setRandomEvent();
    };

    this.setRandomEnvironment = function() {
        this.info.environment.push(this.randomItemGenerator.getRandomItem({
            normal: 15,
            solar: 2,
            astroid: 2
        }));
    };

    this.setRandomEvent = function() {
        this.info.events.push(this.randomItemGenerator.getRandomItem({
            none: 15
        }));
    };

    this.isInRange = function(x, y) {
        if (x > this.info.x && x < (this.info.x + 15) && y > this.info.y && y < (this.info.y + 15)) {
            return true;
        }

        return false;
    };

    this.isInRangeForPath = function(x, y) {
        if (x > (this.info.x - Jump.MAXIMUM_DISTANCE_FOR_PATH) && x < (this.info.x + Jump.MAXIMUM_DISTANCE_FOR_PATH) && y > (this.info.y - Jump.MAXIMUM_DISTANCE_FOR_PATH) && y < (this.info.y + Jump.MAXIMUM_DISTANCE_FOR_PATH)) {
            return true;
        }

        return false;
    };

    this.initialize();
}

Jump.MAXIMUM_DISTANCE_FOR_PATH = 150;
