module objects {
  export class Cloud extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private i: number;
    private xSpawn: number;
    private ySpawn: number;
    private angle: number;

    // PUBLIC PROPERTIES
    
    // CONSTRUCTORS
    constructor(textureAtlas:createjs.SpriteSheet) {
      super(textureAtlas, "cloud");
      this.i = Math.random() * - 20;
      this.Start();
    }

    // PRIVATE METHODS
    private _reset():void {
      this.i = Math.random() * - 20;
      
      this.y = -this.height;
      this.x = (Math.random() * (480-this.width)) + this.halfWidth;
      
      this.position.x = this.x;
      this.position.y = this.y;

      this.xSpawn = (Math.random() * (520-this.width)) + this.halfWidth;
      this.ySpawn = (Math.random() * (20-this.height))+this.halfWidth;

      this.verticalSpeed = (Math.random() * 5) + 2;
      this.angle = (Math.random() * 0.2);
    }

    private _checkBounds():void {
      if(this.y >= 580 + this.height) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start():void {
      this._reset();
    }

    private _updatePosition():void {
      this.x = -Math.sin(this.i) * 40 + this.xSpawn; // * PHASE + OFFSET
      this.y = this.i * 22 + this.ySpawn;
      this.position.x = this.x;
      this.position.y = this.y;
      this.i += this.angle;
    }

    public Update():void {
      this._updatePosition();
      this._checkBounds();
    }

    /**
     * destroy
     */
    public destroy():void {
      this._reset();
    }
  }
}
