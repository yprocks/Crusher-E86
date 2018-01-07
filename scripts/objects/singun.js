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
    var SinGun = /** @class */ (function (_super) {
        __extends(SinGun, _super);
        // CONSTRUCTORS
        function SinGun(textureAtlas, playScript) {
            var _this = _super.call(this, textureAtlas, "singun") || this;
            _this._playScript = playScript;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        SinGun.prototype._reset = function () {
            this.y = -(this.height + 100);
            this.x = (Math.random() * (480 - this.width)) + this.halfWidth;
            this._startMoving = false;
        };
        SinGun.prototype._checkBounds = function () {
            if (this.y >= this.height + 800) {
                this.destroy();
            }
        };
        // PUBLIC METHODS
        SinGun.prototype.Start = function () {
            this.verticalSpeed = 10;
            this._reset();
        };
        SinGun.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        SinGun.prototype.Update = function () {
            if (this._startMoving) {
                this._updatePosition();
                this._checkBounds();
                this._playScript._checkCollision(this);
            }
        };
        SinGun.prototype.destroy = function () {
            this._reset();
            this._playScript.removePowerUps();
        };
        return SinGun;
    }(objects.Powerups));
    objects.SinGun = SinGun;
})(objects || (objects = {}));
//# sourceMappingURL=singun.js.map