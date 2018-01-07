module objects {
  export class Enemy extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private i: number;
    private xSpawn: number;
    private ySpawn: number;
    private angle: number;
    private _bullets: objects.OtherBullet[];
    private _bulletNum: number;
    private _bulletCounter: number;
    private _playScript: scenes.Play;
    private _textureAtlas: createjs.SpriteSheet;
    private _bulletSpawn: createjs.Point;
    private _frameDelay: number;
    private _curFrames: number;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(textureAtlas: createjs.SpriteSheet, playerScript: scenes.Play) {
      super(textureAtlas, "enemy");
      this._textureAtlas = textureAtlas;
      this._playScript = playerScript;
      this.i = Math.random() * - 20;
      this.Start();
    }

    // PRIVATE METHODS
    private _reset(): void {
      this.i = Math.random() * - 20;

      this.y = -this.height;
      this.x = (Math.random() * (480 - this.width)) + this.halfWidth;

      this.position.x = this.x;
      this.position.y = this.y;

      this.xSpawn = (Math.random() * (520 - this.width)) + this.halfWidth;
      this.ySpawn = (Math.random() * (20 - this.height)) + this.halfWidth;

      //this.verticalSpeed = (Math.random() * 5) + 2;
      this.angle = (Math.random() * 0.05) + 0.1;
    }

    private _checkBounds(): void {
      if (this.y >= 580 + this.height) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start(): void {

      this._bulletNum = 50;
      this._bulletCounter = 0;

      this._bullets = new Array<objects.OtherBullet>();

      for (let count = 0; count < this._bulletNum; count++) {
        this._bullets[count] = new objects.OtherBullet(this._textureAtlas, this._playScript);
        this._playScript.addChild(this._bullets[count]);
      }

      this._reset();

      this._bulletSpawn = new createjs.Point(this.x - 10, this.y - 35);

      this._frameDelay = (Math.random() * 60) + 120;
      this._curFrames = 0;
    }

    private _updatePosition(): void {
      this.x = -Math.sin(this.i) * 40 + this.xSpawn; // * PHASE + OFFSET
      this.y = this.i * 22 + this.ySpawn;
      this.position.x = this.x;
      this.position.y = this.y;
      this.i += this.angle;
    }

    public Update(): void {
      this._updatePosition();
      this._checkBounds();

      this._curFrames++;

      this._bulletSpawn.x = this.x + 5;
      this._bulletSpawn.y = this.y - 5;

      if (this._curFrames >= this._frameDelay) {
        this.bulletFire();
        this._curFrames = 0;
      }

      this._bullets.forEach(bullet => {
        bullet.Update();
      });
    }

    /**
     * destroy
     */
    public destroy(): void {
      this._reset();
    }

    public removeBullets(): void {
      for (let count = 0; count < this._bulletNum; count++) {
        this._playScript.removeChild(this._bullets[count]);
      }
    }

    public bulletFire(): void {

      this._bullets[this._bulletCounter].x = this._bulletSpawn.x;
      this._bullets[this._bulletCounter].y = this._bulletSpawn.y;

      var instance = createjs.Sound.play("laser");
      instance.volume = 0.5;

      this._bulletCounter++;
      if (this._bulletCounter >= this._bulletNum - 1) {
        this._bulletCounter = 0;
      }

    }

    public _checkCollisionWithin(enemies: objects.Enemy[]) {

      enemies.forEach(enemy => {

        if (enemy != this) {

          let P1: createjs.Point = new createjs.Point(this.x, this.y);
          let P2: createjs.Point = enemy.position;

          if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
            (this.halfHeight + enemy.halfHeight)) {

            var instance = createjs.Sound.play("explosion");
            instance.volume = 0.5;

            let x: number = enemy.position.x;
            let y: number = enemy.position.y;

            enemy.destroy();
            this._playScript.createExplosion(x, y);
            this._reset();
          }
        }
      });
    }
  }
}
