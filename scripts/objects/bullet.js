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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Bullet(textureAtlas, playScript) {
            var _this = _super.call(this, textureAtlas, "bullet") || this;
            _this._playScript = playScript;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype._reset = function () {
            this.y = -1000;
            this.x = -1000;
        };
        Bullet.prototype._checkBounds = function () {
            if (this.y <= 0 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            this.verticalSpeed = -8;
            this._reset();
        };
        Bullet.prototype._updatePosition = function () {
            this.y += this.verticalSpeed;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        Bullet.prototype.Update = function () {
            if (this.y > 0) {
                this._updatePosition();
                this._checkBounds();
            }
        };
        Bullet.prototype._checkCollision = function (enemies) {
            var _this = this;
            enemies.forEach(function (enemy) {
                var P1 = new createjs.Point(_this.x, _this.y);
                var P2 = enemy.position;
                if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
                    (_this.halfHeight + enemy.halfHeight)) {
                    _this._playScript.UpdateScore(100);
                    var instance = createjs.Sound.play("explosion");
                    instance.volume = 0.5;
                    var x = enemy.position.x;
                    var y = enemy.position.y;
                    enemy.destroy();
                    _this._playScript.createExplosion(x, y);
                    _this._reset();
                }
            });
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map