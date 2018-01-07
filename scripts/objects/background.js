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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Background(assetManager, value) {
            var _this = _super.call(this, assetManager.getResult(value)) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Background.prototype._reset = function () {
            this.y = -620;
        };
        Background.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        // PUBLIC METHODS
        Background.prototype.Start = function () {
            this._verticalSpeed = 2;
            this._reset();
        };
        Background.prototype.Update = function () {
            this.y += this._verticalSpeed;
            this._checkBounds();
        };
        return Background;
    }(createjs.Bitmap));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map