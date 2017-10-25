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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Start(assetManager, textureAtlas, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._textureAtlas = textureAtlas;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this._welcomeLabel = new objects.Label("Mail Pilot", "80px", "Dock51", "#FFFF00", 230, 240, true);
            this._startButton = new objects.Button(this._textureAtlas, "startButton", 250, 340, true);
            this._ocean = new objects.Ocean(this._assetManager);
            this.Main();
        };
        Start.prototype.Update = function () {
            this._ocean.Update();
            return this._currentScene;
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this._ocean);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map