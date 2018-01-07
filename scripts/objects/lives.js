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
    var Lives = /** @class */ (function (_super) {
        __extends(Lives, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Lives(textureAtlas, playScript) {
            var _this = _super.call(this, textureAtlas, "life") || this;
            _this._playScript = playScript;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Lives.prototype._reset = function () {
            this.y = -(this.height + 100);
            this.x = (Math.random() * (480 - this.width)) + this.halfWidth;
            this._startMoving = false;
        };
        Lives.prototype._checkBounds = function () {
            if (this.y >= this.height + 800) {
                this.destroy();
            }
        };
        // PUBLIC METHODS
        Lives.prototype.Start = function () {
            this.verticalSpeed = 10;
            this._reset();
        };
        Lives.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        Lives.prototype.Update = function () {
            if (this._startMoving) {
                this._updatePosition();
                this._checkBounds();
                this._playScript._checkCollision(this);
            }
        };
        Lives.prototype.destroy = function () {
            this._reset();
            this._playScript.removePowerUps();
        };
        return Lives;
    }(objects.Powerups));
    objects.Lives = Lives;
})(objects || (objects = {}));
//# sourceMappingURL=lives.js.map