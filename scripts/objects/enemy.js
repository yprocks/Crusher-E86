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
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Cloud(textureAtlas) {
            var _this = _super.call(this, textureAtlas, "cloud") || this;
            _this.i = Math.random() * -20;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Cloud.prototype._reset = function () {
            this.i = Math.random() * -20;
            this.y = -this.height;
            this.x = (Math.random() * (480 - this.width)) + this.halfWidth;
            this.position.x = this.x;
            this.position.y = this.y;
            this.xSpawn = (Math.random() * (520 - this.width)) + this.halfWidth;
            this.ySpawn = (Math.random() * (20 - this.height)) + this.halfWidth;
            this.verticalSpeed = (Math.random() * 5) + 2;
            this.angle = (Math.random() * 0.2);
        };
        Cloud.prototype._checkBounds = function () {
            if (this.y >= 580 + this.height) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Cloud.prototype.Start = function () {
            this._reset();
        };
        Cloud.prototype._updatePosition = function () {
            this.x = -Math.sin(this.i) * 40 + this.xSpawn; // * PHASE + OFFSET
            this.y = this.i * 22 + this.ySpawn;
            this.position.x = this.x;
            this.position.y = this.y;
            this.i += this.angle;
        };
        Cloud.prototype.Update = function () {
            this._updatePosition();
            this._checkBounds();
        };
        /**
         * destroy
         */
        Cloud.prototype.destroy = function () {
            this._reset();
        };
        return Cloud;
    }(objects.GameObject));
    objects.Cloud = Cloud;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map