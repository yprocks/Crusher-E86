module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _gameLabel:objects.Label;
    private _startButton:objects.Button;
    private _manual:objects.Button;
    private _bg: createjs.Bitmap;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(assetManager:createjs.LoadQueue, textureAtlas:createjs.SpriteSheet, currentScene:number) {
      super();
      this._assetManager = assetManager;
      this._textureAtlas = textureAtlas;
      this._currentScene = currentScene;
      this.Start();
    }
    // PRIVATE METHODS

    // PUBLIC METHODS
    public Start():void {
      this._gameLabel = new objects.Label("Crusher E86", "60px", "Audiowide", "#FFFF00", 40, 240, false);
      this._startButton = new objects.Button(this._textureAtlas, "startButton", 250, 340, true);
      this._manual = new objects.Button(this._textureAtlas, "manual", 250, 400, true);
      this._bg = new createjs.Bitmap("../../assets/images/image1.png");
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._bg);
      this.addChild(this._gameLabel);

      this.addChild(this._startButton);
      this.addChild(this._manual);

      this._startButton.on("click", () => {
        this._currentScene = config.PLAY;
        this.removeAllChildren();
      });

      this._manual.on("click", () => {
        this._currentScene = config.INSTRUCTIONS;
        this.removeAllChildren();
      });
    }
  }
}