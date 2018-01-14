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
    var Shield = /** @class */ (function (_super) {
        __extends(Shield, _super);
        // CONSTRUCTORS
        function Shield(textureAtlas, playScript) {
            var _this = _super.call(this, textureAtlas, "shield") || this;
            _this._playScript = playScript;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Shield.prototype._reset = function () {
            this.y = -(this.height + 100);
            this.x = (Math.random() * (480 - this.width)) + this.halfWidth;
            this._startMoving = false;
        };
        Shield.prototype._checkBounds = function () {
            if (this.y >= this.height + 800) {
                this.destroy();
            }
        };
        // PUBLIC METHODS
        Shield.prototype.Start = function () {
            this.verticalSpeed = 10;
            this._reset();
        };
        Shield.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        Shield.prototype.Update = function () {
            if (this._startMoving) {
                this._updatePosition();
                this._checkBounds();
                this._playScript._checkCollision(this);
            }
        };
        Shield.prototype.destroy = function () {
            this._reset();
            this._playScript.removePowerUps();
        };
        Shield.prototype.display = function (x, y) {
            this.x = x;
            this.y = y;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        return Shield;
    }(objects.Powerups));
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shield.js.map