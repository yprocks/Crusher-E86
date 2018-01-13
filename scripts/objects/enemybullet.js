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
    var EnemyBullet = /** @class */ (function (_super) {
        __extends(EnemyBullet, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function EnemyBullet(textureAtlas, playScript) {
            var _this = _super.call(this, textureAtlas, "enemybullet") || this;
            _this._playScript = playScript;
            _this.Start();
            return _this;
        }
        EnemyBullet.prototype._reset = function () {
            this.y = -1000;
            this.x = -1000;
        };
        EnemyBullet.prototype._checkBounds = function () {
            if (this.y <= 0 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        EnemyBullet.prototype.Start = function () {
            this.verticalSpeed = 10;
            this._reset();
        };
        EnemyBullet.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        EnemyBullet.prototype.Update = function () {
            this._updatePosition();
            this._checkBounds();
            this._playScript._checkCollision(this);
        };
        EnemyBullet.prototype.destroy = function () {
            this._reset();
        };
        return EnemyBullet;
    }(objects.GameObject));
    objects.EnemyBullet = EnemyBullet;
})(objects || (objects = {}));
//# sourceMappingURL=enemybullet.js.map