module scenes {
  export class Instructions extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _welcomeLabel:objects.Label;
    private _menu:objects.Button;
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
      this._menu = new objects.Button(this._textureAtlas, "menu", 250, 340, true);
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

      this.addChild(this._menu);

      this._menu.on("click", () => {
        this._currentScene = config.START;
        this.removeAllChildren();
      });

    }
  }
}