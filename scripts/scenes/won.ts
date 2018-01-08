module scenes {
  export class Won extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _gameWonLabel:objects.Label;
    private _restartButton:objects.Button;
    private _menu: objects.Button;

    private _bg: objects.Background;

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
      this._gameWonLabel = new objects.Label("You Won", "60px", "orecrusher3d", "#FFFF00", 250, 260, true);
      this._restartButton = new objects.Button(this._textureAtlas, "restartButton", 250, 400, true);
      this._bg = new objects.Background(this._assetManager, "bg1");
      this.Main();
    }

    public Update():number {
      this._bg.Update();
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._bg);

      this.addChild(this._gameWonLabel);

      this.addChild(this._restartButton);
      this.addChild(this._menu);

      this._restartButton.on("click", () => {
        this._currentScene = config.PLAY;
        this.removeAllChildren();
      });

      this._menu.on("click", () => {
        this._currentScene = config.START;
        this.removeAllChildren();
      });
    }
  }
}
