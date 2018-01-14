module scenes {
  export class Instructions extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager:createjs.LoadQueue;
    private _textureAtlas:createjs.SpriteSheet;

    private _mouseInstString: string;
    private _enemyInstString: string;
    private _powerUpInstString: string;
    private _levelInstString: string;
    
    private _welcomeLabel:objects.Label;
    private _menu:objects.Button;
    private _bg: objects.Background;
    
    private _instructions1Mouse: objects.Label;
    private _instructions2Mouse: objects.Label;
    private _instructionsPowerUps: objects.Label;
    private _instructions1Level: objects.Label;
    private _instructions2Level: objects.Label;
    private _instructionsBoss: objects.Label;

    private _sinGun: objects.SinGun;
    private _sinGunLabel: objects.Label;

    private _lives: objects.Lives;
    private _livesLabel: objects.Label;

    private _shield: objects.Shield;
    private _shieldLabel: objects.Label;

    private _sinGunHelpLabel: objects.Label;
    private _livesHelpLabel: objects.Label;
    private _shieldHelpLabel: objects.Label;

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
      this._welcomeLabel = new objects.Label("Crusher E86", "60px", "Audiowide", "#FFFF00", 250, 50, true);
      this._menu = new objects.Button(this._textureAtlas, "menu", 250, 580, true);
      this._bg = new objects.Background(this._assetManager, "instructions");
      this._bg.staticBg();
      this._instructions1Mouse = new objects.Label("Move Mouse to move left and right", "20px", "Audiowide", "#FFFF00", 60, 100, false);
      this._instructions2Mouse = new objects.Label("Shoot with Mouse 1 (Fire 1) ", "20px", "Audiowide", "#FFFF00", 120, 150, false);
      this._instructions1Level = new objects.Label("Kill 20 Enemies to advance to next level", "20px", "Audiowide", "#FFFF00", 30, 200, false);
      this._instructions2Level = new objects.Label("Power ups available from Level 2", "20px", "Audiowide", "#FFFF00", 70, 250, false);
      this._instructionsBoss = new objects.Label("Kill Boss at level 3 to win the game", "20px", "Audiowide", "#FFFF00", 60, 300, false);
      this._instructionsPowerUps = new objects.Label("Power ups", "20px", "Audiowide", "#FFFF00", 190, 350, false);
     
      this._sinGun = new objects.SinGun(this._textureAtlas);
      this._sinGun.display(100, 430);
      this._sinGunLabel = new objects.Label("SinGun", "20px", "Audiowide", "#FFFF00", 60, 480, false);

      this._lives = new objects.Lives(this._textureAtlas);
      this._lives.display(250, 430);
      this._livesLabel = new objects.Label("Lives", "20px", "Audiowide", "#FFFF00", 220, 480, false);

      this._shield = new objects.Shield(this._textureAtlas);
      this._shield.display(400, 420);
      this._shieldLabel = new objects.Label("Shield", "20px", "Audiowide", "#FFFF00", 365, 480, false);

      this._sinGunHelpLabel = new objects.Label("New gun (10 sec)", "14px", "Audiowide", "#FFFF00", 30, 520, false);
      this._livesHelpLabel = new objects.Label("Life up by 1", "14px", "Audiowide", "#FFFF00", 210, 520, false);
      this._shieldHelpLabel = new objects.Label("Unbeateable (10 sec)", "14px", "Audiowide", "#FFFF00", 320, 520, false);

      this.Main();
    }

    public Update():number {
      // this._bg.Update();
      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._bg);
      this.addChild(this._welcomeLabel);
      this.addChild(this._instructions1Mouse);
      this.addChild(this._instructions2Mouse);
      this.addChild(this._instructions1Level);
      this.addChild(this._instructions2Level);
      this.addChild(this._instructionsBoss);
      this.addChild(this._instructionsPowerUps);

      this.addChild(this._sinGun);
      this.addChild(this._sinGunLabel);
      
      this.addChild(this._lives);
      this.addChild(this._livesLabel);

      this.addChild(this._shield);
      this.addChild(this._shieldLabel);

      this.addChild(this._sinGunHelpLabel);
      this.addChild(this._livesHelpLabel);
      this.addChild(this._shieldHelpLabel);

      this.addChild(this._menu);

      this._menu.on("click", () => {
        this._currentScene = config.START;
        this.removeAllChildren();
      });

    }
  }
}