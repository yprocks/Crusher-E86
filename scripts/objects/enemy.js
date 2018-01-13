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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Enemy(textureAtlas, playerScript) {
            var _this = _super.call(this, textureAtlas, "enemy") || this;
            _this._textureAtlas = textureAtlas;
            _this._playScript = playerScript;
            _this.i = Math.random() * -20;
            _this.Start();
            return _this;
        }
        Enemy.prototype._reset = function () {
            this.i = Math.random() * -20;
            this.y = -this.height;
            this.x = (Math.random() * (480 - this.width)) + this.halfWidth;
            this.position.x = this.x;
            this.position.y = this.y;
            this.xSpawn = (Math.random() * (520 - this.width)) + this.halfWidth;
            this.ySpawn = (Math.random() * (20 - this.height)) + this.halfWidth;
            //this.verticalSpeed = (Math.random() * 5) + 2;
            this.angle = (Math.random() * 0.05) + 0.1;
        };
        Enemy.prototype._checkBounds = function () {
            if (this.y >= 580 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            this._bulletNum = 50;
            this._bulletCounter = 0;
            this._bullets = new Array();
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.EnemyBullet(this._textureAtlas, this._playScript);
                this._playScript.addChild(this._bullets[count]);
            }
            this._reset();
            this._bulletSpawn = new createjs.Point(this.x - 10, this.y - 35);
            this._frameDelay = (Math.random() * 60) + 120;
            this._curFrames = 0;
        };
        Enemy.prototype._updatePosition = function () {
            this.x = -Math.sin(this.i) * 40 + this.xSpawn; // * PHASE + OFFSET
            this.y = this.i * 22 + this.ySpawn;
            this.position.x = this.x;
            this.position.y = this.y;
            this.i += this.angle;
        };
        Enemy.prototype.Update = function () {
            this._updatePosition();
            this._checkBounds();
            this._curFrames++;
            this._bulletSpawn.x = this.x + 5;
            this._bulletSpawn.y = this.y - 5;
            if (this._curFrames >= this._frameDelay) {
                this.bulletFire();
                this._curFrames = 0;
            }
            this._bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        /**
         * destroy
         */
        Enemy.prototype.destroy = function () {
            this._reset();
        };
        Enemy.prototype.removeBullets = function () {
            for (var count = 0; count < this._bulletNum; count++) {
                this._playScript.removeChild(this._bullets[count]);
            }
        };
        Enemy.prototype.bulletFire = function () {
            this._bullets[this._bulletCounter].x = this._bulletSpawn.x;
            this._bullets[this._bulletCounter].y = this._bulletSpawn.y;
            this._bulletCounter++;
            if (this._bulletCounter >= this._bulletNum - 1) {
                this._bulletCounter = 0;
            }
            var instance = createjs.Sound.play("laser");
            instance.volume = 0.5;
        };
        Enemy.prototype._resetBullets = function () {
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count]._reset();
            }
        };
        Enemy.prototype._checkCollisionWithin = function (enemies) {
            var _this = this;
            enemies.forEach(function (enemy) {
                if (enemy != _this) {
                    var P1 = new createjs.Point(_this.x, _this.y);
                    var P2 = enemy.position;
                    if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
                        (_this.halfHeight + enemy.halfHeight)) {
                        var instance = createjs.Sound.play("explosion");
                        instance.volume = 0.5;
                        var x = enemy.position.x;
                        var y = enemy.position.y;
                        enemy.destroy();
                        _this._playScript.createExplosion(x, y);
                        _this._reset();
                    }
                }
            });
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map