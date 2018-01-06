module objects {
  export class Island extends objects.GameObject {
    // PRIVATE INSTANCE VARIABLES
    private i: number;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(textureAtlas:createjs.SpriteSheet) {
      super(textureAtlas, "enemy");

      this.Start();
    }
    // PRIVATE METHODS
    private _reset():void {
      this.y = -this.height;
      this.x = (Math.random() * (640-this.width))+this.halfWidth;
    }

    private _checkBounds():void {
      if(this.y >= 480 + this.height) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start():void {
      this.i = 0;
      this.verticalSpeed = 5;
      this._reset();
    }

    private _updatePosition():void {

        this.x = -Math.sin(this.i) * 40 + 200; // * PHASE + OFFSET
        this.y = -this.i * 22 + 400;

        // this.x = Math.sin(this.i) * 40 + 200;
        // this.y = -this.i * 22 + 400;

        // this.x -= 5;
        // this.y -= 5;
        this.i += 0.1;

        // this.y += this.verticalSpeed;
        // this.position.x = this.x;
        // this.position.y = this.y;
    }

    public Update():void {
      this._updatePosition();
      this._checkBounds();
    }
  }
}
