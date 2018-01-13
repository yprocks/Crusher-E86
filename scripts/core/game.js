// IIFE - Immediately Invoked Function Expression
(function () {
    var stage;
    var canvas;
    var assetManager;
    var assetManifest = [
        { id: "bg1", src: "../../assets/images/greenbg.png" },
        { id: "bg2", src: "../../assets/images/bluebg.png" },
        { id: "bg3", src: "../../assets/images/redbg.png" },
        { id: "music", src: "../../assets/audio/gameMusic.mp3" },
        { id: "explosion", src: "../../assets/audio/explosion.wav" },
        { id: "laser", src: "../../assets/audio/laser.mp3" },
        { id: "enemylaser", src: "../../assets/audio/enemylaser.mp3" },
        { id: "buzzer", src: "../../assets/audio/buzzer.wav" },
        { id: "jet", src: "../../assets/images/ship.png" }
    ];
    var textureAtlasData = {
        "images": [
            "../../Assets/spritesheets/SpriteCrusher.png"
        ],
        "frames": [
            [120, 1, 12, 30, 0, 0, 0],
            [1, 90, 90, 60, 0, 0, 0],
            [170, 1, 330, 310, 0, 0, 0],
            [1, 1, 100, 65, 0, 0, 0],
            [1, 500, 180, 50, 0, 0, 0],
            [1, 440, 150, 50, 0, 0, 0],
            [7, 160, 95, 95, 0, 0, 0],
            [7, 260, 90, 95, 0, 0, 0],
            [7, 355, 90, 90, 0, 0, 0],
            [120, 40, 12, 30, 0, 0, 0],
            [1, 550, 180, 50, 0, 0, 0],
            [1, 610, 140, 50, 0, 0, 0],
            [200, 335, 120, 125, 0, 0, 0],
            [330, 335, 120, 125, 0, 0, 0],
            [460, 335, 120, 125, 0, 0, 0],
            [590, 335, 120, 125, 0, 0, 0],
            [200, 460, 120, 125, 0, 0, 0],
            [320, 460, 120, 125, 0, 0, 0],
            [450, 460, 120, 125, 0, 0, 0],
            [580, 460, 120, 125, 0, 0, 0],
            [200, 585, 120, 125, 0, 0, 0],
            [330, 585, 120, 125, 0, 0, 0],
            [460, 585, 120, 125, 0, 0, 0],
            [590, 585, 120, 125, 0, 0, 0]
        ],
        "animations": {
            "explosion": {
                frames: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                //next: "clearAnim",
                speed: 0.01
            },
            "clearAnim": {
                frames: [23]
            },
            "enemybullet": { "frames": [0] },
            "enemy": { "frames": [1] },
            "boss": { "frames": [2] },
            "plane": { "frames": [3] },
            "restartButton": { "frames": [4] },
            "startButton": { "frames": [5] },
            "life": { "frames": [7] },
            "singun": { "frames": [8] },
            "shield": { "frames": [6] },
            "bullet": { "frames": [9] },
            "manual": { "frames": [10] },
            "menu": { "frames": [11] }
        }
    };
    var textureAtlas;
    var currentScene;
    var currentState;
    function Init() {
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.on("complete", Start);
        assetManager.loadManifest(assetManifest);
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
    }
    function Start() {
        canvas = document.getElementById(Strings.CANVAS_NAME);
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        currentState = config.START;
        Main();
    }
    function Update() {
        var newState = currentScene.Update();
        if (newState != currentState) {
            currentState = newState;
            Main();
        }
        stage.update();
    }
    function Main() {
        stage.removeAllChildren();
        switch (currentState) {
            case config.START:
                currentScene = new scenes.Start(assetManager, textureAtlas, currentState);
                break;
            case config.PLAY:
                currentScene = new scenes.Play(assetManager, textureAtlas, currentState);
                break;
            case config.INSTRUCTIONS:
                currentScene = new scenes.Instructions(assetManager, textureAtlas, currentState);
                break;
            case config.WON:
                currentScene = new scenes.Won(assetManager, textureAtlas, currentState);
                break;
            case config.END:
                currentScene = new scenes.End(assetManager, textureAtlas, currentState);
                break;
        }
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map