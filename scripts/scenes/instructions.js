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
    var Instructions = /** @class */ (function (_super) {
        __extends(Instructions, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Instructions(assetManager, textureAtlas, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._textureAtlas = textureAtlas;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Instructions.prototype.Start = function () {
            this._welcomeLabel = new objects.Label("Crusher E86", "60px", "orecrusher3d", "#FFFF00", 250, 260, true);
            this._menu = new objects.Button(this._textureAtlas, "menu", 250, 340, true);
            this._bg = new objects.Background(this._assetManager, "bg1");
            this.Main();
        };
        Instructions.prototype.Update = function () {
            this._bg.Update();
            return this._currentScene;
        };
        Instructions.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._welcomeLabel);
            this.addChild(this._menu);
            this._menu.on("click", function () {
                _this._currentScene = config.START;
                _this.removeAllChildren();
            });
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map