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
    var Powerups = /** @class */ (function (_super) {
        __extends(Powerups, _super);
        // PRIVATE INSTANCE VARIABLES
        function Powerups(textureAtlas, value) {
            var _this = _super.call(this, textureAtlas, value) || this;
            _this.Start();
            return _this;
        }
        Powerups.prototype.Start = function () {
        };
        Powerups.prototype.Update = function () {
        };
        return Powerups;
    }(objects.GameObject));
    objects.Powerups = Powerups;
})(objects || (objects = {}));
//# sourceMappingURL=powerups.js.map