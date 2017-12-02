module objects {
  export class Bullet extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private _playScript: scenes.Play;

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
      if (this.y <= 0 + this.height) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start(): void {
      this.verticalSpeed = -8;
      this._reset();
    }

    private _updatePosition(): void {
      this.y += this.verticalSpeed;
      this.position.x = this.x;
      this.position.y = this.y;
    }

    public Update(): void {
      if (this.y > 0) {
        this._updatePosition();
        this._checkBounds();
      }
    }

    public _checkCollision(enemies: objects.Cloud[]) {

      enemies.forEach(enemy => {
        let P1: createjs.Point = new createjs.Point(this.x, this.y);
        let P2: createjs.Point = enemy.position;

        if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
          (this.halfHeight + enemy.halfHeight)) {

          this._playScript.UpdateScore(100);
          var instance = createjs.Sound.play("explosion");
          instance.volume = 0.5;
          enemy.destroy();
          this._reset();

        }
        
      });
    }
  }
}
