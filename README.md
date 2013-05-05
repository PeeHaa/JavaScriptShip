JS: JavaScript Ship
=

JavaScript FTL clone

Status
-

I'm currently implementing the battles. The goal it to have a working clone at some point.

Currently implemented features:

- connected nodes
- exit node (spinning node)
- visited nodes (gray border)
- player (black fill)
- basic menu (new game & toggle music)
- jumpnig to nodes in range

To check out the progress of the project see the [live demo][demo] (auto play sound warning).

Simple usage
-

If you simply want to add this game to your website just [download the minified version][minified] and include it somewhere on your page:

    <script src="/js/js-javascriptship.min.js"></script>

Once the game file is included make sure you have a canvas element somewhere on the page:

    <canvas id="playfield" width="800" height="600"></canvas>

And finally run the game:

    (function() {
        var gameEngine = new GameEngine(document.getElementById('playfield'));
        gameEngine.newGame();
    }());

If you want to include the music download [the theme][theme] and add it to your document root.

Contributing / hacking
-

If you clone the repository you will have a working and unminified version out of the box.

Idea
-

I was talking to [DrSiemer][drsiemer] about this when drinking a beer. And sure enough a couple days later I got a first draft in my inbox.

[demo]:https://jship.pieterhordijk.com/
[minified]:https://raw.github.com/PeeHaa/JavaScriptShip/master/js/js-javascriptship.min.js
[theme]:https://github.com/PeeHaa/JavaScriptShip/blob/master/JShipTheme%203.ogg?raw=true
[drsiemer]:https://github.com/DrSiemer