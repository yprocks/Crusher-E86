module scenes {
  export class End extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _gameOverLabel:objects.Label;
    private _restartButton:objects.Button;

    private _ocean: objects.Background;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(assetManager:createjs.LoadQueue, textureAtlas:createjs.SpriteSheet, currentScene:number) {
      super();
      this._assetManager = assetManager;
      this._currentScene = currentScene;
      this._textureAtlas = textureAtlas;
      this.Start();
    }
    // PRIVATE METHODS

    // PUBLIC METHODS
    public Start():void {
      this._gameOverLabel = new objects.Label("Game Over", "60px", "orecrusher3d", "#FFFF00", 250, 260, true);
      this._restartButton = new objects.Button(this._textureAtlas, "restartButton", 250, 340, true);
      this._ocean = new objects.Background(this._assetManager, "bg1");
      this.Main();
    }

    public Update():number {
      this._ocean.Update();
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._ocean);

      this.addChild(this._gameOverLabel);

      this.addChild(this._restartButton);

      this._restartButton.on("click", () => {
        this._currentScene = config.PLAY;
        this.removeAllChildren();
      });
    }
  }
}
