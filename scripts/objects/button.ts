module objects {
  export class Button extends createjs.Sprite {
    // PRIVATE INSTANCE VARIABlES +++++++++++
    // PUBLIC PROPERTIES ++++++++++++++++++++
    // CONSTRUCTORS +++++++++++++++++++++++++

    /**
     * Creates an instance of Button.
     *
     * @param {createjs.LoadQueue} assetManager
     * @param {string} imageName
     * @param {number} x
     * @param {number} y
     * @param {boolean} isCentered
     */
    constructor(
      textureAtlas:createjs.SpriteSheet,
      imageName:string,
      x:number,
      y:number,
      isCentered:boolean) {
      super(textureAtlas, imageName);

      if(isCentered) {
        this.regX = this.getBounds().width * 0.5;
        this.regY = this.getBounds().height * 0.5;
      }

      this.x = x;
      this.y = y;

      // event listeners
      this.on("mouseover", this._mouseOver);
      this.on("mouseout", this._mouseOut);
    }
    // PRIVATE METHODS ++++++++++++++++++++++

    private _mouseOver(event:createjs.MouseEvent):void {
      this.alpha = 0.7; // change opacity to 70%
    }

    private _mouseOut(event:createjs.MouseEvent):void {
      this.alpha = 1.0; // change the opacity to 100%
    }
    // PUBLIC METHODS +++++++++++++++++++++++
  }
}
