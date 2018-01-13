module objects {
  export class EnemyBullet extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private _playScript: scenes.Play;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    public constructor(textureAtlas: createjs.SpriteSheet, playScript: scenes.Play) {
      super(textureAtlas, "enemybullet");
      this._playScript = playScript;
      this.Start();
    }
    
    public _reset(): void {
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
      this.verticalSpeed = 10;
      this._reset();
    }

    private _updatePosition(): void {
      this.y += this.verticalSpeed;
      this.position.x = this.x;
      this.position.y = this.y;
    }

    public Update(): void {
        this._updatePosition();
        this._checkBounds();
        this._playScript._checkCollision(this);
    }

    public destroy(): void {
      this._reset();
    }
      
    
  }
}
