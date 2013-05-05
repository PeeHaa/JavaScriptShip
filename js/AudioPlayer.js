function AudioPlayer(settings) {
    this.audioPlayer = new Audio('/JShipTheme 3.ogg');

    this.play = function() {
        if (!settings.values.music.enabled) {
            return this;
        }

        this.audioPlayer.volume = (settings.values.music.volume / 100);
        this.audioPlayer.loop = true;

        this.audioPlayer.play();

        return this;
    };

    this.stop = function() {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
    };
}
