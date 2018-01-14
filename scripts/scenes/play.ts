module scenes {
  export class Play extends objects.Scene {

    public totalBossKill: number;
    private bossHit: number;
    private healthBar: number;

    private hasSinGun: boolean;
    // PRIVATE INSTANCE VARIABLES
    private _assetManager: createjs.LoadQueue;
    private _textureAtlas: createjs.SpriteSheet;

    private _shieldPower: objects.Shield;
    private _livesPower: objects.Lives;
    private _singunPower: objects.SinGun;

    private _plane: objects.Plane;
    private _bg: objects.Background;

    private _bossKilled: boolean;
    private _enemies: objects.Enemy[];
    private _enemyNum: number;

    private _levelEnemyCount: number;
    private _playerEnemyKill: number;
    public _currentLevel: number;

    private _bullets: objects.Bullet[];
    private _bulletNum: number;
    private _bulletCounter: number;

    private _enemybullets: objects.EnemyBullet[];
    private _enemybulletNum: number;

    private _livesLabel: objects.Label;
    private _scoreLabel: objects.Label;
    private _tickerLabel: objects.Label;
    private _levelLabel: objects.Label;

    private _lives: number;
    private _score: number;

    private _explosion: objects.Explosion[];
    private _explosionNum: number;
    private _explosionCounter: number;

    private _hasShield: boolean;

    private _frameDelay: number;
    private _curFrame: number;

    private _gameMusic: createjs.AbstractSoundInstance;

    private _canSpawnPowerUps: boolean;
    private _powerUpTimer: number;
    private _ticker: number;

    private _boss: objects.Boss;

    private bossHealth: createjs.Shape;

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

      this._levelEnemyCount = 20;

      this._playerEnemyKill = 0;
      this._currentLevel = 1;

      this.totalBossKill = 50;
      this.bossHit = 0;

      this._tickerLabel = null;
      this._ticker = 0;
      this._powerUpTimer = 10;

      this._bossKilled = false;
      this._hasShield = false;
      this.hasSinGun = false;
      this.healthBar = 500;

      this._gameMusic = createjs.Sound.play("music");
      this._gameMusic.volume = 0.20;
      this._gameMusic.loop = -1;

      this._plane = new objects.Plane(this._textureAtlas);
      this._bg = new objects.Background(this._assetManager, "bg1");

      this._shieldPower = new objects.Shield(this._textureAtlas, this);
      this._livesPower = new objects.Lives(this._textureAtlas, this);
      this._singunPower = new objects.SinGun(this._textureAtlas, this);

      this._enemybulletNum = 50;
      // this._enemybullets = new Array<objects.OtherBullet>();

      this._bulletNum = 150;
      this._bullets = new Array<objects.Bullet>();
      this._bulletCounter = 0;

      this._explosionNum = 40;
      this._explosion = new Array<objects.Explosion>();
      this._explosionCounter = 0;

      this._enemyNum = 3;
      this._enemies = new Array<objects.Enemy>();

      this._lives = 5;
      this._score = 0;

      this._frameDelay = (Math.random() * 100) + 480;
      this._curFrame = 0;

      this._livesLabel = new objects.Label("Lives: " + this._lives, "26px", "Audiowide", "#FFFF00", 10, 10, false);
      this._scoreLabel = new objects.Label("Score: " + this._score, "26px", "Audiowide", "#FFFF00", 300, 10, false);
      this._levelLabel = new objects.Label("Level: " + this._currentLevel, "20px", "Audiowide", "#FFFF00", 10, 40, false);

      this._boss = new objects.Boss(this._textureAtlas, this);

      this._canSpawnPowerUps = true;

      this.Main();
    }

    public Update(): number {
      this._plane.Update();
      this._bg.Update();

      this._boss.Update();

      this._bullets.forEach(bullet => {
        bullet.Update();
        bullet._checkCollision(this._enemies);
        if (this._currentLevel == 3)
          bullet._checkBossCollision(this._boss);
      });

      if (this._currentLevel != 3) {
        this._enemies.forEach(enemy => {
          enemy.Update();
          this._checkCollision(enemy);
          enemy._checkCollisionWithin(this._enemies);
        });
      }

      this._explosion.forEach(explosion => {
        explosion.Update();
      });

      this._shieldPower.Update();
      this._livesPower.Update();
      this._singunPower.Update();

      if (this._canSpawnPowerUps && this._currentLevel > 1) {
        this._curFrame++;
        if (this._curFrame >= this._frameDelay) {
          this._curFrame = 0;
          this._frameDelay = (Math.random() * 100) + 800;
          this._spawnRandomPowerUps();
        }
      }

      this._ticker++;
      if (this._ticker >= 60) {
        this._ticker = 0;
        this.updateTicker(-1);
      }
      return this._currentScene;
    }

    private _spawnRandomPowerUps(): void {
      var random = Math.random() * 3;
      if (random < 1) {
        this._singunPower._startMoving = true;
      }
      else if (random < 2) {
        this._livesPower._startMoving = true;
      }
      else if (random < 3) {
        this._shieldPower._startMoving = true;
      }
      this._canSpawnPowerUps = false; // lock powerups
    }

    public Main(): void {
      this.addChild(this._bg);
      this.addChild(this._plane);

      for (let count = 0; count < this._bulletNum; count++) {
        this._bullets[count] = new objects.Bullet(this._textureAtlas, this);
        this.addChild(this._bullets[count]);
      }

      for (let count = 0; count < this._enemyNum; count++) {
        this._enemies[count] = new objects.Enemy(this._textureAtlas, this);
        this.addChild(this._enemies[count]);
      }

      for (let count = 0; count < this._explosionNum; count++) {
        this._explosion[count] = new objects.Explosion(this._textureAtlas);
        this.addChild(this._explosion[count]);
      }

      //this.addChild(this._boss);

      this.addChild(this._livesPower);
      this.addChild(this._shieldPower);
      this.addChild(this._singunPower);

      this.addChild(this._livesLabel);
      this.addChild(this._scoreLabel);
      this.addChild(this._levelLabel);


      //window.addEventListener("mousedown", () => {this._bulletFire()});
      window.addEventListener("mousedown", this._bulletFire);
    }

    private _bulletFire(): void {

      this._bullets[this._bulletCounter].x = this._plane.bulletSpawn.x;
      this._bullets[this._bulletCounter].y = this._plane.bulletSpawn.y;

      var instance = createjs.Sound.play("laser");
      instance.volume = 0.5;

      this._bulletCounter++;
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

      this._explosion[this._explosionCounter].gotoAndPlay(12);
      // this._explosion[this._explosionCounter].gotoAndStop(23);

      this._explosionCounter++;
      if (this._explosionCounter >= this._explosionNum - 1)
        this._explosionCounter = 0;
    }

    private startTicker(): void {
      this._tickerLabel = new objects.Label("Time: " + this._powerUpTimer, "26px", "Audiowide", "#FFFF00", 160, 10, false);
      this.addChild(this._tickerLabel);
    }

    private updateTicker(seconds: number): void {
      if (this._tickerLabel != null) {
        this._powerUpTimer += seconds;
        this._tickerLabel.text = "Time: " + this._powerUpTimer;
        if (this._powerUpTimer <= 0) {
          this.endTicker();
        }
      }
    }

    private endTicker(): void {
      if (this._tickerLabel != null) {
        this.removeChild(this._tickerLabel);
        this._tickerLabel = null;
      }
      this._powerUpTimer = 10;
      if (this._hasShield) this._hasShield = false;
      if (this.hasSinGun) {
        for (let count = 0; count < this._bulletNum; count++) {
          this._bullets[count].setSignGun(false);
        }
        this.hasSinGun = false;
      }
    }

    public _checkCollision(other: objects.GameObject) {
      let P1: createjs.Point = new createjs.Point(this._plane.x, this._plane.y);
      let P2: createjs.Point = other.position;

      // compare the distance between P1 and P2 is less than half the height of each object
      if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
        (this._plane.halfHeight + other.halfHeight)) {
        if (!other.isColliding) {
          // if (other.name == "island") {
          //   this._score += 100;
          //   this._scoreLabel.text = "Score: " + this._score;
          //   var instance = createjs.Sound.play("explosion");
          //   instance.volume = 0.5;
          // }

          if (other.name == "life") {
            var life = other as objects.Lives;
            life.destroy();
            this.updateLives(1);
          }

          if (other.name == "shield") {
            var shield = other as objects.Shield;
            shield.destroy();
            this._hasShield = true;
            this.startTicker();
          }

          if (other.name == "singun") {
            var gun = other as objects.SinGun;
            for (let count = 0; count < this._bulletNum; count++) {
              this._bullets[count].setSignGun(true);
            }
            this.hasSinGun = true;
            this.startTicker();
            gun.destroy();
          }

          if ((other.name == "enemy" || other.name == "enemybullet")) {
            if (!this._hasShield) {
              this.updateLives(-1);
              this.createExplosion(this._plane.x, this._plane.y);
              this.createExplosion(other.x, other.y);
            }

            if(this.hasSinGun){
              this.endTicker();
            }

            if (this._lives <= 0) {
              this._currentScene = config.END;
              this._gameMusic.stop();
              window.removeEventListener("mousedown", this._bulletFire);
              this.removeAllChildren();
            }

            var instance = createjs.Sound.play("explosion");
            instance.volume = 0.5;

            if (other.name == "enemy") {
              var enemy = other as objects.Enemy;
              this.createExplosion(enemy.x, enemy.y);
              enemy.destroy();
              if (this._hasShield) {
                this.updateScore(100);
              }
            }
            else if (other.name == "enemybullet") {
              var bullet = other as objects.EnemyBullet;
              bullet.destroy();
            }
          }
          other.isColliding = true;
        }
      } else {
        other.isColliding = false;
      }
    }

    public updateLives(value: number): void {
      this._lives += value;
      this._livesLabel.text = "Lives: " + this._lives;
    }

    public updateScore(score: number): void {
      this._score += 100;
      this._scoreLabel.text = "Score: " + this._score;
    }

    public updateEnemyCount(kill: number): void {
      this._playerEnemyKill += kill;
      if (this._playerEnemyKill >= this._levelEnemyCount && this._currentLevel != 3) {
        this._currentLevel++;
        this._levelLabel.text = "Level: " + this._currentLevel;
        this._playerEnemyKill = 0;
        if (this._currentLevel == 2) {
          var instance = createjs.Sound.play("buzzer");
          instance.volume = 1;
          
          this._canSpawnPowerUps = true;

          for (let count = 0; count < this._enemyNum; count++) {
            this._enemies[count]._resetBullets();
            this._enemies[count]._reset();
          }

          var index = this.getChildIndex(this._bg);
          this.removeChild(this._bg);
          this._bg = new objects.Background(this._assetManager, "bg2");
          this.addChildAt(this._bg, index);
        }
        else if (this._currentLevel == 3) {
          var instance = createjs.Sound.play("buzzer");
          instance.volume = 0.5;
          var index = this.getChildIndex(this._bg);
          this.removeChild(this._bg);
          for (let count = 0; count < this._enemyNum; count++) {
            this._enemies[count].removeBullets();
            this.removeChild(this._enemies[count]);
          }
          this._bg = new objects.Background(this._assetManager, "bg3");
          this.addChildAt(this._bg, index);

          this._boss = new objects.Boss(this._textureAtlas, this);
          this.addChildAt(this._boss, this.getChildIndex(this._livesPower) - 1);

          this.bossHealth = new createjs.Shape();
          this.bossHealth.graphics.beginFill("#FF4136");
          this.bossHealth.graphics.drawRect(0, 0, this.healthBar, 20);
          this.bossHealth.graphics.endFill();
          this.bossHealth.y = 600;
          this.bossHealth.x = 0;
          this.addChildAt(this.bossHealth, this.getChildIndex(this._levelLabel) - 1);
        }
      }
      else if (this._currentLevel == 3 && this._bossKilled) {
        this._currentScene = config.WON;
        this._gameMusic.stop();
        window.removeEventListener("mousedown", this._bulletFire);
        this.removeAllChildren();
      }
    }

    public hasBossKilled(value: boolean): void {
      this._bossKilled = true;
    }

    public removePowerUps(): void {
      this._canSpawnPowerUps = true;
    }

    public setBossHit(): void {
      this.bossHit++;
      this.loseHealth();
    }

    public getBossKills(): number {
      return this.bossHit;
    }

    public loseHealth(): void {
      this.healthBar -= 10;
      this.bossHealth.graphics.clear();
      this.bossHealth.graphics.beginFill("#FF4136");
      this.bossHealth.graphics.drawRect(0, 0, this.healthBar, 20);
      this.bossHealth.graphics.endFill();
    }
  }
}
