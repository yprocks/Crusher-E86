var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        // PRIVATE INSTANCE VARIABLES
        //   private _playScript: scenes.Play;
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Explosion(textureAtlas) {
            var _this = _super.call(this, textureAtlas, "explosion") || this;
            // this._playScript = playScript;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Explosion.prototype._reset = function () {
            this.y = -1000;
            this.x = -1000;
        };
        Explosion.prototype._checkBounds = function () {
            if (this.y <= 0 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Explosion.prototype.Start = function () {
            var _this = this;
            // this.verticalSpeed = -8;
            this._reset();
            this.on("animationend", function () {
                _this._reset();
            });
        };
        Explosion.prototype._updatePosition = function () {
            //this.y += this.verticalSpeed;
            // this.position.x = this.x;
            // this.position.y = this.y;
        };
        Explosion.prototype.Update = function () {
            if (this.y > 0) {
                //this._reset();
                //this._updatePosition();
                this._checkBounds();
            }
        };
        return Explosion;
    }(objects.GameObject));
    objects.Explosion = Explosion;
})(objects || (objects = {}));
//# sourceMappingURL=explosion.js.map