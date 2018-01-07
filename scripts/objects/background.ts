module objects {
  export class Background extends createjs.Bitmap {
    // PRIVATE INSTANCE VARIABLES
    private _verticalSpeed: number;
    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor(assetManager: createjs.LoadQueue, value: string) {
      super(assetManager.getResult(value));
      this.Start();
    }

    // PRIVATE METHODS
    private _reset(): void {
      this.y = -620;
    }

    private _checkBounds(): void {
      if (this.y >= 0) {
        this._reset();
      }
    }

    // PUBLIC METHODS
    public Start(): void {
      this._verticalSpeed = 2;
      this._reset();
    }

    public Update(): void {
      this.y += this._verticalSpeed;
      this._checkBounds();
    }

    
  }
}
