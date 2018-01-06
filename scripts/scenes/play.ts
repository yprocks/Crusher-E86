module scenes {
  export class Play extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _assetManager: createjs.LoadQueue;
    private _textureAtlas: createjs.SpriteSheet;

    private _plane: objects.Plane;
    private _bg: objects.Background;
    //private _island: objects.Island;
    private _clouds: objects.Cloud[];
    private _cloudNum: number;

    private _bullets: objects.Bullet[];
    private _bulletNum: number;
    private _bulletCounter: number;

    private _livesLabel: objects.Label;
    private _scoreLabel: objects.Label;

    private _lives: number;
    private _score: number;

    private _explosion: objects.Explosion[];
    private _explosionNum: number;
    private _explosionCounter: number;

    private _gameMusic: createjs.AbstractSoundInstance;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(assetManager: createjs.LoadQueue, textureAtlas: createjs.SpriteSheet, currentScene: number) {
      super();
      this._assetManager = assetManager;
      this._currentScene = currentScene;
      this._textureAtlas = textureAtlas;

      this._bulletFire = this._bulletFire.bind(this);

      this.Start();
    }
    // PRIVATE METHODS

    // PUBLIC METHODS
    public Start(): void {

      this._gameMusic = createjs.Sound.play("music");
      this._gameMusic.volume = 0.20;
      this._gameMusic.loop = -1;

      this._plane = new objects.Plane(this._textureAtlas);
      this._bg = new objects.Background(this._assetManager);
      //this._island = new objects.Island(this._textureAtlas);

      this._bulletNum = 50;
      this._bullets = new Array<objects.Bullet>();
      this._bulletCounter = 0;

      this._explosionNum = 10;
      this._explosion = new Array<objects.Explosion>();
      this._explosionCounter = 0;

      this._cloudNum = 3;
      this._clouds = new Array<objects.Cloud>();

      this._lives = 5;
      this._score = 0;

      this._livesLabel = new objects.Label("Lives: " + this._lives, "26px", "orecrusher3d", "#FFFF00", 10, 10, false);
      this._scoreLabel = new objects.Label("Score: " + this._score, "26px", "orecrusher3d", "#FFFF00", 300, 10, false);

      this.Main();
    }

    public Update(): number {
      this._plane.Update();
      this._bg.Update();
      //this._island.Update();
      //this._checkCollision(this._island);

      this._bullets.forEach(bullet => {
        bullet.Update();
        bullet._checkCollision(this._clouds);
      });

      this._clouds.forEach(cloud => {
        cloud.Update();
        this._checkCollision(cloud);
      });

      this._explosion.forEach(explosion => {
        explosion.Update();
      });

      return this._currentScene;
    }

    public Main(): void {
      this.addChild(this._bg);
      //this.addChild(this._island);
      this.addChild(this._plane);

      for (let count = 0; count < this._bulletNum; count++) {
        this._bullets[count] = new objects.Bullet(this._textureAtlas, this);
        this.addChild(this._bullets[count]);
      }

      for (let count = 0; count < this._cloudNum; count++) {
        this._clouds[count] = new objects.Cloud(this._textureAtlas);
        this.addChild(this._clouds[count]);
      }

      for (let count = 0; count < this._explosionNum; count++) {
        this._explosion[count] = new objects.Explosion(this._textureAtlas);
        this.addChild(this._explosion[count]);
      }


      this.addChild(this._livesLabel);
      this.addChild(this._scoreLabel);

      //window.addEventListener("mousedown", () => {this._bulletFire()});
      window.addEventListener("mousedown", this._bulletFire);

    }

    private _bulletFire(): void {
      
      this._bullets[this._bulletCounter].x = this._plane.bulletSpawn.x;
      this._bullets[this._bulletCounter].y = this._plane.bulletSpawn.y;
      
      var instance = createjs.Sound.play("laser");
      instance.volume = 0.5;

      this._bulletCounter++;
      console.log(this._bulletCounter);
      if (this._bulletCounter >= this._bulletNum - 1) {
        this._bulletCounter = 0;
      }
    }

    private _movement(event: KeyboardEvent): void {
      var key = event.which || event.keyCode;
      switch (key) {
        case 37:
          break;
        case 39:
          break;
        default:
          break;
      }

    }

    public createExplosion(x: number, y: number): void {
      this._explosion[this._explosionCounter].x = x;
      this._explosion[this._explosionCounter].y = y;
      
      this._explosion[this._explosionCounter].gotoAndPlay(6);
      // this._explosion[this._explosionCounter].gotoAndStop(17);

      this._explosionCounter++;
      if (this._explosionCounter >= this._explosionNum - 1)
        this._explosionCounter = 0;
    }


    private _checkCollision(other: objects.GameObject) {
      let P1: createjs.Point = new createjs.Point(this._plane.x, this._plane.y);
      let P2: createjs.Point = other.position;

      // compare the distance between P1 and P2 is less than half the height of each object
      if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
        (this._plane.halfHeight + other.halfHeight)) {
        if (!other.isColliding) {
          if (other.name == "island") {
            this._score += 100;
            this._scoreLabel.text = "Score: " + this._score;
            var instance = createjs.Sound.play("explosion");
            instance.volume = 0.5;
          }

          if (other.name == "cloud") {
            this._lives -= 1;

            if (this._lives <= 0) {
              this._currentScene = config.END;
              this._gameMusic.stop();
              window.removeEventListener("mousedown", this._bulletFire);
              this.removeAllChildren();
            }
            var instance = createjs.Sound.play("explosion");
            instance.volume = 0.5;
            this._livesLabel.text = "Lives: " + this._lives;

            var enemy = other as objects.Cloud;
            enemy.destroy();
            this.createExplosion(this._plane.x, this._plane.y);
          }
          
          other.isColliding = true;
        }
      } else {
        other.isColliding = false;
      }

    }

    public UpdateScore(score: number): void {
      this._score += 100;
      this._scoreLabel.text = "Score: " + this._score;
    }

  }
}
