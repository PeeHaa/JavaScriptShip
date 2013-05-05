function Battle(canvasElement, canvasContext) {
    this.jump = {};

    this.settings = {
        width: canvasElement.width,
        height: canvasElement.height
    };

    this.generate = function(jump) {
        this.jump = jump;

        this.draw();

        return this;
    };

    this.draw = function() {
        this.addBackground();
        this.addEnvironment();
        this.addShipInfo();
    };

    this.addBackground = function() {
        var linearGradient = canvasContext.createLinearGradient(0,0,0,150);

        linearGradient.addColorStop(0, '#203060');
        linearGradient.addColorStop(1, '#0F153C');

        canvasContext.fillStyle = linearGradient;
        canvasContext.fillRect(0, 0, this.settings.width, this.settings.height);
    };

    this.addEnvironment = function() {
        console.log('environment: ' + this.jump.info.environment);
    };

    this.addShipInfo = function() {
        this.addHullHealth();
        this.addShieldInfo();
        this.addPowerBars();
    };

    this.addHullHealth = function() {
        canvasContext.beginPath();
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = '#ffffff';
        canvasContext.moveTo(10, 10);
        canvasContext.lineTo(312, 10);
        canvasContext.lineTo(312, 35);
        canvasContext.lineTo(210, 35);
        canvasContext.lineTo(200, 30);
        canvasContext.lineTo(110, 30);
        canvasContext.lineTo(100, 25);
        canvasContext.lineTo(10, 25);
        canvasContext.lineTo(10, 10);
        canvasContext.stroke();

        for (var i = 0; i < 30; i++) {
            var group = Math.floor(i / 10);
            var extraHeight = 0;
            if ((i % 10) === 9 && group < 2) {
                extraHeight = 5;
            }

            canvasContext.beginPath();
            canvasContext.fillStyle = '#00ff00';
            canvasContext.moveTo((12 + (10 * i)), 12);
            canvasContext.lineTo((20 + (10 * i)), 12);
            canvasContext.lineTo((20 + (10 * i)), (23 + extraHeight + (5 * group)));
            canvasContext.lineTo((12 + (10 * i)), (23 + (5 * group)));
            canvasContext.lineTo((12 + (10 * i)), (12 + (5 * group)));
            canvasContext.fill();
        }
    };

    this.addShieldInfo = function() {
        canvasContext.beginPath();
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = '#ffffff';
        canvasContext.moveTo(10, 30);
        canvasContext.lineTo(100, 30);
        canvasContext.lineTo(110, 35);
        canvasContext.lineTo(110, 50);
        canvasContext.lineTo(10, 50);
        canvasContext.lineTo(10, 30);
        canvasContext.stroke();

        for (var i = 0; i < 4; i++) {
            canvasContext.beginPath();
            canvasContext.arc((22 + (22 * i)), 40, 7, 0, 2 * Math.PI, false);
            canvasContext.fillStyle = '#0000ff';
            canvasContext.fill();
            canvasContext.strokeStyle = '#0000ff';
            canvasContext.stroke();
        }
    };

    this.addPowerBars = function() {
        for (var i = 0; i < 20; i++) {
            canvasContext.beginPath();
            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = '#ffffff';
            canvasContext.moveTo(10, (this.settings.height - 10 - (i * 20)));
            canvasContext.lineTo(60, (this.settings.height - 10 - (i * 20)));
            canvasContext.lineTo(60, (this.settings.height - 25 - (i * 20)));
            canvasContext.lineTo(10, (this.settings.height - 25 - (i * 20)));
            canvasContext.lineTo(10, (this.settings.height - 10 - (i * 20)));
            canvasContext.stroke();
        }

        for (var i = 0; i < 20; i++) {
            canvasContext.beginPath();
            canvasContext.lineWidth = 1;
            canvasContext.moveTo(12, (this.settings.height - 12 - (i * 20)));
            canvasContext.lineTo(58, (this.settings.height - 12 - (i * 20)));
            canvasContext.lineTo(58, (this.settings.height - 23 - (i * 20)));
            canvasContext.lineTo(12, (this.settings.height - 23 - (i * 20)));
            canvasContext.lineTo(12, (this.settings.height - 12 - (i * 20)));
            canvasContext.fillStyle = '#00ff00';
            canvasContext.fill();
        }
    };
}
