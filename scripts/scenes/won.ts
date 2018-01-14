module scenes {
  export class Won extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _youWonLabel:objects.Label;
    private _restartButton:objects.Button;
    private _menu: objects.Button;
    
    private _bg: createjs.Bitmap;

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
      this._youWonLabel = new objects.Label("You Won", "60px", "Audiowide", "#FFFF00", 110, 240, false);
      this._restartButton = new objects.Button(this._textureAtlas, "restartButton", 250, 340, true);
      this._menu = new objects.Button(this._textureAtlas, "menu", 250, 400, true);
      this._bg = new createjs.Bitmap("../../assets/images/image2.png");
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {

      this.addChild(this._bg);
    
      this.addChild(this._youWonLabel);

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
