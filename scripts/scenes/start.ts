module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _welcomeLabel:objects.Label;
    private _startButton:objects.Button;
    private _manual:objects.Button;
    private _bg: objects.Background;


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
      this._welcomeLabel = new objects.Label("Crusher E86", "60px", "orecrusher3d", "#FFFF00", 250, 260, true);
      this._startButton = new objects.Button(this._textureAtlas, "startButton", 250, 340, true);
      this._manual = new objects.Button(this._textureAtlas, "manual", 250, 400, true);
      this._bg = new objects.Background(this._assetManager, "bg1");
      this.Main();
    }

    public Update():number {
      this._bg.Update();
      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._bg);
      this.addChild(this._welcomeLabel);

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