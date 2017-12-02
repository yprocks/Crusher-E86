// //IIFE - Immediately invoked function expression 
// (function () {

//     let stage: createjs.Stage;
//     let canvas: any;
//     let helloLabel: createjs.Text;
//     let circle: createjs.Shape;
//     let circle2: createjs.Shape;
//     let circle3: createjs.Shape;
//     let box: createjs.Shape;
//     let gun: createjs.Shape;
//     let i: number;

//     function Init() {
//         Start();
//     }

//     function Start() {
//         canvas = document.getElementById(Strings.CANVAS_NAME);
//         stage = new createjs.Stage(canvas);
//         createjs.Ticker.framerate = 60;
//         createjs.Ticker.on("tick", Update);
//         Main();
//     }

//     function Update() {
//         circle.x = -Math.sin(i) * 40 + 200; // * PHASE + OFFSET
//         circle.y = -i * 22 + 400;

//         circle2.x = Math.sin(i) * 40 + 200;
//         circle2.y = -i * 22 + 400;

//         circle3.x -= 5;
//         circle3.y -= 5;
//         i += 0.1;
//         stage.update();
//     }

//     function Main() {
//         i = 0;
//         helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
//         // helloLabel.y = 400;

//         circle = new createjs.Shape();
//         circle.graphics.beginFill("black").drawCircle(0, 0, 8);
//         circle.y = 400;
//         circle.x = 200;

//         circle2 = new createjs.Shape();
//         circle2.graphics.beginFill("black").drawCircle(0, 0, 8);
//         circle2.y = 400;
//         circle2.x = 200;

//         circle3 = new createjs.Shape();
//         circle3.graphics.beginFill("black").drawCircle(0, 0, 8);
//         circle3.y = 400;
//         circle3.x = 200;

//         box = new createjs.Shape();
//         box.graphics.beginFill("#000FFF");
//         box.graphics.drawRect(0, 0, 60, 50);
//         box.graphics.endFill();
//         box.y = 430 + 5;
//         box.x = 200 - 30;

//         gun = new createjs.Shape();
//         gun.graphics.beginFill("#00AA00");
//         gun.graphics.drawRect(0, 0, 16, 24);
//         gun.graphics.endFill();
//         gun.y = 406 + 5;
//         gun.x = 200 - 8;

//         stage.addChild(box);
//         stage.addChild(gun);
//         stage.addChild(circle);
//         stage.addChild(circle3);
//         stage.addChild(circle2);
//     }

//     window.onload = Init;

// })();

// IIFE - Immediately Invoked Function Expression
(function () {
  let stage: createjs.Stage;
  let canvas: any;
  let assetManager: createjs.LoadQueue;
  let assetManifest = [
    { id: "ocean", src: "../../assets/greenbg.png" },
    { id: "music", src: "../../assets/audio/gameMusic.mp3" },
    //{ id: "thunder", src: "../../assets/audio/thunder.ogg" },
    { id: "explosion", src: "../../assets/audio/explosion.wav" },
    { id: "laser", src: "../../assets/audio/laser.mp3" },
    { id: "jet", src: "../../assets/ship.png" }    
  ];

  let textureAtlasData = {

    "images": [
      "../../Assets/spritesheets/SpriteCrusher.png"
    ],

    "frames": [
      [120, 1, 12, 30, 0, 0, 0],
      [1, 90, 80, 60, 0, 0, 0],
      [1, 181, 62, 63, 0, 0, 0],
      [1, 1, 100, 65, 0, 0, 0],
      [1, 460, 180, 60, 0, 0, 0],
      [1, 400, 150, 60, 0, 0, 0],
      [200, 335, 120, 125, 0, 0, 0],
      [330, 335, 120, 125, 0, 0, 0],
      [460, 335, 120, 125, 0, 0, 0],
      [590, 335, 120, 125, 0, 0, 0],
      [200, 460, 120, 125, 0, 0, 0],
      [320, 460, 120, 125, 0, 0, 0],
      [420, 460, 120, 125, 0, 0, 0],
      [520, 460, 120, 125, 0, 0, 0],
      [200, 585, 120, 125, 0, 0, 0],
      [330, 585, 120, 125, 0, 0, 0],
      [460, 585, 120, 125, 0, 0, 0],
      [590, 585, 120, 125, 0, 0, 0]
    ],

    "animations": {
      "explosion": {
        frames: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        //next: "clearAnim",
        speed: 0.01
      },
      "clearAnim": {
        frames: [17]
      },
      "bullet": { "frames": [0] },
      "cloud": { "frames": [1] },
      "island": { "frames": [2] },
      "plane": { "frames": [3] },
      "restartButton": { "frames": [4] },
      "startButton": { "frames": [5] }
    }
  };

  let textureAtlas: createjs.SpriteSheet;

  let currentScene: objects.Scene;
  let currentState: number;

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
    let newState = currentScene.Update();
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

      case config.END:
        currentScene = new scenes.End(assetManager, textureAtlas, currentState);
        break;
    }

    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
