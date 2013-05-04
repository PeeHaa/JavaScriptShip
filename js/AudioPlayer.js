function AudioPlayer() {
    this.audioPlayer = new Audio('/JShipTheme 3.ogg');

    this.play = function() {
        this.audioPlayer.volume = .1;
        this.audioPlayer.loop = true;
        this.audioPlayer.play();

        return this;
    };
}