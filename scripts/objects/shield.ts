module objects {
    export class Shield extends objects.Powerups {
        private _playScript: scenes.Play;

    // PUBLIC PROPERTIES
    public _startMoving: boolean;

    // CONSTRUCTORS
    public constructor(textureAtlas: createjs.SpriteSheet, playScript?: scenes.Play) {
      super(textureAtlas, "shield");
      this._playScript = playScript;
      this.Start();
    }
    
    // PRIVATE METHODS
    private _reset(): void {
      this.y = -(this.height + 100);
      this.x = (Math.random() * (480 - this.width)) + this.halfWidth;
      this._startMoving = false;
    }

    private _checkBounds(): void {
      if (this.y >= this.height + 800) {
        this.destroy();
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
      if(this._startMoving){
        this._updatePosition();
        this._checkBounds();
        this._playScript._checkCollision(this);
      }
    }

    public destroy(): void {
      this._reset();
      this._playScript.removePowerUps();
    }
      
    public display(x: number, y: number): void{
      this.x = x;
      this.y = y;
      this.position.x = this.x;
      this.position.y = this.y;
    }
        
    }
}