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
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Boss(textureAtlas, playerScript) {
            var _this = _super.call(this, textureAtlas, "boss") || this;
            _this._textureAtlas = textureAtlas;
            _this._playScript = playerScript;
            _this.i = Math.random() * -20;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Boss.prototype._reset = function () {
            //this.i = Math.random() * - 20;
            this.y = -9000;
            this.x = -9000;
            this.position.x = this.x;
            this.position.y = this.y;
            // this.xSpawn = (Math.random() * (520 - this.width)) + this.halfWidth;
            // this.ySpawn = (Math.random() * (20 - this.height)) + this.halfWidth;
            this.verticalSpeed = (Math.random() * 5) + 2;
            this.angle = 0.05;
        };
        Boss.prototype._checkBounds = function () {
            if (this.y >= 580 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Boss.prototype.Start = function () {
            this._bulletNum = 50;
            this._bulletCounter = 0;
            this._bullets = new Array();
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.OtherBullet(this._textureAtlas, this._playScript);
                this._playScript.addChild(this._bullets[count]);
            }
            this._reset();
            this._bulletSpawn = new createjs.Point(this.x, this.y);
            this._frameDelay = (Math.random()) + 45;
            this._curFrames = 0;
        };
        Boss.prototype._updatePosition = function () {
            this.x = -Math.sin(this.i) * 80 + 250; // * PHASE + OFFSET
            this.y = 180;
            this.position.x = this.x;
            this.position.y = this.y;
            this.i += this.angle;
        };
        Boss.prototype.Update = function () {
            if (this._playScript._currentLevel == 3) {
                this._updatePosition();
                this._checkBounds();
                this._curFrames++;
                if (this._curFrames >= this._frameDelay) {
                    this.bulletFire(this.x, this.y);
                    this._curFrames = 0;
                }
                this._bullets.forEach(function (bullet) {
                    bullet.Update();
                });
            }
        };
        /**
         * destroy
         */
        Boss.prototype.destroy = function () {
            this._reset();
        };
        Boss.prototype.removeBullets = function () {
            for (var count = 0; count < this._bulletNum; count++) {
                this._playScript.removeChild(this._bullets[count]);
            }
        };
        Boss.prototype.bulletFire = function (x, y) {
            var random = Math.random() * 3;
            if (random < 1) {
                x = x - 150;
                y = y + 50;
            }
            else if (random < 2) {
                x = x + 150;
                y = y + 50;
            }
            else if (random < 3) {
                x = x + 5;
                y = y + 40;
            }
            this._bullets[this._bulletCounter].x = x;
            this._bullets[this._bulletCounter].y = y;
            var instance = createjs.Sound.play("laser");
            instance.volume = 0.5;
            this._bulletCounter++;
            if (this._bulletCounter >= this._bulletNum - 1) {
                this._bulletCounter = 0;
            }
        };
        return Boss;
    }(objects.GameObject));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=boss.js.map