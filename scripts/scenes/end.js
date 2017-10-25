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
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function End(assetManager, textureAtlas, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this._textureAtlas = textureAtlas;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        End.prototype.Start = function () {
            this._gameOverLabel = new objects.Label("Game Over", "60px", "orecrusher3d", "#FFFF00", 250, 240, true);
            this._restartButton = new objects.Button(this._textureAtlas, "restartButton", 250, 340, true);
            this._ocean = new objects.Ocean(this._assetManager);
            this.Main();
        };
        End.prototype.Update = function () {
            this._ocean.Update();
            return this._currentScene;
        };
        End.prototype.Main = function () {
            var _this = this;
            this.addChild(this._ocean);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);
            this._restartButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=end.js.map