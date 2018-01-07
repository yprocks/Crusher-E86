module objects {
  export class Bullet extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private _playScript: scenes.Play;
    private i: number;

    public _sinGunOn: boolean;
    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(textureAtlas: createjs.SpriteSheet, playScript: scenes.Play) {
      super(textureAtlas, "bullet");
      this._playScript = playScript;
      this.Start();
    }
    // PRIVATE METHODS
    private _reset(): void {
      this.y = -1000;
      this.x = -1000;
    }

    private _checkBounds(): void {
      if (this.y <= 0) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start(): void {
      this.verticalSpeed = -8;
      this._sinGunOn = false;
      this.i = 0.25;
      this._reset();
    }

    private _updatePosition(): void {
      if (this._sinGunOn) {
        this.x = -Math.sin(this.i) * 22 + this.x + 1;
        this.y = -this.i * 12 + 500;
        this.position.x = this.x;
        this.position.y = this.y;
        this.i += 0.25;
      } else {
        this.y += this.verticalSpeed;
        this.position.x = this.x;
        this.position.y = this.y;
      }
    }

    public setSignGun(value: boolean): void {
      this._sinGunOn = value;
      if (!value) {
        this.i = 0.25;
      }
    }

    public Update(): void {
      if (this.y > 0) {
        this._updatePosition();
        this._checkBounds();
      }
    }

    public _checkCollision(enemies: objects.Enemy[]) {

      enemies.forEach(enemy => {
        let P1: createjs.Point = new createjs.Point(this.x, this.y);
        let P2: createjs.Point = enemy.position;

        if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
          (this.halfHeight + enemy.halfHeight)) {

          this._playScript.updateScore(100);
          var instance = createjs.Sound.play("explosion");
          instance.volume = 0.5;

          let x: number = enemy.position.x;
          let y: number = enemy.position.y;

          enemy.destroy();
          this._playScript.updateEnemyCount(1);
          this._playScript.createExplosion(x, y);
          this._reset();
        }

      });
    }

    public _checkBossCollision(boss: objects.Boss) {

      let P1: createjs.Point = new createjs.Point(this.x, this.y);
      let P2: createjs.Point = boss.position;

      if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
        (this.halfHeight + boss.halfHeight)) {

        this._playScript.updateScore(100);
        this._playScript.setBossHit();

        if (this._playScript.getBossKills() >= this._playScript.totalBossKill) {
         
         console.log("Boss Kills " + this._playScript.getBossKills());
          this._playScript.hasBossKilled(true);
          var instance = createjs.Sound.play("explosion");
          instance.volume = 0.5;
        
          let x: number = boss.position.x;
          let y: number = boss.position.y;

          boss.destroy();
          this._playScript.updateEnemyCount(1);
          this._playScript.createExplosion(x, y);
          this._playScript.updateEnemyCount(1);
        }
        this._reset();
      }
    }
  }
}
