module objects {
    export class Explosion extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES
        //   private _playScript: scenes.Play;

        // PUBLIC PROPERTIES

        // CONSTRUCTORS
        constructor(textureAtlas: createjs.SpriteSheet) {
            super(textureAtlas, "explosion");
            // this._playScript = playScript;
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
            // this.verticalSpeed = -8;
            this._reset();
            this.on("animationend", () => {
                this._reset();
            });
        }

        private _updatePosition(): void {
            //this.y += this.verticalSpeed;
            // this.position.x = this.x;
            // this.position.y = this.y;
        }

        public Update(): void {
            if (this.y > 0) {
                //this._reset();
                //this._updatePosition();
                this._checkBounds();
            }
        }
    }
}
