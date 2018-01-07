module objects {
  export class Plane extends createjs.Sprite {
    // PRIVATE INSTANCE VARIABLES
    width: number;
    height: number;
    halfWidth: number;
    halfHeight: number;
    key: number;

    bulletSpawn: createjs.Point;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(textureAtlas: createjs.SpriteSheet) {
      super(textureAtlas, "plane");
      
      this.Start();
    }
    // PRIVATE METHODS
    private _checkBounds() {
      if (this.x >= 515 - this.halfWidth) {
        this.x = 515 - this.halfWidth;
      }
      if (this.x <= 50) {
        this.x = 50;
      }
    }

    private _reset():void {
      
    }

    // PUBLIC METHODS
    public Start() {
      this.width = this.getBounds().width;
      this.height = this.getBounds().height;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
      this.regX = this.halfWidth;
      this.regY = this.halfHeight;
      this.x = 320;
      this.y = 560;
      this.bulletSpawn = new createjs.Point(this.x - 10, this.y - 35);
    }

    public Update() {
      this.x = this.stage.mouseX;
      this._checkBounds();
      this.bulletSpawn.x = this.x - 10;
      this.bulletSpawn.y = this.y - 35;
    }

    public destroy():void {
      this._reset();
    }
  
    // public _movement(event: KeyboardEvent): void {
    //   event.preventDefault();
    //   var key = event.which || event.keyCode;
    //   if(key == 37){
    //     this.moveLeft();
    //   }
    //   else if(key == 39){
    //     this.x += 5;
    //   }
    // }

    // public moveLeft():void {
    //   this.x -= 5;
    // }

    // public moveRight():void {
    //   this.x += 5;
    // }

  }
}
