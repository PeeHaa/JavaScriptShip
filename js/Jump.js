function Jump(x, y) {
    this.info = {
        x: x,
        y: y,
        environment: [],
        ships: [],
        hasPlayer: false,
        isActive: false
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
}

Jump.MAXIMUM_DISTANCE_FOR_PATH = 150;
